
const Joi = require('joi');

const deleteTodosSchema = Joi.object({
  id: Joi.number().required()
});
const db = require("../database/db");

function deleteTodos (req, res)  {
   const TodoId = req.body.id
   const userID = parseInt(req.params.id)
   const ID = req.session.userId
   const { error } = deleteTodosSchema.validate(req.body);
 
   if (error) {
     return res.status(400).send(error.details[0].message);
       
     }
   if(ID !== userID) {
    console.log(ID, userID)
   res.status(404).send({messege: "Not authorized!"})
   return
   }
const query =  "DELETE FROM todos WHERE user_id = ? AND id = ?"

db.query(query, [userID, TodoId], (err, result) => {
    if (err) {
        res.status(500).send(err)
    }else {
        res.send(result)
    }
})
}

module.exports.deleteTodos = deleteTodos

