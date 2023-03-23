const express = require("express");
const deletePost = express.Router();

const db = require("../database/db");
deletePost.delete("/", (req, res) => {
    const id = req.session.userId
    const post = req.body.id
    const query = `DELETE FROM post
    WHERE id = ?
    AND user_id = ?`

    db.query(query, [post, id] ,(err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.send({message: "Post deleted!"})
           
        }
    })
})

module.exports = deletePost

