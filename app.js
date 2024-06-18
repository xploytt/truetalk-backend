import dotenv from "dotenv";
import express, { urlencoded } from "express";
import blogRouter from "./router/blog.js";
import contactRouter from "./router/contact.js";
import vidRouter from "./router/video.js";
import advert from "./router/advert.js";
import booksRouter from "./router/books.js";
import cors from "cors";
import galleryRouter from "./router/gallery.js";

const app = express();

// Setup middlewares
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/blogs", blogRouter);
app.use("/contact-us", contactRouter);
app.use("/videos", vidRouter);
app.use("/adverts", advert);
app.use("/gallerys", galleryRouter);
app.use("/books", booksRouter);

app.use("/", (req, res) => {
  res.status(404).send("The endpoint is currently unavailable..");
});

app.use((e, req, res, next) => {
  console.error(`<:: An error occured on the server.. \n Error: ${e}`);
  res.status(500).json({
    uploaded: false,
    message: "Internal server error. Check back later",
  });
});

app.listen(process.env.PORT || 3200, () =>
  console.log("truetalk backend is live")
);
