const express = require("express");
const deleteFriend = express.Router();

const db = require("../database/db");
deleteFriend.delete("/", (req, res) => {
    const userID = req.session.userId 
    const friendName = req.body.name

   const query =   `DELETE FROM friend WHERE user_id = (SELECT id FROM users WHERE id = ${userID}) AND friend_id = (SELECT id FROM users WHERE name = '${friendName}')
   `  
   
   db.query(query, (err, result) => {
    if (err) {
        res.status(400).send(err)
        console.log(err)
    }else {
         res.send({messege:"Friend removed!"})
      
    }
   })
   
})

module.exports = deleteFriend

