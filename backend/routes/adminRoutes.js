import express from "express";
const router = express.Router();

import {
  createGrade,
  getAllGrades,
  updateGrade,
  deleteGrade,
} from "../controllers/greadeController.js";

router.route("/grades").post(createGrade);
router.route("/grades").get(getAllGrades);
router.route("/grades/:id").patch(updateGrade);
router.route("/grades/:id").delete(deleteGrade);

export default router;
