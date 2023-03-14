const express = require("express");
const login = express.Router();

const db = require("../database/db");


login.post("/", (req, res) => {
    const {name, password} = req.body
   const query = "SELECT * FROM users WHERE name = ? and password = ?"
   const loggedIn = req.session.userId

   if(loggedIn){
      
      res.status(400).send({messege: "Someone is already logged in, please logout first!"})
       return
   }

   db.query(query, [name, password], (err, result) => {
    if (err) {
        res.status(400).send(err)
        
    }

    if (result.length > 0) {
        
        req.session.userId = result[0].id;
        req.session.userName = result[0].name
        
        res.status(200).send(result[0].name)
        
     
      
       req.session.save()
       
     
    }else {
       
        res.status(401).send({messege: "Incorect name/password combination"})
    }
    
   })
})





module.exports = login