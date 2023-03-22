import express from "express";
const router = express.Router();

import {
  getAllUsers,
  subscribeTeacher,
  getMyNotices,
} from "../controllers/studentController.js";

router.route("/").get(getAllUsers);
router.route("/notices").get(getMyNotices);
router.route("/subscribe/:id").patch(subscribeTeacher);

export default router;
