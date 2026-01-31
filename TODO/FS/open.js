
const fs = require("fs");

fs.open("test.txt", "r", (err, fd) => {
  if (err) throw err;
  
  const buffer = Buffer.alloc(100); // Allocate space
  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
    if (err) throw err;
    console.log(`Read ${bytesRead} bytes: ${buffer.toString("utf8", 0, bytesRead)}`);
    fs.close(fd, () => console.log("File closed."));
  });
});

