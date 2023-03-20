const express = require("express");
const getPost = express.Router();
// const Joi = require('joi');

const db = require("../database/db");

getPost.get("/", (req, res) => {
    const id = req.session.userId
    const getFriendsId =`SELECT IF(user_id = ?, friend_id, user_id) AS friend_id
    FROM friend
    WHERE user_id = ? OR friend_id = ?`
    if (!id) return
    db.query(getFriendsId, [id, id, id], (err, result) => {
        if(err) {
            res.send(err)
        }
        
        let friendsId = result.map((ids) => ids.friend_id)

if (friendsId.length === 0) {
     friendsId = 0
   
}
        const query = `SELECT post.*, users.name, users.avatar_url
        FROM post
        JOIN users ON post.user_id = users.id
        WHERE post.user_id IN (${friendsId}, ${id});
        `
    
db.query(query, (err, results) => {
    res.send(results)
})
    })
})


module.exports = getPost