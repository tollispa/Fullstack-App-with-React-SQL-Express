import axios from "axios"
import {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';




function Messenges() {
    const [messege, setMessege] = useState([])
    const navigate = useNavigate()
   

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
        margin: '3px',
        padding: '10px', 
        backgroundColor: '#f7f7f7', 
        border: '1px solid #ccc',
        borderRadius: '5px',
        display: "inline-block",
        minWidth: "300px",
        maxWidth: "300px",
        maxHeight: "200px",
        minHeight: "150px"
        
      }}>
     
      <p><strong></strong> <span style={{fontFamily: 'cursive', marginLeft: "0px",color: "white", backgroundColor: "lightBlue", paddingTop: "5px", paddingBottom: "5px", paddingLeft: "10px", paddingRight: "10px", borderRadius: "15px"}}>{messeges.message_text}</span></p>
      <p><strong>From:</strong> {messeges.sender_name}</p>
      <p><strong>Sent:</strong> {messeges.received_at.replace("T", " ").substring(0, 16)}</p>
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