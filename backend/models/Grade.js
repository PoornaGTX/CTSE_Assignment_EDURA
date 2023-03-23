import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema(
  {
    Grade: {
      type: String,
      required: [true, "Please provide GradeID"],
    },
    color: {
      type: String,
      required: [true, "Please provide subject color"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Grades", GradeSchema);
