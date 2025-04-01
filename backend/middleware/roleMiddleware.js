const roleMiddleware = (roles) => {
  return (req, res, next) => {
    console.log("User role:", req.user.role); // Debugging line

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: `Access denied: ${req.user.role} is not allowed` });
    }

    next();
  };
};

module.exports = roleMiddleware;
