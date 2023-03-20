import axios from "axios"
import {useState, useEffect} from "react"

import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function Users() {
const [title, setTitle] = useState("")
const [desc, setDesc] = useState("")
const [display, setDisplay] = useState("hidden")



const onSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/createtodo", {
        title: title,
        desc: desc
    }).then((res) => {
if (res.status === 201) {
    toast.success("Todo list created")
    setDesc("")
    setTitle("")

}
    }).catch((err) => {
      toast.error(err.response.data)
    })
}
 
useEffect(()=> {
  axios.get("http://localhost:4000/isLoggedIn")
  .then((res) => {
    
   setDisplay("visible")
  console.log(res)
   
  }).catch((err) => {
setDisplay("hidden")
  console.log(err)
  })
  },[])

    return ( 
        <div style={{position: "absolute", left: "40%", top: "10%"}}>
         
    
   
      <div style={{visibility: `${display}`, display: "inline-block", margin: "10px", textAlign: "center",padding: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", borderRadius: "5px"}}>
      <h1 style={{fontSize: "20px", paddingTop: "10px"}}>Add TodoList</h1>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <br />
      <TextField
        label="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <br />
      <Button variant="contained" style={{backgroundColor: "lightblue"}}onClick={onSubmit}>
        Submit List
      </Button>
    </div>
  
   
<ToastContainer/>

        </div>
     );
}

export default Users;