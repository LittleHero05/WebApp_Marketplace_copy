const express = require("express");
const router = express.Router();

// Regular expression for image file types (you can add other formats)
const imageRegex = /\/.+\.(svg|png|jpg|jpeg)$/;

// Regular expression for video file types
const videoRegex = /\/.+\.(mp4|ogv)$/;

// Route for handling image file requests
router.get(imageRegex, (req, res) => {
    const filePath = req.path;
    res.redirect(303, `http://localhost:3000/src${filePath}`);
});

// Route for handling video file requests
router.get(videoRegex, (req, res) => {
    const filePath = req.path;
    res.redirect(303, `http://localhost:3000/src${filePath}`);
});

module.exports = router;
