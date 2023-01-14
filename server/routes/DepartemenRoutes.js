import express from "express";
import {
  countDepartemen,
  createDepartemen,
  deleteDepartemen,
  editDepartemen,
  getDepartemenById,
  getDepartemens,
} from "../controllers/DepartemenController.js";

const router = express.Router();

router.post("/departemen/new", createDepartemen);
router.get("/departemens", getDepartemens);
router.get("/departemen/:id", getDepartemenById);
router.put("/departemen/:id", editDepartemen);
router.delete("/departemen/:id", deleteDepartemen);
router.get("/departemens/count", countDepartemen);

export default router;
