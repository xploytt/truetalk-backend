// import books from "../data/books.js";
import { Book } from "../models/m_books.js";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";

const generatePath = (pdfFileName, title) => {
  const currentFileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(currentFileName);
  const ext = extname(pdfFileName);
  const pdfFolder = join(__dirname, "../books_folder");
  const file_path = join(pdfFolder, `${title.split(" ").join("-")}${ext}`);
  return file_path;
};

const deleteFile = async (path) => {
  await fs.rm(path);
};

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    const booksDetails = books
      .map(({ dataValues }) => dataValues)
      .map(({ id, title, description, img, price, file_path }) => ({
        title,
        description,
        img,
        price,
      }));

    res.status(200).json(booksDetails).end();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const uploadBook = async (req, res, next) => {
  const { title, description, price } = req.body;

  try {
    const { buffer: pdfData, originalname: pdfFileName } =
      req.files["book-pdf"][0];
    const img = req.files["img"][0].buffer;

    const file_path = generatePath(pdfFileName, title);
    await fs.writeFile(file_path, pdfData);

    const newBook = await Book.create({
      title,
      img,
      description,
      file_path,
      price,
    });

    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const { title, description, price, keyTitle } = req.body;

  try {
    const { buffer: pdfData, originalname: pdfFileName } = req.files[
      "book-pdf"
    ]?.[0] ?? { buffer: "none", originalname: "none" };
    const img = req.files["img"]?.[0].buffer ?? "none";

    const existingBook = await Book.findOne({
      where: {
        title: keyTitle,
      },
    });

    if (!existingBook) {
      return res.status(400).json({
        message:
          "Book was not found, couldn't update successfully. You can only update an already existed book",
        updated: false,
      });
    }

    let file_path;
    let detailsOfBookToUpdate = {
      title,
      description,
      price,
    };
    const { file_path: existing_file_path } = existingBook.dataValues;

    if (pdfData !== "none") {
      //this condition checks for updating a new book
      await deleteFile(existing_file_path);

      file_path = generatePath(pdfFileName, title);
      await fs.writeFile(file_path, pdfData);
    } else if (keyTitle != title) {
      //there has been changes in title.. hence changing filepath also
      file_path = generatePath(existing_file_path, title);
      await fs.rename(existing_file_path, file_path);
    }

    if (file_path) {
      detailsOfBookToUpdate = {
        ...detailsOfBookToUpdate,
        file_path,
      };
    }

    if (img !== "none") {
      detailsOfBookToUpdate = {
        ...detailsOfBookToUpdate,
        img,
      };
    }
    Book.update(detailsOfBookToUpdate, {
      where: {
        title: keyTitle,
      },
    })
      .then((updatedBook) => {
        res.status(200).json({
          message: "Book updated successfully",
          updated: true,
        });
      })
      .catch((e) => next(e));
  } catch (e) {
    next(e);
  }
};

export const deleteBook = async (req, res, next) => {
  const { resourceId } = req;
  console.log(`######## ${resourceId}`);
  try {
    const existingBook = await Book.findOne({
      where: {
        title: resourceId,
      },
    });

    const { file_path } = existingBook.dataValues;
    if (file_path) await fs.rm(file_path);
    await existingBook?.destroy();

    res.json({ resourceId, deleted: true });
    return;
  } catch (error) {
    console.log(error);
    res.json({ resourceId, deleted: false });
  }
};
