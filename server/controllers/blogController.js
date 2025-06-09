import fs from "fs";
import imageKit from "../configs/imageKit.js";
import Blog from "../models/blog.js";
import Comment from "../models/commentModel.js";
import mongoose from "mongoose";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // check is all fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload image to imageKit
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimise the iamage
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // auto compression
        { format: "webp" }, // convert to modern format
        { width: "1280" }, // width resizing
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    return res.json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    return res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: "Invalid blog ID format",
      });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.json({
        success: false,
        message: "Invalid Id",
      });
    }
    return res.json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog doesn't exist",
      });
    }
    await Blog.findByIdAndDelete(blogId);

    // Delete all comments asociated with the blog
    await Comment.deleteMany({ blog: blogId });

    return res.json({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    console.log("Before Toggle:", blog);

    blog.isPublished = !blog.isPublished;
    await blog.save();

    console.log("After Toggle:", blog);

    // blog.isPublished = !blog.isPublished;

    // await blog.save();

    return res.json({
      success: true,
      message: "Blog status updated",
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    await Comment.create({ blog, name, content });
    return res.json({
      success: true,
      message: "Comment added for review",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      comments,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + ": Generate a blog content for this topic in simple text format in 700 to 800 words"
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
