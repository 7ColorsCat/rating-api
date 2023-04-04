const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const path = require("path");
const authRoute = require("./routes/authRoutes");
const customerRoute = require("./routes/customerRoute");

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
    },
});

app.use(express.json({ extends: false }));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT"],
    })
);

io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("joinRoom", (store) => {
        socket.join(store);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
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
        console.log("Connected to MongoDB");

        server.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
