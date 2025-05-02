const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middlewares/authMiddleware");
const { createTask, getTasksByProject, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", auth, createTask);   // POST /api/projects/:projectId/tasks — создать задачу в проекте
router.get("/", auth, getTasksByProject); // GET /api/projects/:projectId/tasks — получить задачи проекта
router.put("/:id", auth, updateTask);     // PUT /api/projects/:projectId/tasks/:id — обновить задачу в проекте
router.delete("/:id", auth, deleteTask);  // DELETE /api/projects/:projectId/tasks/:id — удалить задачу из проекта
module.exports = router;