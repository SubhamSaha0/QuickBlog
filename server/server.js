import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is working...");
});
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// server + DB unit
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("App is running on port", PORT);
    });
  } catch (error) {
    console.error("Failed to connect to the DB:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;