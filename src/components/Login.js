import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom"
import Home from "./Home"



function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  
    const [loginForm, setLoginForm] = useState("inline-block")
   
    useEffect(()=> {
        axios.get("http://localhost:4000/isLoggedIn")
        .then((res) => {
          
        
         setLoginForm("none")
         
        console.log(res)
          
        }).catch((err) => {
      
        console.log(err)
        })
        },[])
// useEffect(() => {
//   axios.get("http://localhost:4000/user")
//   .then((res) => {
//     console.log("new ", res.data[0].name)
//     if(res.data[0].avatar_url === "") {r5 5
//       setTimeout(() => {
//         toast.info("Go to Settings to select your Avatar!")
//       }, 3000)

//     }
//   })
// }, []) // If Avatar has not been chosen yet, an alert willl pop up to remind user to choose an Avatar

  
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

  

    

    return ( 
    
        <div className="AddUser" style={{display: "flex",justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "10%"}}>
        <div className="AddUser">
      
      <form className="form" style={{display: `${loginForm}`, padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", borderRadius: "10px"}} onSubmit={handleSubmit}>
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
     <p style={{marginTop: "7px"}}>Dont have an account? Visit <Link to="/register">here</Link></p>
      </form>
    
    </div>
   
             
  <Home></Home>

<ToastContainer/>
      </div>
     );
}

export default Login;