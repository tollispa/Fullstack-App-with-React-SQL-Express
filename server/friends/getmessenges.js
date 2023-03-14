const express = require("express");
const getMessenge = express.Router();

const db = require("../database/db");

getMessenge.get("/", (req, res) => {
    const userID = req.session.userId
const query = `SELECT m.*, u1.name as sender_name
FROM message m
JOIN users u1 ON m.sender_id = u1.id
JOIN users u2 ON m.receiver_id = u2.id
WHERE m.receiver_id = ${userID}`

db.query(query, (err, result) => {
    if (err) {
        res.send(err)
    }else {
        res.send(result)
    
    }
})
})

module.exports = getMessenge


