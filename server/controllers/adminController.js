const User = require("../models/User");
const Project = require("../models/Project");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.changeUserRole = async (req, res) => {
  const { userId, role } = req.body;
  if (!["user", "manager", "admin"].includes(role)) {
    return res.status(400).json({ error: "Недопустимая роль" });
  }
  const updated = await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password");
  res.json(updated);
};

exports.toggleBlockUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });

  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json({ message: `Пользователь ${user.isBlocked ? "заблокирован" : "разблокирован"}` });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.json({ message: "Пользователь удалён" });
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find().populate("owner", "username");
  res.json(projects);
};
