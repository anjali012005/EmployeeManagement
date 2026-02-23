const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("NO TOKEN FOUND");
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};