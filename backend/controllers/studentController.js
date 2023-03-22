import User from "../models/User.js";
import Notice from "../models/Notice.js";
import mongoose from "mongoose";

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
};

const getMyNotices = async (req, res) => {
  if (req.query.subscribeIds) {
    const teacherIds = req.query.subscribeIds.map((id) =>
      mongoose.Types.ObjectId(id)
    );

    const notices = await Notice.find({ createdBy: teacherIds });
    return res.status(200).json({ notices });
  }
  return res.status(200).json({ notices: [] });
};

const subscribeTeacher = async (req, res) => {
  const { id: userId } = req.params;

  if (req.body.isSubscribe) {
    await User.updateMany(
      { _id: userId },
      { $pull: { subscribeIds: { $in: [req.body.subId] } } }
    );
  } else {
    await User.updateOne(
      { _id: userId },
      { $push: { subscribeIds: req.body.subId } }
    );
  }

  res.status(200).json({});
};

export { getAllUsers, subscribeTeacher, getMyNotices };
