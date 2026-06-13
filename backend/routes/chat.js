const router = require("express").Router();
const axios = require("axios");

router.post("/", async (req, res) => {

    try {

        const response = await axios.post(
            "https://study-forge-ai.onrender.com/chat",
            {
                question: req.body.question
            }
        );

        res.json(response.data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Chat failed"
        });
    }
});

module.exports = router;