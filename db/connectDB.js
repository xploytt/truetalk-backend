import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
console.log(process.env.DB_NAME);

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || 5432,
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
});

(async function () {
  try {
    sequelize
      .authenticate()
      .then(() => {
        // "Connection has been established successfully."
        // return sequelize.sync({ force: true });
        return sequelize.sync();
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
