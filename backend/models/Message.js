import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    messageSender: {
      type: String,
      required: [true, "Please add sender"],
    },
    chatRoomOwner: {
      type: String,
      required: [true, "Please select chatroom"],
    },
    message: {
      type: String,
      minlength:3,
      required: [true, "Please enter the message"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Messages", MessageSchema);
