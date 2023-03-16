const express = require("express");
const Joi = require('joi');
const register = express.Router();
const db = require("../database/db");

register.post("/", (req, res) => {
    const schema = Joi.object({
        name: Joi.string().regex(/^\S+$/).required(),
        password: Joi.string().required(),
        age: Joi.number().required().integer(),
        gender: Joi.string().valid('male', 'female').required()
    });
    const options = {
        messages: {
          'string.pattern.base': 'Name cant contain space!'
        }
      };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        res.status(400).send(error.details[0].message);
       
        return;
    }

    const {name, password} = value;
   const age = req.body.age;
   const gender = req.body.gender
    const query = `INSERT INTO users (name, password, gender, age) VALUES (?, ?, ?, ?)`;
    const checkName = "SELECT * FROM users WHERE name = ?"

    db.query(checkName, [name], (err, result) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
        }
        if (result.length > 0) {
            res.status(409).send("Username already taken");
            
          } else {
            db.query(query, [name, password, gender, age], (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(500).send("Error registering user");
                } else {
                    
                    res.send("User added!")
                }
            })
          }
    })


});

module.exports = register;

  
  