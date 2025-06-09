import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Database connection failed!", error.message);
    });

    const dbUri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
    await mongoose.connect(dbUri);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default connectDB;
