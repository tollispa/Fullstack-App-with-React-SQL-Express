

const db = require("../database/db");

function deleteTodos (req, res)  {
   const TodoId = req.body.id
   const userID = parseInt(req.params.id)
   const ID = req.session.userId

   if(ID !== userID) {
    console.log(ID, userID)
   res.status(404).send({messege: "Not authorized!"})
   return
   }
const query =  "DELETE FROM todos WHERE user_id = ? AND id = ?"

db.query(query, [userID, TodoId], (err, result) => {
    if (err) {
        res.status(400).send("Delete error")
    }else {
        res.send(result)
    }
})
}

module.exports.deleteTodos = deleteTodos

