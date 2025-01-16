const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.json())
app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "e_catalog"
})

db.connect((err) => {
    if (err) {
        console.log("Faild to connect to database!!!")
    } else {
        console.log("Connected to mysql database!!!")
    }
})

app.get("/users", (req, res) => {
    const query = "SELECT * FROM  users";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching users: ", err);
            res.status(500).send({ message: "Error fetching users", error: err })
        } else {
            res.status(200).send(results)
        }
    })
})


app.post("/users", (req, res) => {
    const { firstname, lastname, phone, group, password } = req.body

    if (!firstname || !lastname || !phone || !password || !group) {
        res.status(400).json({ message: "There is empty fields" })
    }

    const sqlQuery = 'INSERT INTO users (first_name,lastName,phone,role,group_id,password) VALUES(?, ?, ?, ?, ?, ?)'

    db.query(sqlQuery, [firstname, lastname, phone, 3, group, password], (err, result) => {
        if (err) {
            console.log("Error inserting data: ", err)
            return res.status(500).json({ message: "Database error" })
        }
        res.status(201).json({
            messsage: "User added successfully",
            userId: result.insertId
        })
    })
})



app.get("/groups", (req, res) => {
    const query = "SELECT * FROM groups"
    db.query(query, (err, results) => {
        if (err) {
            console.log("Error fetching users: " + err);
            res.status(500).send({ message: "Error fetching groups", error: err })
        } else {
            res.status(200).send(results)
        }
    })
})


app.get("/objects", (req, res) => {
    const query = "SELECT * FROM objects"
    db.query(query, (err, results) => {
        if (err) {
            console.log("Error fetching users: " + err);
            res.status(500).send({ message: "Error fetching groups", error: err })
        } else {
            res.status(200).send(results)
        }
    })
})


const PORT = 3080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});