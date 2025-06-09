import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/commentModel.js";
import mongoose from "mongoose";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password is required!",
      });
    }
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
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

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

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

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = { blogs, comments, drafts, recentBlogs };

    return res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({
        success: false,
        message: "Comment ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: "Invalid Comment ID.",
      });
    }

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.json({
        success: false,
        message: "Comment not found.",
      });
    }

    return res.json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

export const approveComment = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({
        success: false,
        message: "Comment ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: "Invalid Comment ID.",
      });
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.isApproved === true) {
      return res.json({
        success: false,
        message: "Comment already approved",
      });
    }

    comment.isApproved = true;
    await comment.save();

    return res.json({
      success: true,
      message: "Comment has been approved",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
