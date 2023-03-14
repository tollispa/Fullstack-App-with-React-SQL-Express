const express = require("express");
const deleteMessage = express.Router();

const db = require("../database/db");

deleteMessage.delete("/", (req, res) => {
    const messegeID = req.body.id 
    const userID = req.session.userId 
   const query = "DELETE FROM message WHERE receiver_id = ? AND id = ?"
  
    db.query(query, [userID, messegeID], (err, result) => {
        if(err) {
            res.sendStatus(404)
        }else {
            console.log(userID, "Deleted the message with ID: ", messegeID)
            res.send({messege: "Message deleted"})
        }
    })
})

module.exports = deleteMessage