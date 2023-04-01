const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");

const authRoute = require("./routes/authRoutes");
const customerRoute = require("./routes/customerRoute");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.json({ extends: false }));
app.use(cors("*"));

app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/api", (_req, res) => {
    res.send("<h4>Server is running...</h4>");
});

io.on("connection", (socket) => {
    console.log(socket.id);
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
