import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from "react";
import axios from "axios"
import NavDropdown from 'react-bootstrap/NavDropdown';


function MyNavbar() {
  const [navBarUsers, setNavbarUsers] = useState("none")
  const [login, setLogin] = useState("Login")
  

  useEffect(() => {
    axios.get("http://localhost:4000/isLoggedIn")
      .then((res) => {
        setNavbarUsers("block")
        setLogin(res.data + "'s Page")
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  

  return (
    <Navbar style={{ backgroundColor: `black` }} expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: 'white', cursor: "pointer" }}>{login}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/users" style={{ color: 'white', display: `${navBarUsers}`, marginLeft: "5px", cursor: "pointer" }}>Users👥</Nav.Link>
            <Nav.Link href="/friends" style={{ color: 'white', display: `${navBarUsers}`, marginLeft: "30px", cursor: "pointer" }}>Friends 👫</Nav.Link>
            <Nav.Link href="/messenges" style={{ color: 'white', display: `${navBarUsers}`, marginLeft: "30px", cursor: "pointer" }}>Messanges 📩</Nav.Link>
            <Nav.Link href="/register" style={{ color: 'white', marginLeft: "30px", cursor: "pointer" }}>Register 🔑</Nav.Link>
            <NavDropdown style={{display: `${navBarUsers}`, position: "absolute", right: "90px"}}title="Settings " id="basic-nav-dropdown" className="account-dropdown">
  <NavDropdown.Item href="/select-avatar">Select Avatar</NavDropdown.Item>
  <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
</NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
