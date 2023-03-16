import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom"

import Users from './Users';



function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState("Login");
    const [loginForm, setLoginForm] = useState("inline-block")
    const [logoutBtn, setLogoutBtn] = useState("none")
  
    useEffect(()=> {
        axios.get("http://localhost:4000/isLoggedIn")
        .then((res) => {
          
         setLogin("Welcome, " + res.data + "!")
         setLoginForm("none")
         setLogoutBtn("inline-block")
        console.log(res)
         
        }).catch((err) => {
      
        console.log(err)
        })
        },[])
useEffect(() => {
  axios.get("http://localhost:4000/user")
  .then((res) => {
    console.log("new ", res.data[0].name)
    if(res.data[0].avatar_url === "") {
      setTimeout(() => {
        toast.info("Go to Settings to select your Avatar!")
      }, 3000)

    }
  })
}, [])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();  
        if (name === "" || password === "") {
          return toast.error("Please fill in the empty input!")
        }
        axios.post("http://localhost:4000/login", {
            name: name.trim(), 
            password: password
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                
                setTimeout(() => {
                  window.location.reload();
                }, 300);
            }
        }).catch((err) => {
            toast.error(err.response.data.messege)
        })
    }

    const handleLogout = (e) => {
        e.preventDefault()
axios.post("http://localhost:4000/logout")
.then((res) => {
  
  setTimeout(() => {
    window.location.reload();
  }, 300);
})
    }

    

    return ( 
        <div className="AddUser" style={{textAlign: "center"}}>
        <div className="AddUser">
      <h1>{login}</h1>
      <form className="form" style={{display: `${loginForm}`}} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          type="text"
          autoComplete="off" 
          sx={{ mb: 2 }}
        />
        <br />
        <TextField
          label="Password"
          autoComplete="off" 
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
       
          sx={{ mb: 2 }}
        />
        <br />
        <Button variant="contained" type="submit" style={{backgroundColor: "green", maxWidth: "100px", minWidth: "100px"}}>
      Login
        </Button>
     <p>Dont have an account? Visit <Link to="/register">here</Link></p>
      </form>
      <Button variant="contained" style={{backgroundColor: "red",  maxWidth: "100px", minWidth: "100px", display: `${logoutBtn}`}} onClick={handleLogout}>
          Logout
        </Button>
    </div>
   
             <Users></Users>


<ToastContainer/>
      </div>
     );
}

export default Login;