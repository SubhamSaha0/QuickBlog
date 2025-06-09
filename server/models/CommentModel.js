import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    name:{
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
