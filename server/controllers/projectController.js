const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const project = await Project.create({
      title,
      description,
      owner: req.userId,
      members: [req.userId]
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при создании проекта" });
  }
};

exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.userId },
        { members: req.userId }
      ]
    }).populate("owner", "username").populate("members", "username");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения проектов" });
  }
};
