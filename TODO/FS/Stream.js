const fs = require("fs").promises;
const { pipeline } = require("stream/promises");
const { Readable } = require("stream");

async function writeFileExample() {
    const start = Date.now();
    try {
        const lines = Array(1000)
            .fill()
            .map((_, i) => `Line ${i + 1}: ${"x".repeat(100)}\n`);

        await fs.writeFile("large-content.txt", lines.join(""), "utf8");
        await fs.writeFile("data.json", JSON.stringify({ name: "John", age: 30, city: "New York" }, null, 2), "utf8");

        console.log("Time taken (ms):", Date.now() - start);
        console.log("Files created successfully");
    } catch (err) {
        console.error("Error writing files:", err);
    }
}

async function writeLargeFile() {
    const start = Date.now();
    const lines = Array(1000)
        .fill()
        .map((_, i) => `Line ${i + 1}: ${"x".repeat(100)}\n`);
    const readable = Readable.from(lines);
    const writable = require("fs").createWriteStream("large-file.txt");

    try {
        await pipeline(readable, writable);
        console.log("Time taken (ms):", Date.now() - start);
        console.log("Large file written successfully");
    } catch (err) {
        console.error("Error writing file:", err);
    }
}

(async () => {
    await writeFileExample();
    await writeLargeFile();
})();
