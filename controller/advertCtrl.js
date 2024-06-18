import { where } from "sequelize";
import advert from "../data/advert.js";
import { Advert } from "../models/m_adverts.js";

export const getAdverts = async (req, res) => {
  try {
    const adverts = await Advert.findAll();
    const advertsData = adverts.map(({ dataValues }) => dataValues);
    res.status(200).json(advertsData).end();
  } catch (e) {
    console.log(e);
    res.status(500).json([]);
  }
};

export const uploadAdvert = (req, res, next) => {
  const { img, title, description, advertLink } = req.resourceInfo;

  try {
    Advert.create({
      title,
      description,
      advertLink,
      img,
    })
      .then((newAdvert) => {
        res.status(201).json({
          message: "Advert uploaded successfully",
          uploaded: true,
        });
      })
      .catch((e) => {
        res.status(400).json({
          uploaded: false,
          message: "Advert upload failed. Advert title already exist",
        });
      });
  } catch (e) {
    next(e);
  }
};

export const modifyAdvert = async (req, res, next) => {
  const { img, title, description, advertLink, keyTitle } = req.resourceInfo;

  try {
    const existingAdvert = await Advert.findOne({
      where: {
        title: keyTitle,
      },
    });

    if (!existingAdvert) {
      return res.status(404).json({
        message:
          "Advert was not uploaded successfully because the title exist. You can only update an already existed advert",
        updated: false,
      });
    }

    const updateObject = {
      title,
      description,
      advertLink,
    };
    if (img) {
      updateObject.img = img;
    }

    Advert.update(updateObject, {
      where: {
        title: keyTitle,
      },
    })
      .then((advert) => {
        res
          .status(200)
          .json({ message: "Advert updated successfully", updated: true });
      })
      .catch((e) => {
        next(e);
      });
  } catch (e) {
    next(e);
  }
};

export const deleteAdvert = async (req, res, next) => {
  const { resourceId } = req;
  try {
    await Advert.destroy({
      where: {
        title: resourceId,
      },
    });
    res.json({ resourceId, deleted: true });
    return;
  } catch (error) {
    console.log(error);
    res.json({ resourceId, deleted: false });
  }
};
