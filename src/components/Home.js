import axios from "axios"
import {useState, useEffect} from "react"
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom"
function Home() {
    const [showFeed, setShowFeed] = useState("none")
    const [post, setPost] = useState("")
    const [friendsPosts, setFriendsPosts] = useState([])
    const [header, setHeader] = useState("")
    useEffect(()=> {
        axios.get("http://localhost:4000/isLoggedIn")
        .then((res) => {
          setShowFeed("block")
          setHeader("Welcome, " + res.data + "!")
     
          
        }).catch((err) => {
      
        })
        },[])

        useEffect(() => {
            axios.get("http://localhost:4000/getposts")
            .then((res) => {
                
                setFriendsPosts(res.data)
            })
        }, [])

        const postMessage = () => {
            axios.post("http://localhost:4000/post", {
                message: post
            }).then((res) => {
       
        if(res.data === "OK") {
            setPost("")
            axios.get("http://localhost:4000/getposts")
            .then((res) => {
                setFriendsPosts(res.data)
            })
           
        }
            }).catch((err)=> {
                alert(err.response.data.message)
            })
        }
        const deletePost = (ID) => {
           axios.delete("http://localhost:4000/deleteposts", {
            data: {
                id: ID
            }
                
            
           }).then((res) => {
            axios.get("http://localhost:4000/getposts")
           .then((res) => {
            setFriendsPosts(res.data)
           })
           })
        }

      

    return ( 
        <div style={{display: `${showFeed}`, position: "absolute", top:"10%", textAlign: "center"}}>
            <h1>{header}</h1>
            <label style={{fontFamily: "sans-serif", fontWeight: "bold", padding: "10px", color: "grey"}}>What are you doing right now?</label><br/>
            <TextField style={{paddingTop:"10px", minWidth: "350px", display: "inline-block", borderRadius: "15px"}}type="text"
           value={post}
           onChange={(e) => setPost(e.target.value)}/><br/>
            <button style={{fontSize: "18px",fontWeight: "bold",backgroundColor: "#66a3ff", border: "2px solid #66a3ff", borderRadius: "5px",color: "white", minWidth:"200px", margin: "10px", padding: "5px"}}
            onClick={postMessage}>POST</button>

            
            {friendsPosts.length > 0 ? friendsPosts.slice().reverse().map((post) => 
            
            <p style={{position: "relative", marginTop: "17px",borderRadius: "5px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", minWidth: "400px",padding: "15px"}}key={post.id}><span><span style={{fontWeight: "bold", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", padding: "7px", borderRadius: "8px", position: "absolute", left: "10px"}}>{post.name}</span>
            <img alt ="/"style={{height: "60px", width:"60px", borderRadius: "50%", marginLeft: "10px", marginBottom: "15px",display: "inline-block"}} 
            src={post.avatar_url ? post.avatar_url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
            <br/> </span><span style={{ fontWeight: "bold", color: "grey", backgroundColor: "#f0f5f5", padding: "6px", borderRadius: "5px"}}>{post.content} </span><br/><span style={{color: "grey", fontFamily: "cursive", fontSize: "10px"}}>{post.created_at.replace("T", " ").substring(0, 16)}</span>
            <button onClick={() => deletePost(post.id)}style={{border: "1px solid white", color: "white",marginLeft: "20px",minHeight: "10px", minWidth: "10px", borderRadius: "5px", backgroundColor:"grey", position: "absolute"}}>🗑️</button>
            </p>) : <div style={{fontWeight: "bold", fontSize: "34px", color: "grey"}}>No posts! <br/><span 
            style={{fontSize:"20px", color: "black"}}>Check <Link to="users">Users</Link> and add some friends to see posts!</span></div>}

        </div>
     );
}

export default Home;