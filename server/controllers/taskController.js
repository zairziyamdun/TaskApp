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
      assigned
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Ошибка:", err);
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

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ error: "Задача не найдена" });
  
      const project = await Project.findById(task.projectId);
      if (!project.members.includes(req.userId))
        return res.status(403).json({ error: "Нет доступа к задаче" });
  
      const updated = await Task.findByIdAndUpdate(id, updates, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Ошибка при обновлении задачи" });
    }
  };
  
  exports.deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ error: "Задача не найдена" });
  
      const project = await Project.findById(task.projectId);
      if (!project.members.includes(req.userId))
        return res.status(403).json({ error: "Нет доступа" });
  
      await Task.findByIdAndDelete(id);
      res.json({ message: "Задача удалена" });
    } catch (err) {
      res.status(500).json({ error: "Ошибка при удалении задачи" });
    }
  };