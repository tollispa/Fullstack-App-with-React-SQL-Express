const express = require("express")
const avatars = express.Router();

const db = require("../database/db");

avatars.get("/", (req, res) => {
const query = "SELECT * from avatars"

db.query(query, (err,result) => {
if (err) {
    console.log(err)
}else {
    res.send(result)
    
}
})
})

module.exports = avatars