const Customer = require("../models/Customer");

exports.create = async (req, res) => {
    const { fullname, email, phone, orderId, orderTime, store } = req.body;
    try {
        const newCustomer = new Customer({
            fullname,
            email,
            phone,
            orderId,
            orderTime,
            store,
        });
        await newCustomer.save();
        return res.status(201).json({ message: "Customer created" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Sever error" });
    }
};
