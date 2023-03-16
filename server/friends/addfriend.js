const express = require("express");
const addFriend = express.Router();
const Joi = require("joi")

const db = require("../database/db");

addFriend.post("/", (req, res) => {
    const addFriendSchema = Joi.object({
        id: Joi.number().integer().positive().required(),
      });
      const { error } = addFriendSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
    
    const userID = req.session.userId
    const friendID = req.body.id
  
   const query = " INSERT INTO friend (user_id, friend_id) VALUES (?, ?)"
   const checkFriends = `SELECT COUNT(*) as count FROM friend WHERE (user_id = ${userID} AND friend_id = ${friendID}) OR (user_id = ${friendID} AND friend_id = ${userID})`


    if (userID === friendID) {
         res.status(400).send({messege: "Cant add yourself!"});
         
         return
        

      }
      db.query(checkFriends, (err, result) => {
        if (result && result.length > 0 && result[0].count > 0) {
          
            
            res.status(400).send({messege: "You are aldready friends!"})
            return
        } else {
            db.query(query, [userID, friendID], (err, result) => {
                if (err) {
                    console.log(err)
                    res.sendStatus(500)
                } else {
                   
                    res.send({messege: "Added to your friendslist!"})
                }
            })

        }
      })
   

})  


module.exports = addFriend
