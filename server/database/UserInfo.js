const express = require("express");
const User = express.Router();

const db = require("./db");

User.get("/", (req, res) => {
    const user = req.session.userId 
    const query = "SELECT u.*, (SELECT COUNT(*) FROM friend WHERE user_id = u.id OR friend_id = u.id) AS total_friends FROM users u WHERE u.id = ?"
    db.query(query, [user, user], (err, result) => {
        if (err) {
            res.send(err)
        }else {
            res.send(result)
        }
       
       
    })
})

module.exports = User
