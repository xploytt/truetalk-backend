import { sequelize } from "../db/connectDB.js";

import { BLOB, INTEGER, STRING } from "sequelize";

export const Advert = sequelize.define("adverts", {
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
  advertLink: {
    type: STRING,
    allowNull: false,
  },
  img: {
    type: BLOB("long"),
    allowNull: false,
  },
});
