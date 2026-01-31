const express = require("express");
const fs = require("fs");
const app = express();

app.get("/download", (req, res) => {
    const filePath = "Screen Recording 2025-06-24 142559.mp4";
    const readStream = fs.createReadStream(filePath);

    // Stream the file to the client
    readStream.pipe(res);
});

app.listen(3000, () => console.log("Server running on port 3000"));
