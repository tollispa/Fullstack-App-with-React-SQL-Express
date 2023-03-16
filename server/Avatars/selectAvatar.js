const express = require("express")
const selectAvatar = express.Router();
const Joi = require('joi');

const db = require("../database/db");

selectAvatar.post("/", (req, res) => {
    const selectAvatarSchema = Joi.object({
        url: Joi.string().required()
      });
      
      const { error } = selectAvatarSchema.validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }


    const user = req.session.userId
    const avatarUrl = req.body.url
const query = "UPDATE users SET avatar_url = ? WHERE id = ?"

if(!user) {
    return res.sendStatus(401)
}

db.query(query, [avatarUrl, user], (err, result) => {
if (err) {
    console.log(err)
}else {
    res.send({messege: "Avatar selected!"})
    
    
}
})
})

module.exports = selectAvatar