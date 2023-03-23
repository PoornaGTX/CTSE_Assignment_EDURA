import express from "express";
const router = express.Router();

import {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
  sendMessage,
  getAllMessages,
} from "../controllers/teacherController.js";

router.route("/message").post(sendMessage);

router.route("/:id").post(createNotice);
router.route("/:id").get(getAllNotices);
router.route("/:id").patch(updateNotice);
router.route("/:id").delete(deleteNotice);

router.route("/message/:id").get(getAllMessages);

export default router;
