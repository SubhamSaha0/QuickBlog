import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Authorization token missing or malformed",
        token: authHeader.split(" ")[1],
      });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Invalid or Expired token",
    });
  }
};

export default auth;
