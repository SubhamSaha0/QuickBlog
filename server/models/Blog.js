import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, default: "" },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, required: true},
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
