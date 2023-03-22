import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      minlength:3,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 100,
      minlength:3,
    },
    link: {
      type: String,
      minlength:3
    },
    date:{
        type: String,
        maxlength: 50,
        minlength:3
    },
    color: {
        type: String,
        required: [true, "Please provide notice background color"],
      },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    //   type: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model("Notices", NoticeSchema);
