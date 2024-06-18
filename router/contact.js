import { Router } from "express";
import { contactUs } from "../controller/contactUsCtrl.js";

const contactRouter = Router();

contactRouter.route("/").post(contactUs);
export default contactRouter;
