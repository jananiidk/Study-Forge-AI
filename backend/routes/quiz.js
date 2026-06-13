const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res) => {

    const response = await axios.get(
       "https://study-forge-ai.onrender.com/quiz"
    );

    res.json(response.data);
});

router.get("/summary", async (req, res) => {

    try {

        const response = await axios.get(
            "https://study-forge-ai.onrender.com/summary"
        );

        res.json(response.data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Summary failed"
        });
    }
});

module.exports = router;