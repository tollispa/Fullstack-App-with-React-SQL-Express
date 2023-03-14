import axios from "axios"
import {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';




function Messenges() {
    const [messege, setMessege] = useState([])
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    useEffect(()=> {
        axios.get("http://localhost:4000/isLoggedIn")
        .then((res) => {
          
    
      
         
        }).catch((err) => {
        navigate("/")
       
        })
        })

useEffect(() => {
axios.get("http://localhost:4000/messege")
.then((res) => {
setMessege(res.data)

})
}, [])

const deleteMessage = (ID) => {
  axios.delete("http://localhost:4000/deletemessage", {
    data: {
      id: ID
    }
  }).then((res) => {
    toast.success(res.data.messege)
  })
}

if(messege.length === 0) {
    return <div style={{}}>
        <h1 style={{alignItems: "center", justifyContent: "center", display: "flex", color: "black"}}>You have no messanges!</h1>
        
    </div>
   }
    return ( 
        <div>
             
         <h2 style={{color: "grey"}}>You have ({messege.length}) messages!</h2>
            {messege.map((messeges) => {
  return (
    <div key={messeges.id} style={{ 
        fontSize: "15px",
        margin: '5px 0',
        padding: '10px', 
        backgroundColor: '#f7f7f7', 
        border: '1px solid #ccc',
        borderRadius: '5px',
        display: "inline-block",
        
      }}>
     
      <p><strong>Message:</strong> <span style={{fontFamily: 'cursive', color: "blue"}}>{messeges.message_text}</span></p>
      <p><strong>From:</strong> {messeges.sender_name}</p>
      <p><strong>Sent:</strong> {messeges.received_at}</p>
      <button onClick={() => deleteMessage(messeges.id)}
      style={{backgroundColor: "red", border: "2px solid red", borderRadius: "5px", color: "white"}}>Delete message</button>
    </div>
  )
})}
<ToastContainer/>
        </div>
     );
}

export default Messenges;