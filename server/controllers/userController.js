const User = require("../models/User");

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении профиля" });
  }
};
