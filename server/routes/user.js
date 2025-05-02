const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getMyProfile } = require("../controllers/userController");

router.get("/me", auth, getMyProfile);

module.exports = router;
