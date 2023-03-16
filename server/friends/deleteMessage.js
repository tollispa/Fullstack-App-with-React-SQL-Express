const express = require("express");
const deleteMessage = express.Router();
const Joi = require("joi")
const db = require("../database/db");

const schema = Joi.object({
    id: Joi.number().required()
})
deleteMessage.delete("/", (req, res) => {
    const messegeID = req.body.id 
    const userID = req.session.userId 
   const query = "DELETE FROM message WHERE receiver_id = ? AND id = ?"
   const { error} = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
       
        return;
    }
    db.query(query, [userID, messegeID], (err, result) => {
        if(err) {
            res.sendStatus(500)
        }else {
           
            res.send({messege: "Message deleted"})
        }
    })
})

module.exports = deleteMessage