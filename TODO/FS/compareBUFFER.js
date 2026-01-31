const fs = require("fs");

// Read file content

let timeasyn = 0;
let readTimeayn = setInterval(() => {
    timeasyn++;
}, 1);

fs.readFileSync("example.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("READ 1: ", data);
    clearInterval(readTimeayn);
});

fs.open ("example.txt", "r", (err, fd) => {
    if (err) throw err;

    let time = 0;
    let readTime = setInterval(() => {
        time++;
    }, 1);
    const buffer = Buffer.alloc(100); // Reserve space for 100 bytes
    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
        if (err) throw err;

        console.log(`Bytes read: ${bytesRead}`);
        console.log(`Data: ${buffer.toString("utf8", 0, bytesRead)}`);
        clearInterval(readTime);
        console.log(`Time: ${time}`);
        console.log("Timmeasd :", timeasyn);
        fs.close(fd, () => console.log("File closed."));
    });
});
