import express from "express";
const router = express.Router();

import {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
} from "../controllers/teacherController.js";

router.route("/:id").post(createNotice);
router.route("/:id").get(getAllNotices);
router.route("/:id").patch(updateNotice);
router.route("/:id").delete(deleteNotice);

export default router;
