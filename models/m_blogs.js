import { sequelize } from "../db/connectDB.js";

import { DATE, STRING, INTEGER, BLOB, TEXT } from "sequelize";

export const Blog = sequelize.define("blog", {
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
  img: {
    type: BLOB("long"),
    allowNull: false,
  },
  content: {
    type: TEXT,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
});
