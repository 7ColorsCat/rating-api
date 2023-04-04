const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.get("/generate-default", authController.generateAccount);
router.get("/verify-token", authController.verifyToken);

module.exports = router;
