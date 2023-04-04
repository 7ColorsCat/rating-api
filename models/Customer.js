const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        orderTime: {
            type: String,
        },
        store: {
            type: String,
        },
        address: {
            type: String,
        },
        revenue: {
            type: Number,
            min: 0,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        status: {
            type: String,
            enum: ["watting", "done"],
            default: "watting",
        },
    },
    { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
