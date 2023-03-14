const express = require("express");
const users = express.Router();

const db = require("../database/db");

users.get("/", (req, res) => {
    const query = "SELECT * from users"

    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send(err)
        }
        res.status(200).send(result)
    })
})



module.exports = users