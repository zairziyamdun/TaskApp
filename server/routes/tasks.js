const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middlewares/authMiddleware");
const { createTask, getTasksByProject } = require("../controllers/taskController");

router.post("/", auth, createTask);   // POST /api/projects/:projectId/tasks
router.get("/", auth, getTasksByProject); // GET /api/projects/:projectId/tasks

module.exports = router;