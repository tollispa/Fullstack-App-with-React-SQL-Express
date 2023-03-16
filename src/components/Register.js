import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from "react-router-dom"


function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [checkpwd, setCheckpwd] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
   
    const handleSubmit = (e) => {
        e.preventDefault();
       
        if (password !== checkpwd) {
            toast.error("Must contain same password")
            return
        }
     
       axios.post("http://localhost:4000/register", {
        name: name.trim(),
        password: password,
        age: age,
        gender: gender
    }).then((res) => {
        if (res.status === 200) {
            console.log(res)
           toast.success(res.data)
           setName("")
           setPassword("")
           setCheckpwd("")
        }
    }).catch((err) => {
        toast.error(err.response.data)
    })
    }

    
    return ( 
    
        <div className="AddUser" style={{textAlign: "center"}}>
    
       
       <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <TextField 
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          autoComplete="off" 
          sx={{ mb: 2 }}
        />
        <br />
        <TextField
          label="Password"
          value={password}
         type="password"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          autoComplete="off" 
          sx={{ mb: 2 }}
          
        /> <br/>
            <TextField
          label="Confirm password"
          value={checkpwd}
         type="password"
         autoComplete="off" 
          onChange={(e) => setCheckpwd(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          
        /> 
         
        <br /> 
        <TextField
          label="Age"
          value={age}
         type="number"
         autoComplete="off" 
          onChange={(e) => setAge(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          
        /> 
         <br/>
         <label style={{ 
  fontSize: '1.2rem', 
  fontWeight: 'bold', 
  color: 'gray', 
  marginBottom: '10px',
  marginRight: "10px"
}}>
  Select Gender
</label>
        <Select
          labelId="gender-label"
          id="gender-select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}>
          
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
     
        <br/>
        <Button variant="contained" style={{ backgroundColor: 'green', width: "15%", maxWidth: "250px", minWidth: "200px", marginTop: "10px"}} color="primary" type="submit">
          Submit
        </Button>
      </form>
      <p>Already have an account? Go to <Link to="/login">login</Link></p>
             

<ToastContainer/>

      </div>
   
     );
}

export default Register;