const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require("./routes/authRoutes");

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(express.json({ extends: false }));
app.use(cors("*"));

app.use("/api/auth", authRoute);
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
