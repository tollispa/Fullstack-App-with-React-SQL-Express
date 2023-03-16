import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
// import {  MenuItem, Select } from "@mui/material";

function AllUsers() {
  const [users, setUsers] = useState([]);
 
  const navigate = useNavigate();
  // const [gender, setGender] = useState("")
  // const howManyUsers = users.length
 
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:4000/users")
      .then((res) => {
        
        setUsers(res.data)
        
      });
  }, []);
  
 
  useEffect(()=> {
    axios.get("http://localhost:4000/isLoggedIn")
    .then((res) => {
      

  
     
    }).catch((err) => {
    navigate("/")
   
    })
    } )
const addFriend = (ID) => {
  axios.post("http://localhost:4000/addfriend", {
    id: ID
  }).then((res) => {
   toast.success(res.data.messege)
   
  }).catch((err) => {
   toast.error(err.response.data.messege)
  })
 

}
 
  const avatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
     
      


     
        <div style={{display: "block"}}>
          {users.map((user) => (
            <p style={{border: "2px solid #ccc", boxShadow: "2px 2px 4px #ccc", paddingLeft: "10px",paddingBottom: "5px", margin: "5px", display: "block"}} key={user.id}>
      
              <br/><Button variant="contained" component={Link} to={`/todolist/${user.id}`} style={{ backgroundColor: `black`, maxWidth: "200px", minWidth: "200px" }}>
                {user.name}'S Todolist
              </Button><br/>
              
              <Button style={{backgroundColor: "grey", color: "white", maxWidth: "250px", minWidth: "200px", marginTop: "5px"}}onClick={() => addFriend(user.id)}>Add {user.name}</Button>
              <strong><img style={{maxHeight: "100px", width: "100px", padding: "10px", borderRadius: "30%"}} src={user.avatar_url ? user.avatar_url : avatar} alt={user.avatar_url}/></strong>
              <br/><strong style={{color: "grey"}}>Last seen online: <span style={{color: "lightBlue"}}>{user.last_seen_online}</span></strong>
            </p>
          ))}
        </div>
     
    <ToastContainer/>
   
    </Box>
  );
}

export default AllUsers;
