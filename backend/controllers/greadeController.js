import GradeModel from "../models/Grade.js";
import { StatusCodes } from "http-status-codes";

const createGrade = async (req, res) => {
  const { Grade, color } = req.body;

  const GradeAdd = await GradeModel.create({
    Grade,
    color,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ Grade: GradeAdd.Grade, msg: "Grade added" });
};

const updateGrade = async (req, res) => {
  const { id: GradeID } = req.params;
  const { Grade, color } = req.body;

  if (!Grade || !color) {
    // throw new BadRequestError("Please Provide all values.");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "please provide all values" });
  }

  const grade = await GradeModel.findOne({ _id: GradeID });
  if (!grade) {
    //throw new NotFoundError(`No user with user ID ${uId}`);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "no subject found to update" });
  }

  const updateGrade = await GradeModel.findOneAndUpdate(
    { _id: GradeID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updateGrade });
};

const deleteGrade = async (req, res) => {
  const { id: GradeID } = req.params;
  const grade = await GradeModel.findOne({ _id: GradeID });

  if (!grade) {
    // throw new NotFoundError(`No job with id :${subjectID}`);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "no subject found to update" });
  }

  // checkPermissions(req.user, job.createdBy)

  await grade.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const getAllGrades = async (req, res) => {
  const AllGrades = await GradeModel.find({});
  res.status(StatusCodes.OK).json({ AllGrades });
};

export { createGrade, updateGrade, deleteGrade, getAllGrades };
