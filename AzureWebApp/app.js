const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const message =
    process.env.APP_MESSAGE ||
    "Azure Web App is running!";

app.use(express.static("public"));

app.get("/api/status", (req, res) => {
    res.json({
        status: "success",
        message: message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
