const express = require("express");
const login = express.Router();
const Joi = require('joi');

const db = require("../database/db");


login.post("/", (req, res) => {
    const loginSchema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
      });

      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
    
      
    const {name, password} = req.body
   const query = "SELECT * FROM users WHERE name = ? and password = ?"
   const loggedIn = req.session.userId

   if(loggedIn){
      
      res.status(400).send({messege: "Someone is already logged in, please logout first!"})
       return
   }

   db.query(query, [name, password], (err, result) => {
    if (err) {
        res.status(500).send(err)
        
    }

    if (result.length > 0) {
        
        req.session.userId = result[0].id;
        req.session.userName = result[0].name
        
        res.send(result[0].name)
        
     
      
       req.session.save()
       
     
    }else {
       
        res.status(401).send({messege: "Incorect name/password combination"})
    }
    
   })
})





module.exports = login