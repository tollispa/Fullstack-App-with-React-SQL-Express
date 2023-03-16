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
        <>
         
    
   
      <div style={{visibility: `${display}`}}>
      <h1 style={{fontSize: "20px", paddingTop: "20px"}}>Add TodoList</h1>
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
      <Button variant="contained" style={{backgroundColor: "grey"}}onClick={onSubmit}>
        Submit List
      </Button>
    </div>
  
   
<ToastContainer/>

        </>
     );
}

export default Users;