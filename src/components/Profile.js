import axios from "axios"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

function Profile() {
const [friends, setFriends] = useState([])

axios.defaults.withCredentials = true;
useEffect(() => {
axios.get("http://localhost:4000/user")
.then((res) => {
    setFriends(res.data)
    
    
})
}, [])




    return (
        <>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>Your Account</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form style={{ width: "50%", textAlign: "left" }}>
            <p>
              <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
              {friends.map((friend) => friend.name)}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Age:</span>{" "}
              {friends.map((friend) => friend.age)}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Gender:</span>{" "}
              {friends.map((friend) => friend.gender)}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Avatar:</span>{" "}
              <img
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                src={friends.map((friend) => friend.avatar_url)}
                alt="Avatar"
              />
            </p>
            <p>
              Go to{" "}
              <Link to="/select-avatar" style={{ fontWeight: "bold" }}>
                Select Avatar
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
          </form>
        </div>
      </>
    )
}

export default Profile