const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function count10000Miliun() {
    let count = 0;
    for (let i = 0; i < 10000000000 ; i++) {
        count++;
    }   
    return count;
}

console.log(count10000Miliun())
console.log("done")


// app.get('/promise', (req, res) => {

// });
    
