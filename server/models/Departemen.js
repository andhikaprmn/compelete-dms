import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Departemen = db.define(
  "departemen",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Departemen;
