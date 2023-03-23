import Notice from "../models/Notice.js";
import { StatusCodes } from "http-status-codes";

const createNotice = async (req, res) => {
  const { title, description, link, date, color } = req.body;
    req.body.createdBy = req.params.id;
  const notice = await Notice.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ data: notice, msg: "Notice successfully added" });
};

const getAllNotices = async (req, res) => {
  const allNotices = await Notice.find({ createdBy: req.params.id });
  res.status(StatusCodes.OK).json({ allNotices });
};

const updateNotice = async (req, res) => {
  const { id: noticeId } = req.params;
  const { title, description, link, date, color } = req.body;

  if (!title || !description || !color) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "Please provide all values" });
  }

  const notice = await Notice.findOne({ _id: noticeId });
  if (!notice) {
    //throw new NotFoundError(`No notice with found`);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "no notice found to update" });
  }

  const updatedNotice = await Notice.findOneAndUpdate(
    { _id: noticeId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedNotice });
};

const deleteNotice = async (req, res) => {
  const { id: noticeId } = req.params;
  const notice = await Notice.findOne({ _id: noticeId });

  if (!notice) {
    // throw new NotFoundError(`No job with id :${subjectID}`);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "no notice found to update" });
  }
  // checkPermissions(req.user, job.createdBy)
  await notice.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Notice removed" });
};

export { createNotice, getAllNotices, updateNotice, deleteNotice, };
