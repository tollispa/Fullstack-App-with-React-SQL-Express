import axios from "axios"
import {useState, useEffect} from "react"
import TextField from '@mui/material/TextField';
function Home() {
    const [showFeed, setShowFeed] = useState("none")
    const [post, setPost] = useState("")
    const [friendsPosts, setFriendsPosts] = useState([])
    useEffect(()=> {
        axios.get("http://localhost:4000/isLoggedIn")
        .then((res) => {
          setShowFeed("block")
     
          
        }).catch((err) => {
      
        })
        },[])

        useEffect(() => {
            axios.get("http://localhost:4000/getposts")
            .then((res) => {
                console.log("posts", res.data)
                setFriendsPosts(res.data)
            })
        }, [])

        const postMessage = () => {
            axios.post("http://localhost:4000/post", {
                message: post
            }).then((res) => {
        if (post === ""){
            return alert("Cant be empty")
        }
        if (post.length > 20) {
            return alert("To long")
        }
        if(res.data === "OK") {
            setPost("")
            axios.get("http://localhost:4000/getposts")
            .then((res) => {
                setFriendsPosts(res.data)
            })
           
        }
            }).catch((err)=> {
                console.log(err)
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
      
        // if (friendsPosts.length === 0) {
        //     return <h1 style={{display: `${showFeed}`}}>No posts!</h1>
        // }



    return ( 
        <div style={{display: `${showFeed}`, position: "absolute", top:"10%", textAlign: "center"}}>
            <label style={{fontFamily: "sans-serif", fontWeight: "bold", padding: "10px", color: "grey"}}>What are you doing right now?</label><br/>
            <TextField style={{paddingTop:"10px", minWidth: "250px", display: "inline-block", borderRadius: "5px"}}type="text"
           value={post}
           onChange={(e) => setPost(e.target.value)}/><br/>
            <button style={{fontWeight: "bold",backgroundColor: "blue", border: "2px solid blue", borderRadius: "5px",color: "white", minWidth:"150px", margin: "10px", padding: "5px"}}
            onClick={postMessage}>POST</button>

            
            {friendsPosts.slice().reverse().map((post) => 
            
            <p style={{marginTop: "17px",borderRadius: "5px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", padding: "15px"}}key={post.id}><span><span style={{fontWeight: "bold", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", padding: "7px", borderRadius: "8px"}}>{post.name}</span><img style={{height: "50px", width:"50px", borderRadius: "50%", marginLeft:"10px"}} 
            src={post.avatar_url ? post.avatar_url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
            <br/> </span><span style={{ fontWeight: "bold", color: "grey"}}>{post.content} </span><br/><span style={{color: "grey", fontFamily: "cursive", fontSize: "10px"}}>{post.created_at.replace("T", " ").substring(0, 16)}</span>
            <button onClick={() => deletePost(post.id)}style={{border: "1px solid white", color: "white",marginLeft: "20px",minHeight: "10px", minWidth: "10px", borderRadius: "5px", backgroundColor:"grey", position: "absolute"}}>🗑️</button>
            </p>)}

        </div>
     );
}

export default Home;