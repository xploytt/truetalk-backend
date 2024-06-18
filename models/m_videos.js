import { sequelize } from "../db/connectDB.js";

import { STRING, INTEGER } from "sequelize";

export const Video = sequelize.define("videos", {
  id: {
    autoIncrement: true,
    type: INTEGER,
    allowNull: false,
    unique: true,
  },
  title: {
    type: STRING,
    primaryKey: true,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  vid_link: {
    type: STRING,
    allowNull: false,
  },
});
