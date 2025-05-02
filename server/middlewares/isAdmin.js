module.exports = (req, res, next) => {
    if (req.userRole !== "admin") {
      return res.status(403).json({ error: "Только для админов" });
    }
    next();
  };
  