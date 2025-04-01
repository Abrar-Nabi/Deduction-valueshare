const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const token = req.header("Authorization");

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Remove 'Bearer ' from the token if present
    const tokenValue = token.replace("Bearer ", "");

    // Verify the token using your JWT secret
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, send an error response
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
