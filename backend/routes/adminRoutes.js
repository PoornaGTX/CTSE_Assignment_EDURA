import express from "express";
const router = express.Router();

import {
  createGrade,
  getAllGrades,
  updateGrade,
  deleteGrade,
} from "../controllers/greadeController.js";

import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

router.route("/grades").post(createGrade);
router.route("/grades").get(getAllGrades);
router.route("/grades/:id").patch(updateGrade);
router.route("/grades/:id").delete(deleteGrade);
router.route("/").post(createSubject);
router.route("/").get(getAllSubjects);
router.route("/:id").patch(updateSubject);
router.route("/:id").delete(deleteSubject);

export default router;
