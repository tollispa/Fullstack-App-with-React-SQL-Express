const express = require("express");
const post = express.Router();
const Joi = require('joi');

const db = require("../database/db");
const schema = Joi.object({
    message: Joi.string().required()
})
post.post("/", (req, res) => {
    const post = req.body.message
    const id = req.session.userId 
    const query = "INSERT INTO post (user_id, content) VALUES (?, ?)"
    
const { error } = schema.validate(req.body)
if(error) {
     res.status(400).send({message: "Value cant be empty!"})
  
     return
}

    db.query(query, [id, post], (err, result) => {
        if (err) {
            console.log(err)
        }else{
            res.sendStatus(200)
          
        }
    })
})

module.exports = post