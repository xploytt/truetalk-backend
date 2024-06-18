import { Router } from "express";
import {
  getAllImages,
  uploadImage,
  deleteImage,
} from "../controller/galleryCtrl.js";
import multer from "multer";
import decodeResourceId from "../utils/decodeResourceId.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const galleryRouter = Router();

galleryRouter
  .route("/")
  .get(getAllImages)
  .post(upload.single("img"), uploadImage);

galleryRouter.delete("/:id", decodeResourceId, deleteImage);

export default galleryRouter;
