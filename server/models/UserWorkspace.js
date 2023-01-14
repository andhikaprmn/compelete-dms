import { DataTypes } from "sequelize";
import db from "../config/database.js";

const UserWorkspace = db.define(
  "user_workspace",
  {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    workspaceId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default UserWorkspace;
