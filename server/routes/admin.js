const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const {
  getAllUsers, changeUserRole, toggleBlockUser, deleteUser,
  getAllProjects
} = require("../controllers/adminController");

router.use(auth, isAdmin); 

router.get("/users", getAllUsers);
router.put("/users/role", changeUserRole);
router.patch("/users/block/:userId", toggleBlockUser);
router.delete("/users/:userId", deleteUser);

router.get("/projects", getAllProjects);

module.exports = router;
