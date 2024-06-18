import { FLOAT, STRING, INTEGER, BLOB } from "sequelize";
import { sequelize } from "../db/connectDB.js";

export const Book = sequelize.define("books", {
  id: {
    autoIncrement: true,
    type: INTEGER,
    allowNull: false,
    unique: true,
  },
  title: {
    primaryKey: true,
    type: STRING,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  img: {
    type: BLOB("long"),
    allowNull: false,
  },
  price: {
    allowNull: false,
    type: FLOAT,
  },
  file_path: {
    type: STRING,
    allowNull: false,
  },
});
