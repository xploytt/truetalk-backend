import { BLOB, INTEGER } from "sequelize";
import { sequelize } from "../db/connectDB.js";

export const Gallerys = sequelize.define("gallerys", {
  id: {
    autoIncrement: true,
    type: INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },

  img: {
    type: BLOB("long"),
    allowNull: false,
  },
});
