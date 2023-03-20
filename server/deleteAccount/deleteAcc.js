const express = require("express");
const deleteAcc = express.Router();

const db = require("../database/db");

deleteAcc.delete("/", (req, res) => {
    const id = req.session.userId 
    console.log(id)
    const query = `START TRANSACTION;
    DELETE FROM post WHERE user_id = ${id};
    DELETE FROM message WHERE sender_id = ${id} OR receiver_id = ${id};
    DELETE FROM friend WHERE user_id = ${id} OR friend_id = ${id};
    DELETE FROM todos WHERE user_id = ${id};
    DELETE FROM users WHERE id = ${id};
    COMMIT;
    `
   
db.query(query,  (err, result) => {
    if (err){
        res.sendStatus(500)
        console.log(err)
    }else {
        res.send({message: "Account deleted!"})
        console.log("acc deleted")
    }
})

})

module.exports = deleteAcc