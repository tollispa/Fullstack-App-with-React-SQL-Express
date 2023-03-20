import axios from "axios"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
function Profile() {
const [friends, setFriends] = useState([])


useEffect(() => {
axios.get("http://localhost:4000/user")
.then((res) => {
    setFriends(res.data)
    
    
})
}, [])
const onclick=(e) => {
  e.preventDefault()
  alert("Ingen funktion än")
}
const deleteAccount = () => {
  axios.delete("http://localhost:4000/deleteaccount")
  .then((res) => {
    console.log(res)
  })
}

    return (
        <>
        <h1 style={{ textAlign: "center", margin: "20px 0", fontWeight:"bold", color: "#333"}}>Your Account</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form style={{ width: "50%", textAlign: "left" }}>
            <p>
              <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
              {friends.map((friend) => friend.name)}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Age:</span>{" "}
              {friends.map((friend) => friend.age === 0 ? "(?)" : friend.age)}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Gender:</span>{" "}
              {friends.map((friend) => friend.gender === "male" ? "♂️" : "♀️")}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Avatar:</span>{" "}
              <img
                style={{ height: "50px", width: "50px", borderRadius: "30%" }}
                src={friends.map((friend) => friend.avatar_url === "" ? "No avatar" : friend.avatar_url)}
                alt="Avatar"
              />
            </p>
            <button onClick={onclick} style={{backgroundColor: "black", color: "white", maxWidth: "100%", maxHeight: "100%", border: "2px solid black", borderRadius: "5px"}}>Remove Avatar</button>
            <p>
              Go to{" "}
              <Link to="/select-avatar" style={{ fontWeight: "bold" }}>
                Avatar
              </Link>{" "}
              to change your avatar.
            </p>
            <p>
              You have{" "}
              <span style={{ fontWeight: "bold" }}>
                {friends.map((friend) => friend.total_friends)}
              </span>{" "}
              friends! Go to{" "}
              <Link to="/users" style={{ fontWeight: "bold" }}>
                Users
              </Link>{" "}
              to add more!
            </p>
            <Button onClick={deleteAccount}style={{backgroundColor: "red", color:"white"}}>Delete Account</Button>
          </form>
        </div>
      </>
    )
}

export default Profile