const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { createProject, getMyProjects } = require("../controllers/projectController");

router.post("/", auth, createProject);         // создать проект
router.get("/", auth, getMyProjects);          // получить проекты

module.exports = router;
