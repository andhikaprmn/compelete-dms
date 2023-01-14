import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Workspace = db.define(
  "workspace",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Workspace;
