const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validation");

const userSchma = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" },
        info: {
            type: "object",
            properties: {
                store: { type: "string" },
            },
            required: ["store"],
        },
    },
    required: ["username", "password", "info"],
    additionalProperties: false,
};
router.post("/register", validate(userSchma), authController.register);
router.post("/login", authController.login);

module.exports = router;
