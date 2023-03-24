import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    gID: {
      type: String,
      required: [true, "Please provide GradeID"],
    },
    subjectName: {
      type: String,
      required: [true, "Please provide subject Name"],
      maxlength: 100,
    },
    color: {
      type: String,
      required: [true, "Please provide subject color"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subjects", SubjectSchema);
