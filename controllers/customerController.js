const logger = require("../logs/logger");
const Customer = require("../models/Customer");
const SheetDB = require("../modules/sheetdb");

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
        const result = await newCustomer.save();

        io.to(store).emit("newRating", result);
        return res.status(201).json({ message: "Customer created" });
    } catch (error) {
        logger.info(error.message);
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
        logger.error(error.message);
        return error;
    }
};

exports.ratting = async (req, res) => {
    const { id, star, store } = req.body;
    const io = req.io;
    try {
        const customer = await Customer.findByIdAndUpdate(
            id,
            {
                rating: star,
                status: "done",
            },
            { new: true }
        );
        const { email, phone, fullname, orderId, revenue, orderTime, address } =
            customer;
        io.to(store).emit("customerRated", customer);
        await SheetDB.create({
            email,
            phone,
            fullname,
            orderId,
            orderTime,
            store,
            address,
            revenue,
            rating: star,
        });

        module.exports
            .getCustomerWatting(store)
            .then((result) => {
                io.to(store).emit("newRating", result);
            })
            .catch((error) => logger.error(error.message));
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ message: "Server error" });
    }
};
