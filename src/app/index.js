const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4200;

const db = mysql.createConnection({
  host: 'root',
  user: 'rejinnepal',
  password: '63_/$KU1%3Cyf/',
  database: 'QUIZIFY',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(cors());
app.use(bodyParser.json());

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Implement logic to add a new user to the database
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Error creating user');
    } else {
      res.status(200).send('User created successfully');
    }
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Implement logic to check if the user exists in the database with the provided credentials
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying user:', err);
      res.status(500).send('Error querying user');
    } else {
      if (results.length > 0) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid username or password');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
