const express = require("express");
const completedTodos = express.Router();
const Joi = require('joi');

const schema = Joi.object({
  id: Joi.number().required()
});



const db = require("../database/db");

completedTodos.put("/:id", (req, res) => {
   const todoID = req.body.id
   const userID = parseInt(req.params.id) // Behövde göra till en INT för att kunna jämföra med ID
   const ID = req.session.userId
   const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

const query = `UPDATE todos SET completed = NOT completed WHERE id = ${todoID} AND user_id = ${userID}`
if (ID !== userID) {
    
    return res.status(404).send({messege: "Not authorized!"})
}

db.query(query, (err, result) => {
    if (err) {
        res.status(500).send(err)
    }else {
   
        res.status(200).send(result)
    }
})
})


module.exports = completedTodos
