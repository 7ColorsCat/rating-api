const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customerController");
const validate = require("../middlewares/validation");

const customerSchema = {
    type: "object",
    required: ["fullname", "email", "phone", "orderId", "orderTime", "store"],
    properties: {
        fullname: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        orderId: { type: "string" },
        store: { type: "string" },
        orderTime: { type: "string" },
    },
    additionalProperties: false,
};
router.post("/", validate(customerSchema), CustomerController.create);

module.exports = router;
