const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      const user = await User.findById(decoded._id).select("-password");
      console.log(user);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = authMiddleware;
