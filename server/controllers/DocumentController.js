import { Op, Sequelize } from "sequelize";
import Document from "../models/Document.js";

export const getDocuments = async (req, res) => {
  const workspaceId = req.query.workspaceId;
  try {
    const documents = await Document.findAll({
      where: {
        id: {
          [Op.in]: Sequelize.literal(
            `(select id from document where workspaceId=${workspaceId})`
          ),
        },
      },
      order: [["id", "DESC"]],
    });
    res.send(documents);
  } catch (error) {
    console.log(error);
    res.send([]);
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({
      order: [["id", "DESC"]],
    });
    res.send(documents);
  } catch (error) {
    console.log(error);
    res.send([]);
  }
};

export const createDocument = async (req, res) => {
  // const workspaceId = req.query.workspaceId;
  try {
    await Document.create(req.body);
    res.send({ message: "Document created" });
  } catch (error) {
    console.log(error);
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findAll({
      where: { id: req.params.id },
    });

    res.send(document[0]);
  } catch (error) {
    console.log(error);
  }
};

export const editDocument = async (req, res) => {
  try {
    await Document.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send({
      message: "Document edited",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocument = async (req, res) => {
  try {
    await Document.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ message: "Document deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const countDocument = async (req, res) => {
  try {
    const document = await Document.count();
    res.json(document);
  } catch (error) {
    console.log(error);
  }
};
