const express = require("express");
const postTodo = express.Router();
const Joi = require("joi");
const db = require("../database/db");

const todoSchema = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required()

});

postTodo.post("/", (req, res) => {
  const sessionID = req.headers.cookie
  if(!sessionID) {
    console.log("No session")
    res.status(400).send({messege: "You need to login first!"})
    return
  }
  const userId = parseInt(req.session.userId)
  
  const { error } = todoSchema.validate(req.body);
 
if (error) {
  return res.status(400).send(error.details[0].message);
    
  }
  
    const { title, desc } = req.body;
  
    const query = "INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)";
  
    db.query(query, [userId, title, desc], (err, result) => {
      if (err) {
        res.status(500).send("Error");
        console.log("Error", err);
      }
  
      res.status(201).send("Todo created successfully");
    });
  });
  
  module.exports = postTodo