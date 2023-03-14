const express = require("express");
const logout = express.Router();

const db = require("../database/db");

logout.post("/", (req, res) => {
  const now = new Date();
const hours = now.getHours().toString().padStart(2, '0')
const minutes = now.getMinutes().toString().padStart(2, '0')

const month = now.getMonth() + "/" + now.getDate()
const timestamp = hours + ':' + minutes + " " + month
const user = req.session.userId 


const sessionID = req.headers.cookie
query = "UPDATE users SET last_seen_online = ? WHERE id = ?"
if(!sessionID) {
  res.send({messege: "You are not logged in"})
  return
}
db.query(query, [timestamp, user], (err,result) => {
  if(err) {
    console.log(err)
  }
  res.clearCookie("userId", { path: "/" })
  res.send({messege: "You are now logged out!"});

 
})
    
 
});

module.exports = logout;