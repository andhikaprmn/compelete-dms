import express from "express";
import {
  countUnit,
  createUnit,
  deleteUnit,
  editUnit,
  getUnitById,
  getUnits,
} from "../controllers/UnitController.js";

const router = express.Router();

router.post("/unit/new", createUnit);
router.get("/units", getUnits);
router.get("/unit/:id", getUnitById);
router.put("/unit/:id", editUnit);
router.delete("/unit/:id", deleteUnit);
router.get("/units/count", countUnit);

export default router;
