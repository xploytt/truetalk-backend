import { Router } from "express";
import {
  getAllBooks,
  updateBook,
  uploadBook,
  deleteBook,
} from "../controller/booksCtrl.js";
import multer from "multer";
import decodeResourceId from "../utils/decodeResourceId.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const booksRouter = Router();

booksRouter
  .route("/")
  .get(getAllBooks)
  .post(upload.fields([{ name: "book-pdf" }, { name: "img" }]), uploadBook)
  .put(upload.fields([{ name: "book-pdf" }, { name: "img" }]), updateBook);

booksRouter.delete("/:id", decodeResourceId, deleteBook);

export default booksRouter;
