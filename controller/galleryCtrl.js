import { Gallerys } from "../models/m_gallerys.js";

export const getAllImages = async (req, res, next) => {
  try {
    const imgDetails = (await Gallerys.findAll())
      .map(({ dataValues }) => dataValues)
      .map(({ img, id }) => ({ img, id }));

    res.status(200).json(imgDetails);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }
    const img = req.file.buffer;

    const newImg = await Gallerys.create({ img });
    res.status(201).json({
      message: "Image uploaded successfully",
      uploaded: true,
    });
  } catch (e) {
    console.error("Error uploading image:", e);
    next(e);
  }
};

export const deleteImage = async (req, res, next) => {
  const { resourceId } = req;
  try {
    await Gallerys.destroy({
      where: {
        id: resourceId,
      },
    });
    res.json({ id: resourceId, deleted: true });
    return;
  } catch (error) {
    console.log(error);
    res.json({ resourceId, deleted: false });
  }
};
