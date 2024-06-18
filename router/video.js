import { Router } from "express";
import {
  getAllVids,
  updateVid,
  uploadVid,
  deleteVid,
} from "../controller/vidCtrl.js";
import decodeResourceId from "../utils/decodeResourceId.js";

const vidRouter = Router();

vidRouter.route("/").get(getAllVids).post(uploadVid).put(updateVid);

vidRouter.delete("/:id", decodeResourceId, deleteVid);

export default vidRouter;
