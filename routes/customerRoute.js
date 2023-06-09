const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customerController");
const validate = require("../middlewares/validation");

const customerSchema = {
    type: "object",
    required: [
        "fullname",
        "email",
        "phone",
        "orderId",
        "orderTime",
        "store",
        "address",
        "revenue",
    ],
    properties: {
        fullname: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        orderId: { type: "string" },
        store: { type: "string" },
        orderTime: { type: "string" },
        address: { type: "string" },
        revenue: { type: "number", minimum: 0 },
    },
    additionalProperties: false,
};
router.post("/", validate(customerSchema), CustomerController.create);
router.patch("/", CustomerController.ratting);

module.exports = router;
