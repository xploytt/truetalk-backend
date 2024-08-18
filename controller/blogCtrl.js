import { Blog } from "../models/m_blogs.js";

export const getAllBlogs = (req, res, next) => {
  res.status(200);
  res.json([]);
};

export const getBlog = (req, res, next) => {
  const { blogId } = req.params;
  let blogMsg;
  [].forEach(({ pk, title }, i) => {
    pk == blogId ? (blogMsg = title) : {};
  });

  res.send(blogMsg);
};

export const uploadBlog = (req, res) => {
  const img = req.file.buffer;
  const { title, content, description } = req.body;

  Blog.create({
    title,
    content,
    description,
    img,
  })
    .then((e) => console.log("success uploading blog to the DB"))
    .then((e) => res.send("success uploading blog to the DB"))
    .catch((e) => {
      console.log("failure uploading blog to the DB");
      res.send("failed uploading blog to the db");
    });
};
