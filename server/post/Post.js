const express = require("express");
const post = express.Router();
// const Joi = require('joi');

const db = require("../database/db");

post.post("/", (req, res) => {
    const post = req.body.message
    const id = req.session.userId 
    const query = "INSERT INTO post (user_id, content) VALUES (?, ?)"
    
    db.query(query, [id, post], (err, result) => {
        if (err) {
            console.log(err)
        }else{
            res.sendStatus(200)
          
        }
    })
})

module.exports = post