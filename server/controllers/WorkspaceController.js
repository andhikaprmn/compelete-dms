import User from "../models/User.js";
import Workspace from "../models/Workspace.js";
import { Op, Sequelize } from "sequelize";
import UserWorkspace from "../models/UserWorkspace.js";

export const getWorkspaces = async (req, res) => {
  const unitId = req.query.unitId;
  const userId = req.userId;
  try {
    const workspaces = await Workspace.findAll({
      where: {
        id: {
          [Op.in]: Sequelize.literal(`(
            select workspaceId from user_workspace where userId=${userId} 
          )`),
        },
        unitId: unitId,
      },
      order: [["id", "DESC"]],
    });
    res.send(workspaces);
  } catch (error) {
    console.log(error);
  }
};

export const createWorkspace = async (req, res) => {
  const userId = req.userId;
  try {
    const workspace = await Workspace.create(req.body);
    await UserWorkspace.create({
      userId: userId,
      workspaceId: workspace.id,
    });
    res.json({ message: "Workspace created" });
  } catch (error) {
    console.log(error);
  }
};

export const getWorkspaceById = async (req, res) => {
  try {
    const workspaces = await Workspace.findAll({
      where: { id: req.params.id },
    });
    res.send(workspaces[0]);
  } catch (error) {
    console.log(error);
  }
};

export const editWorkspace = async (req, res) => {
  try {
    await Workspace.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Workspace edited",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    await Workspace.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Workspace deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const getMemberInvite = async (req, res) => {
  const userId = req.userId;
  const workspaceId = req.query.workspaceId;
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: userId,
          [Op.notIn]: Sequelize.literal(
            `(select userId from user_workspace where workspaceId=${workspaceId})`
          ),
        },
        isSuperAdmin: { [Op.ne]: 1 },
      },
    });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

export const getMemberList = async (req, res) => {
  const userId = req.userId;
  const workspaceId = req.query.workspaceId;
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: userId,
          [Op.in]: Sequelize.literal(
            `(select userId from user_workspace where workspaceId=${workspaceId})`
          ),
        },
        isSuperAdmin: { [Op.ne]: 1 },
      },
    });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

export const inviteMember = async (req, res) => {
  const userId = req.query.userId;
  const workspaceId = req.query.workspaceId;
  try {
    await UserWorkspace.create({
      userId: userId,
      workspaceId: workspaceId,
    });
    res.json("User Invited");
  } catch (error) {
    console.log(error);
  }
};

export const removeMember = async (req, res) => {
  const userId = req.query.userId;
  const workspaceId = req.query.workspaceId;
  try {
    await UserWorkspace.destroy({
      where: {
        userId: userId,
        workspaceId: workspaceId,
      },
    });
    res.json("User removed");
  } catch (error) {
    console.log(error);
  }
};

export const countWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.count();
    res.json(workspace);
  } catch (error) {
    console.log(error);
  }
};
