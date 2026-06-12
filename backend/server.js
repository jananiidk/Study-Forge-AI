const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");
const chatRoute = require("./routes/chat");
const quizRoute = require("./routes/quiz");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/upload", uploadRoute);
app.use("/chat", chatRoute);
app.use("/quiz", quizRoute);

app.get("/", (req, res) => {
    res.json({
        message: "Backend Running"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});