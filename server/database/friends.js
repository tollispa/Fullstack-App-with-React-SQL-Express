const express = require("express");
const friends = express.Router();

const db = require("../database/db");

friends.get("/", (req, res) => {
    const userID = req.session.userId
    const query = `SELECT u.name FROM friend f
    INNER JOIN users u ON f.friend_id = u.id
    WHERE f.user_id = ${userID}
    UNION
    SELECT u.name FROM friend f
    INNER JOIN users u ON f.user_id = u.id
    WHERE f.friend_id = ${userID}
    `
    

    if (!userID) {
        return res.status(400).send("Invalid user ID")
    }
    
    db.query(query,  (err, result) => {
        if (err) {
            console.log(err)
          
            res.send(err)
        }
        res.send(result)

    })

})

module.exports = friends