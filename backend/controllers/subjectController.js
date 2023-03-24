import Subject from "../models/Subject.js";
import { StatusCodes } from "http-status-codes";

const createSubject = async (req, res) => {
  const { gID, subjectName, color } = req.body;

  const subject = await Subject.create({
    gID,
    subjectName,
    color,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ subName: subject.subjectName, msg: "user Created" });
};

const updateSubject = async (req, res) => {
  const { id: subjectID } = req.params;
  const { subjectName, color } = req.body;

  if (!subjectName || !color) {
    // throw new BadRequestError("Please Provide all values.");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "please provide all values" });
  }

  const subject = await Subject.findOne({ _id: subjectID });
  if (!subject) {
    //throw new NotFoundError(`No user with user ID ${uId}`);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "no subject found to update" });
  }

  const updateSubject = await Subject.findOneAndUpdate(
    { _id: subjectID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updateSubject });
};

const deleteSubject = async (req, res) => {
  const { id: subjectID } = req.params;
  const subject = await Subject.findOne({ _id: subjectID });

  if (!subject) {
    // throw new NotFoundError(`No job with id :${subjectID}`);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "no subject found to update" });
  }

  // checkPermissions(req.user, job.createdBy)

  await subject.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const getAllSubjects = async (req, res) => {
  const AllSubjects = await Subject.find({});
  res.status(StatusCodes.OK).json({ AllSubjects });
};

export { createSubject, updateSubject, deleteSubject, getAllSubjects };
