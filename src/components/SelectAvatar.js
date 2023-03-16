import axios from "axios"
import {useState, useEffect} from "react"
import { ToastContainer, toast } from 'react-toastify';

function SelectAvatar() {
    const [avatar, setAvatar] = useState([])
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:4000/avatars")
        .then((res) => {
         
            setAvatar(res.data)
        })
    }, [])

    const chooseAvatar = (url) => {
        axios.post("http://localhost:4000/selectavatar", {
            url: url
        }).then((res) => {
         
            toast.success(res.data.messege)
        })
    }
    return ( 
      <>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
  Select Your Avatar
</h1>

        <div>
      

<div style={{ display: "flex", flexWrap: "wrap" }}>
  {avatar.map((avatars) => {
    return (
      <p
        key={avatars.id}
        style={{
          margin: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <img
          style={{ maxHeight: "200px", maxWidth: "200px", display: "block", cursor: "pointer"}}
          onClick={() => chooseAvatar(avatars.img_url)}
          src={avatars.img_url}
          alt="Avatar"
        />
      </p>
    );
  })}
</div>

           <ToastContainer/>
        </div>
        </>
     );
}

export default SelectAvatar;