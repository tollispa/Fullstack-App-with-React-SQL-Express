const express = require("express");
const db = require("../database/db");
const messengeFriend = express.Router();
const Joi = require('joi');


messengeFriend.post("/", (req, res) => {

    const messageSchema = Joi.object({
        messege: Joi.string().max(25).required(),
        name: Joi.string().required(),

      });
    
    const userSendingMessege = req.session.userId 
    const recieverMessege = req.body.name
    const messege = req.body.messege
const query = `INSERT INTO message (message_text, sender_id, receiver_id, friend_id)
SELECT '${messege}', ${userSendingMessege}, receiver.id, 0
FROM users sender
JOIN users receiver ON receiver.name = '${recieverMessege}'
LEFT JOIN friend ON (friend.user_id = sender.id AND friend.friend_id = receiver.id)
WHERE sender.id = ${userSendingMessege}`

const { error } = messageSchema.validate(req.body);


if (error) {  
  res.status(400).json({ error: error.details[0].message });
  return;
}      

    
   db.query(query, (err, result) => {
    
    if (err) {
        console.log(err)
        res.sendStatus(500)
    }else {
        
        res.sendStatus(200)
    }
   })
})

module.exports = messengeFriend
