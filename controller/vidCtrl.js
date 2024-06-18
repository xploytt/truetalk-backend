// import vidData from "../data/pseudoVids.js";
import { Video } from "../models/m_videos.js";

export const getAllVids = async (req, res) => {
  try {
    const vids = await Video.findAll();
    const vidsDetails = vids.map(({ dataValues }) => dataValues);
    res.status(200).json(vidsDetails);
  } catch (error) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const uploadVid = (req, res) => {
  const { title, description, vidLink: vid_link } = req.body;

  Video.create({
    title,
    description,
    vid_link,
  })
    .then((e) => {
      res.status(200).json({ message: "success uploading vid to the DB" });
    })
    .catch((e) => {
      res.status(400).json({
        message: "Couldn't create vid link successfully",
      });
    });
};

export const updateVid = async (req, res, next) => {
  const { title, description, vidLink: vid_link, keyTitle } = req.body;

  try {
    const existingVid = await Video.findOne({
      where: {
        title: keyTitle,
      },
    });

    if (!existingVid) {
      return res.status(400).json({
        message:
          "Video was not found, couldn't update successfully. You can only update an already existed video",
        updated: false,
      });
    }

    Video.update(
      {
        title,
        description,
        vid_link,
      },
      {
        where: {
          title: keyTitle,
        },
      }
    )
      .then((advert) => {
        res.status(200).json({
          message: "Video updated successfully",
          updated: true,
        });
      })
      .catch((e) => next(e));
  } catch (error) {
    next(error);
  }
};

export const deleteVid = async (req, res, next) => {
  const { resourceId } = req;
  try {
    await Video.destroy({
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
