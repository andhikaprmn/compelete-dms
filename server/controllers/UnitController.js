import Unit from "../models/Unit.js";

export const createUnit = async (req, res) => {
  try {
    await Unit.create(req.body);
    res.json({ message: "Unit created" });
  } catch (error) {
    console.log(error);
  }
};

export const getUnits = async (req, res) => {
  const departemenId = req.query.departemenId;
  try {
    const units = await Unit.findAll({
      where: {
        departemenId: departemenId,
      },
      order: [["name", "ASC"]],
    });
    res.send(units);
  } catch (error) {
    console.log(error);
  }
};

export const getUnitById = async (req, res) => {
  try {
    const units = await Unit.findAll({
      where: { id: req.params.id },
    });
    res.send(units[0]);
  } catch (error) {
    console.log(error);
  }
};

export const editUnit = async (req, res) => {
  try {
    await Unit.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Unit name edited",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUnit = async (req, res) => {
  try {
    await Unit.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Unit deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const countUnit = async (req, res) => {
  try {
    const units = await Unit.count();
    res.json(units);
  } catch (error) {
    console.log(error);
  }
};
