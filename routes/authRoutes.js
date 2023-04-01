const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// const validate = require("../middlewares/validation");

/* const userSchma = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" },
        store: { type: "string" },
    },
    required: ["username", "password", "store"],
    additionalProperties: false,
}; */
// router.post("/register", validate(userSchma), authController.register);
router.post("/login", authController.login);
router.get("/generate-default", authController.generateAccount);
router.get("/verify-token", authController.verifyToken);

module.exports = router;
