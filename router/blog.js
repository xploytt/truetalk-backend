import { Router } from "express";
import { getAllBlogs, getBlog, uploadBlog } from "../controller/blogCtrl.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const blogRouter = Router();

blogRouter.route("/").get(getAllBlogs).post(upload.single("img"), uploadBlog);

blogRouter.route("/:blogId").get(getBlog);

export default blogRouter;
