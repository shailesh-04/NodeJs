// the Promise for give extra thread worker for execute

import fs from "fs";
import path from "path";

fs.readFile(path.join("test.txt"), "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
});

const open = fs.openSync(path.join("example.txt"), "r");
console.log(open);

// fs.closeSync(open)

setImmediate(() => {
    console.log("immediate");
});


process.nextTick(() => {
    console.log("nextTick");
});
let i = 0;
const inter = setInterval(()=>{
    console.log(i);
    i++;
},0);


setTimeout(() => {
    console.log("set");
}, 0);

 setTimeout(()=>{
    clearInterval(inter);
},100);


console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});

Promise.resolve().then(() => {
  console.log("Promise");
});
async function name() {
    console.log("message")
}
await   name();

process.nextTick(() => {
  console.log("NextTick");
});

setImmediate(() => {
  console.log("Immediate2");
});

const ite = setInterval(() => {
  console.log("Interval");
}, 0);
setTimeout(() => {
  clearInterval(ite);
}, 100);

console.log("End");
