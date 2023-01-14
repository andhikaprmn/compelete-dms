import { Sequelize } from "sequelize";

const db = new Sequelize("dms", "root", "123456", {
  // host: "103.176.78.184",
  host: "localhost",
  dialect: "mysql",
});

export default db;
