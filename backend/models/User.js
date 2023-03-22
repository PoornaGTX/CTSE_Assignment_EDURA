import validator from "validator";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userScheme = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a name."],
      minlength: 4,
      maxlength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a name."],
      minlength: 4,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email address."],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email address",
      },
      unique: true,
    },
    teacherSubject: {
      type: String,
      default: "no",
    },
    Grade: {
      type: String,
      default: "no",
    },
    subscribeIds: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      required: [true, "Please provide ac type."],
      trim: true,
      enum: ["teacher", "student", "Admin"],
      default: "student",
    },
    password: {
      type: String,
      required: [true, "Please provide password."],
      minlength: 6,
      select: false,
    },
    teacherDescription: {
      type: String,
      default: "no",
    },
  },
  { timestamps: true }
);

//hash the password before create the instance
userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//method for create jSON web token
//after creating the instance in the server
userScheme.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
//compare password
userScheme.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", userScheme);
