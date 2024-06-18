import { Router } from "express";
import {
  getAdverts,
  modifyAdvert,
  uploadAdvert,
  deleteAdvert,
} from "../controller/advertCtrl.js";
import multer from "multer";
import decodeResourceId from "../utils/decodeResourceId.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const advertRouter = Router();

const extractResource = (req, res, next) => {
  const img = req.file ? req.file.buffer : undefined;
  const { title, keyTitle = "", description, advertLink } = req.body;
  let invalidReq = false;

  if (req.method !== "PUT") {
    if (!img) invalidReq = true;
  }

  if (!invalidReq && title && description && advertLink) {
    req.resourceInfo = {
      title,
      description,
      advertLink,
      img,
      keyTitle,
    };
    next();
  } else {
    return res.status(400).json({
      uploaded: false,
      message:
        "Advert upload failed!\n The server cannot or will not process the request due to a client error. Please include the necessary data.",
    });
  }
};

advertRouter
  .route("/")
  .get(getAdverts)
  .post(upload.single("img"), extractResource, uploadAdvert)
  .put(upload.single("img"), extractResource, modifyAdvert);

advertRouter.delete("/:id", decodeResourceId, deleteAdvert);

export default advertRouter;
