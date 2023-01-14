import Departemen from "../models/Departemen.js";
// import { Op, Sequelize } from "sequelize";

export const createDepartemen = async (req, res) => {
  try {
    await Departemen.create(req.body);
    res.json({ message: "Departemen created" });
  } catch (error) {
    console.log(error);
  }
};

export const getDepartemens = async (req, res) => {
  try {
    const departemens = await Departemen.findAll({
      order: [["name", "ASC"]],
    });
    res.send(departemens);
  } catch (error) {
    console.log(error);
  }
};

export const getDepartemenById = async (req, res) => {
  try {
    const departemens = await Departemen.findAll({
      where: { id: req.params.id },
    });
    res.send(departemens[0]);
  } catch (error) {
    console.log(error);
  }
};

export const editDepartemen = async (req, res) => {
  try {
    await Departemen.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Departemen name edited",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDepartemen = async (req, res) => {
  try {
    await Departemen.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Departemen deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const countDepartemen = async (req, res) => {
  try {
    const departemens = await Departemen.count();
    res.json(departemens);
  } catch (error) {
    console.log(error);
  }
};
