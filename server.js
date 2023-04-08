const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const path = require("path");
const authRoute = require("./routes/authRoutes");
const customerRoute = require("./routes/customerRoute");
const logger = require("./logs/logger");

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const whitelist = [
    "http://localhost",
    "http://feedback.apj.vn",
    "http://14.225.254.94",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
const io = socketIO(server, {
    cors: {
        origin: whitelist,
    },
});

app.use(express.json({ extends: false }));
app.use(cors(corsOptions));

const CustomerController = require("./controllers/customerController");
io.on("connection", (socket) => {
    logger.info(`Client ${socket.id} connected`);
    socket.on("joinRoom", (store) => {
        socket.join(store);
        CustomerController.getCustomerWatting(store)
            .then((result) => {
                socket.emit("newRating", result);
            })
            .catch((error) => logger.error(error.message));
    });

    socket.on("disconnect", (socket) =>
        logger.info(`Client ${socket.id} disconnected`)
    );
});

app.use((req, _res, next) => {
    req.io = io;
    next();
});

app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/api", (_req, res) => {
    res.send("<h4>Server is running...</h4>");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info("Connected to MongoDB");

        server.listen(PORT, () => {
            logger.info(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => logger.error(err.message));
