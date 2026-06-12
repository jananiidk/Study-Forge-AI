const router = require("express").Router();
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/",
    upload.single("pdf"),
    async (req, res) => {

        try {

            const form = new FormData();

            form.append(
                "file",
                fs.createReadStream(req.file.path)
            );

            const response = await axios.post(
                "http://127.0.0.1:8000/upload",
                form,
                {
                    headers: form.getHeaders()
                }
            );

            res.json(response.data);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Upload failed"
            });
        }
    }
);

module.exports = router;