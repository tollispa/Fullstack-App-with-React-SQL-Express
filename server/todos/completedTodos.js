const express = require("express");
const completedTodos = express.Router();


const db = require("../database/db");

completedTodos.put("/:id", (req, res) => {
   const todoID = req.body.id
   const userID = parseInt(req.params.id)
   const ID = req.session.userId
 
const query = `UPDATE todos SET completed = NOT completed WHERE id = ${todoID} AND user_id = ${userID}`
if (ID !== userID) {
    console.log(ID, userID)
    return res.status(404).send({messege: "Not authorized!"})
}

db.query(query, (err, result) => {
    if (err) {
        res.status(404).send(err)
    }else {
   
        res.status(200).send(result)
    }
})
})


module.exports = completedTodos
