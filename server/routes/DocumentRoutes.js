import express from "express";

import {
  getDocuments,
  createDocument,
  getDocumentById,
  editDocument,
  deleteDocument,
  countDocument,
  getAllDocuments,
} from "../controllers/DocumentController.js";

const router = express.Router();

router.get("/documents", getDocuments);

router.post("/document/new", createDocument);

router.get("/document/:id", getDocumentById);

router.put("/document/:id", editDocument);

router.delete("/document/:id", deleteDocument);

router.get("/documents/count", countDocument);

router.get("/alldocuments", getAllDocuments);

export default router;
