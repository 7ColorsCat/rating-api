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

exports.getCustomerWatting = async (store) => {
    try {
        const wattingCustomer = await Customer.findOne({
            store,
            status: "watting",
        });
        return wattingCustomer;
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.ratting = async (req, res) => {
    const { id, star, store } = req.body;
    const io = req.io;
    try {
        await Customer.findByIdAndUpdate(id, {
            rating: star,
            status: "done",
        });
        io.to(store).emit("customerRated");
        return res.status(200).json({ message: "Customer updated" });
    } catch (error) {
        console.log(error);
    }
};
