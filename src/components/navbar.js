import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from "react";
import axios from "axios"
import NavDropdown from 'react-bootstrap/NavDropdown';


function MyNavbar() {
  const [navBarUsers, setNavbarUsers] = useState("none")
  const [login, setLogin] = useState("Login")
  const [register, setRegister] = useState("block")
  const [user, setUser] = useState([])
  useEffect(() => {
    axios.get("http://localhost:4000/user")
    .then((res) => {
        setUser(res.data)
        console.log(res.data)
        
        
    })
    }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/isLoggedIn")
      .then((res) => {
        setNavbarUsers("block")
        setRegister("none")
        setLogin("Home🏠")
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  let avatar = user.map((user) => user.avatar_url)
  const nr = user.map((user) => user.total_friends)
  const totalMessages = user.map((user) => user.total_messages_received)
  
  if(avatar[0] === "") {
    avatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
  
  return (
    <Navbar style={{ backgroundColor: `black` }} expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: 'white', cursor: "pointer" }}>{login}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/users" style={{ color: 'white', display: `${navBarUsers}`, marginLeft: "5px", cursor: "pointer" }}>Users👥</Nav.Link>
            <Nav.Link href="/friends" style={{ color: 'white', display: `${navBarUsers}`, marginLeft: "30px", cursor: "pointer" }}>Friends(<span style={{color: "red"}}>{nr}</span>)👫</Nav.Link>
            <Nav.Link href="/messenges" style={{ color: 'white', display: `${navBarUsers}`, marginLeft: "30px", cursor: "pointer" }}>Messages(<span style={{color: "red"}}>{totalMessages}</span>)📩</Nav.Link>
            <Nav.Link href="/register" style={{ color: 'white', marginLeft: "30px", cursor: "pointer", display: `${register}` }}>Register 🔑</Nav.Link>
            <NavDropdown style={{display: `${navBarUsers}`, position: "absolute", right: "90px"}}
            
            title={<div><img alt={avatar}style={{height: "30px", width: "30px", marginRight: "8px", borderRadius: "5px", objectFit: "cover"}}src={avatar}/>Settings</div>} id="basic-nav-dropdown" className="account-dropdown">
  <NavDropdown.Item href="/select-avatar">Select Avatar 📷</NavDropdown.Item>
  <NavDropdown.Item href="/profile">Account 🔧</NavDropdown.Item>
</NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
