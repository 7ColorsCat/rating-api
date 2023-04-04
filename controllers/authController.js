const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const accounts = require("../admin/accounts.json");

exports.register = async (req, res) => {
    try {
        const { username, password, store } = req.body;

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
            store,
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
            return res.status(400).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7 days",
        });

        return res.status(200).json({ token, store: user.store });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.generateAccount = (_req, res) => {
    User.deleteMany({}).then(() => {
        console.log("User collection deleted.");
        Promise.all(
            accounts.map(async (acc) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(acc.password, salt);
                return {
                    username: acc.username,
                    password: hashedPassword,
                    store: acc.store,
                };
            })
        )
            .then((result) => {
                return User.create(result);
            })
            .then((result) => {
                return res.status(201).json({
                    message: "Created new account",
                    data: result,
                });
            });
    });
};

exports.verifyToken = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        if (!accessToken)
            return res.status(400).json({ message: "Missing token" });

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.satus(401).json({
                    message: "Unauthenticated",
                });
            }

            return res.json({ ok: true });
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(400).json({ message: "Token expired" });
            }

            return res.status(400).json({ message: "Invalid token" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};
