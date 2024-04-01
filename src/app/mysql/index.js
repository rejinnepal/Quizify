const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Establish the database collection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin1234',
  database: 'QUIZIFY',
});

db.connect(function(error){
  if (error) {
    console.log("Error connecting to database: " + error.message);
  } else {
    console.log("Connected to MySQL database successfully");
  }
});

// Establish the port
port = 8090
app.listen(port, function check(error){
  if (error) {
    console.log("Error: " + error.message);
  } else {
    console.log("Server is running on port " + port);
  }
});

// Create a new user
app.post("/api/users/add", (req, res) => {
  let user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };
  let sql = "INSERT INTO USERS SET ?";
  db.query(sql, user, (error, results) => {
    if (error){
      res.send({status: false, message: "User creation failed"})
    } else {
      res.send({status: true, message: "User created successfully", userID: results.insertID})
    }
  });
});

// View users
app.get("/api/users", async (req, res) => {
  var sql = "SELECT * FROM USERS";
  db.query(sql, function(error, result){
    if (error){
      console.log("Error connecting to DB");
    } else {
      res.send({status: true, data: result})
    }
  });
});

// Search a user
app.get("/api/users/:email", (req, res) => {
  var email = req.params.email;
  var sql = "SELECT * FROM USERS WHERE EMAIL = ?";
  db.query(sql, [email], function(error, result) {
    if (error) {
      console.error("Error connecting to DB:", error);
      res.status(500).send({status: false, message: "Error accessing the database"});
    } else if (result.length === 0) {
      res.send({status: false, message: "No user found with that email"});
    } else {
      res.send({status: true, data: result});
    }
  });
});

// Update a user
// app.put("/api/users/update/:email", (req, res) => {
//   let sql = "UPDATE USERS SET first_name='" + req.body.first_name + "', last_name='" + req.body.last_name + "', password='" + req.body.password + "', phone='" + req.body.phone + "' WHERE email='" + req.params.email;
//   db.query(sql, (error, result) => {
//     if (error) {
//       res.send({status: false, message: "Student update failed"});
//     } else{
//       res.send({status: true, message: "Student updated successfully", data: result});
//     }
//   });
// });

// update a user
app.put("/api/users/update/:email", (req, res) => {
  let sql = "UPDATE USERS SET first_name = ?, last_name = ?, password = ?, phone = ? WHERE email = ?";
  let values = [req.body.first_name, req.body.last_name, req.body.password, req.body.phone, req.params.email];
  db.query(sql, values, (error, result) => {
    if (error) {
      console.error(error); // Log the error for debugging
      res.send({status: false, message: "Student update failed"});
    } else {
      res.send({status: true, message: "Student updated successfully", data: result});
    }
  });
});

// Delete a user
app.delete("/api/users/delete/:email", (req, res) => {
  // let sql = "DELETE FROM USERS WHERE EMAIL=" + req.params.email + "";
  let sql = "DELETE FROM USERS WHERE EMAIL= ?";
  let value = req.params.email;
  db.query(sql, value, (error) => {
    if (error) {
      res.send({status: false, message: "Student delete failed"})
    } else{
      res.send({status: true, message: "Student deleted successfully"})
    }
  });
});







