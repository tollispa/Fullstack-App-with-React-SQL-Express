const express = require("express");
const deleteFriend = express.Router();

const db = require("../database/db");
const Joi = require('joi');

const deleteFriendSchema = Joi.object({
  name: Joi.string().required().trim().min(1)
});
deleteFriend.delete("/", (req, res) => {
    const userID = req.session.userId 
    const friendName = req.body.name

   const query =   `DELETE FROM friend 
   WHERE (user_id = (SELECT id FROM users WHERE id = ${userID}) AND friend_id = (SELECT id FROM users WHERE name = '${friendName}'))
   OR (friend_id = (SELECT id FROM users WHERE id = ${userID}) AND user_id = (SELECT id FROM users WHERE name = '${friendName}'))
   
   `  
   const { error} = deleteFriendSchema.validate(req.body);

   if (error) {
       res.status(400).send(error.details[0].message);
      
       return;
   }
   db.query(query, (err, result) => {
    if (err) {
        res.status(500).send(err)
        console.log(err)
    }else {
         res.send({messege:"Friend removed!"})
      
    }
   })
   
})

module.exports = deleteFriend

