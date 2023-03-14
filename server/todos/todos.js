const express = require("express");
const todos = express.Router();



const db = require("../database/db");
const {deleteTodos} = require("./deleteTodo");

todos.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.session.userId;
  const checkIfFriends = `SELECT 
    CASE 
      WHEN COUNT(*) > 0 THEN 'Yes' 
      ELSE 'No' 
    END AS are_friends 
    FROM friend 
    WHERE (user_id = LEAST(${userId}, ${id}) AND friend_id = GREATEST(${userId}, ${id}));`;

  db.query(checkIfFriends, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
      return;
    }

    const are_friends = result[0].are_friends;
    if (are_friends === "No" && userId !== id) {
      res.sendStatus(401);
      console.log("not friends")
      return;
    }

    const query = "SELECT * from todos where user_id = ?";
    db.query(query, id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
        return;
      }
      
      res.send(result);
      
    });
  });
});



  todos.delete("/:id", deleteTodos)

  module.exports = todos