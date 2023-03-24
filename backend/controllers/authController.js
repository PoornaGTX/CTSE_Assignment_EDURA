import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import moment from "moment";

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    teacherSubject,
    Grade,
    type,
    password,
    teacherDescription,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !type) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExsisits = await User.findOne({ email });

  if (userAlreadyExsisits) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    teacherSubject,
    Grade,
    type,
    password,
    teacherDescription,
  });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      type: user.type,
      lastName: user.lastName,
      firstName: user.firstName,
      teacherSubject: user.teacherSubject,
      Grade: user.Grade,
      teacherDescription: user.teacherDescription,
      _id: user._id,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    teacherSubject,
    Grade,
    teacherDescription,
  } = req.body;
  const { id: id } = req.params;
  if (
    !email ||
    !firstName ||
    !lastName ||
    !teacherSubject ||
    Grade ||
    !teacherDescription
  ) {
    // throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: id });

  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.Grade = Grade;
  user.teacherSubject = teacherSubject;
  user.teacherDescription = teacherDescription;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

const showStats = async (req, res) => {
  let stats = await User.aggregate([
    { $match: {} },
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    //cuur => current item
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Admin: stats.Admin || 0,
    student: stats.student || 0,
    teacher: stats.teacher || 0,
  };

  let monthelUserCreations = await User.aggregate([
    { $match: {} },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 8 }, //limit is use to get latest 6 month data
  ]);

  monthelUserCreations = monthelUserCreations
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthelUserCreations });
};

const newPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  //get user data
  const user = await User.findOne({ email: email });

  //check the user is exsisit
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid user" });
  }

  user.password = newPassword;
  await user.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "password has been reset please re-login" });
};

export { register, login, updateUser, getAllUsers, showStats, newPassword };
