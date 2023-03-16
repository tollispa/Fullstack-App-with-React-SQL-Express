const express = require("express");
const User = express.Router();

const db = require("./db");

User.get("/", (req, res) => {
    const user = req.session.userId 
    // const query = "SELECT u.*, (SELECT COUNT(*) FROM friend WHERE user_id = u.id OR friend_id = u.id) AS total_friends FROM users u WHERE u.id = ?"
    const query = `SELECT u.*, 
    (SELECT COUNT(*) FROM friend WHERE user_id = u.id OR friend_id = u.id) AS total_friends, 
    COUNT(m.receiver_id) AS total_messages_received
FROM users u 
LEFT JOIN message m ON u.id = m.receiver_id 
WHERE u.id = ?
GROUP BY u.id`
    db.query(query, [user, user], (err, result) => {
        if (err) {
            res.send(err)
        }else {
            res.send(result)
        }
       
       
    })
})

module.exports = User
