const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const { username, password, info } = req.body;

        const user = await User.findOne({ username });
        if (user) {
            res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            info: {
                store: info.store,
            },
        });
        await newUser.save();

        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7 days",
        });

        res.status(200).json({ token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
};
