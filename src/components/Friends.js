import axios from "axios"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';




function Friends() {
    const [friends, setFriends] = useState([])
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [friendName, setFriendName] = useState('');
  
    const handleClose = () => setShowModal(false);
    const handleShow = (name) => {
      
      setFriendName(name);
      
      
      setShowModal(true);}
    
    const handleSendMessage = (name) => {
      if (messageText === "") {
        return toast.error("Please enter a message!")
      }
          axios.post("http://localhost:4000/messengefriend", {
            messege: messageText,
            name: name
          }).then((res) => {
            console.log(`${messageText} To: ${name}`)
            setTimeout(() => {
              toast.success("Message sent!")
            }, 300);

          }).catch((err) => {
            toast.error(err.response.data.error)
          })

      handleClose();
    };
    

 
   useEffect(() => {
axios.get("http://localhost:4000/friends")
.then((res) => {
setFriends(res.data)
console.log(res.data)

})
   },[])
   useEffect(()=> {
    axios.get("http://localhost:4000/isLoggedIn")
    .then((res) => {
      

  
     
    }).catch((err) => {
    navigate("/")
   
    })
    })

    const removeFriend = (Name) => {
      axios.delete("http://localhost:4000/deletefriends", {
        data: {
         name: Name
        }
      }).then((res) => {
toast.success(res.data.messege)
      }).catch((err) =>{
        console.log(err)
      })
     
    }

   if(friends.length === 0) {
    return <div style={{}}>
        <h1>You have no friends!</h1>
        <p>Click <Link to="/users">here</Link> to add friends!</p>
    </div>
   }

    return ( 
        <>
<h1 style={{ 
  fontFamily: 'Arial, sans-serif', 
  fontWeight: 'bold', 
  fontSize: '24px', 
  color: '#333', 
  marginBottom: '10px' 
}}>
  <p style={{color: "grey"}}>You have ({friends.length}) friends!</p>
  
  {friends.map((friend) => {
    return (
      <p 
        key={friend.name} 
        style={{ 
            fontSize: "35px",
          margin: '5px 0',
          padding: '5px', 
          left: "50%",
          backgroundColor: '#f7f7f7', 
          border: '1px solid #ccc',
          borderRadius: '5px' ,
          marginTop: "20px"
        }}
      >
        {friend.name}
        <Button onClick={() => handleShow(friend.name)} style={{ marginLeft: "15px", backgroundColor: "lightBlue", color: "white", maxWidth: "150px", minWidth: "150px"}}>Message 💬</Button>

<Modal show={showModal} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Send a Message</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="messageForm">
      <Form.Control
        as="textarea"
        placeholder="Enter your message here"
        value={messageText}
        onChange={(e) => {
        
          setMessageText(e.target.value)}}
        
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={() => handleSendMessage(friendName)}>
      Send
    </Button>
  </Modal.Footer>
</Modal>
        <Button onClick={() => removeFriend(friend.name)}style={{ marginLeft: "15px", backgroundColor: "red", color: "white", maxWidth: "150px", minWidth: "150px"}}>Remove 🗑️</Button>
      </p>
      
    );
  })}
<ToastContainer/>
</h1>

        </>
        
        
     );
}

export default Friends;