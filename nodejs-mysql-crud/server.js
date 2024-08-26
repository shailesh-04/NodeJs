const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Create connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    port: 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('MySQL Connected...');
});

// Create Database
app.get('/createdb', (req, res) => {
    const sql = 'CREATE DATABASE crud_db';
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send('Database created...');
    });
});

// Create Table
app.get('/createtable', (req, res) => {
    const sql = `CREATE TABLE users (
        id INT AUTO_INCREMENT,
        name VARCHAR(255),
        email VARCHAR(255),
        PRIMARY KEY (id)
    )`;
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send('Users table created...');
    });
});

// Insert user
app.post('/create', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) console.log(err);
        res.redirect('/create.html');
    });
});

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', '/read.html'));
});

// Select users
app.get('/read', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) console.log(err);
        res.json(results);
    });
});

// Update user
app.post('/update', (req, res) => {
    const { id, name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) console.log(err);
        res.redirect('/update.html');
    });
});

// Delete user
app.post('/delete', (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err);
        res.redirect('/delete.html');
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
