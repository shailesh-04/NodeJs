const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
  port:3306
});

// Connect to database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('/'));

// Create (Insert) a new record
app.post('/api/users', (req, res) => {
  let user = req.body;
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, ...user });
  });
});

// Read (Select) all records
app.get('/api/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a record
app.put('/api/users/:id', (req, res) => {
  let updatedUser = req.body;
  let sql = `UPDATE users SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updatedUser, (err, result) => {
    if (err) throw err;
    res.send({ id: req.params.id, ...updatedUser });
  });
});

// Delete a record
app.delete('/api/users/:id', (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ id: req.params.id });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
