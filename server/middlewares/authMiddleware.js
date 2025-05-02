const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "TaskappSuperSecret";

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ error: "Нет токена" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(403).json({ error: "Неверный токен" });
  }
};
