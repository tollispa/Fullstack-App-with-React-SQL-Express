const express = require("express")
const selectAvatar = express.Router();

const db = require("../database/db");

selectAvatar.post("/", (req, res) => {
    const user = req.session.userId
    const avatarUrl = req.body.url
const query = "UPDATE users SET avatar_url = ? WHERE id = ?"

if(!user) {
    return res.sendStatus(401)
}

db.query(query, [avatarUrl, user], (err, result) => {
if (err) {
    console.log(err)
}else {
    res.send({messege: "Avatar selected!"})
    
    
}
})
})

module.exports = selectAvatar