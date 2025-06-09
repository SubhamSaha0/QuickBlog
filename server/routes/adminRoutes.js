import express from "express";
import auth from "../middleware/auth.js";
import {
  adminLogin,
  approveComment,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveComment);

export default adminRouter;
