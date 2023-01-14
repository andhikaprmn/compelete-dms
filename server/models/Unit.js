import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Unit = db.define(
  "unit",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departemenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Unit;
