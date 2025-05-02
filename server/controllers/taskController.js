const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate, assignedTo } = req.body;
  const projectId = req.params.projectId;

  const assigned = assignedTo || req.userId;
  
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Проект не найден" });

    const isMember = project.members.some(
      (memberId) => memberId.toString() === req.userId
    );
    if (!isMember) return res.status(403).json({ error: "Нет доступа к проекту" });

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      projectId,
      assignedTo
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Ошибка:", err); // 👉 добавь лог для отладки
    res.status(500).json({ error: "Ошибка при создании задачи" });
  }
};

exports.getTasksByProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Проект не найден" });

    const isMember = project.members.some(
      (memberId) => memberId.toString() === req.userId
    );
    if (!isMember) return res.status(403).json({ error: "Нет доступа к проекту" });

    const tasks = await Task.find({ projectId }).populate("assignedTo", "username");
    res.json(tasks);
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).json({ error: "Ошибка получения задач" });
  }
};
