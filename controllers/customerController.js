const Customer = require("../models/Customer");

exports.create = async (req, res) => {
    const io = req.io;
    const {
        fullname,
        email,
        phone,
        orderId,
        orderTime,
        store,
        address,
        revenue,
    } = req.body;
    try {
        const newCustomer = new Customer({
            fullname,
            email,
            phone,
            orderId,
            orderTime,
            store,
            address,
            revenue,
        });
        await newCustomer.save();

        io.to(store).emit("newRating", req.body);
        return res.status(201).json({ message: "Customer created" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Sever error" });
    }
};
