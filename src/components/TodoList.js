import {useState, useEffect} from 'react'
import axios from "axios"
import {useParams, Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';



function TodoList() {
    const {userID} = useParams();
    const [todos, setTodos] = useState([]);
  

    const completed = (ID) => {
      axios.put(`http://localhost:4000/completedtodos/${userID}`, {
        id: ID
      }).then((res) => {
        console.log(ID)
        axios.get(`http://localhost:4000/todos/${userID}`).then((res) => {
          setTodos(res.data);
        }).catch((err) => {
          toast.error(err.response.data.messege)
        });
      }).catch((err) => {
        toast.error(err.response.data.messege)
      });
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/todos/${userID}`)
            .then((res) => {
                setTodos(res.data);
                console.log(res.data)
               
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userID]);

    const deleteTodo = (ID) => {
        axios.delete(`http://localhost:4000/todos/${userID}`, {
          data: {
            id: ID
          }
        }).then((res) => {
          console.log(ID)
          axios.get(`http://localhost:4000/todos/${userID}`).then((res) => {
            setTodos(res.data);
          }).catch((err) => {
            toast.error(err.response.data.messege)
          });
          
        }).catch((err) => {
          toast.error(err.response.data.messege)
        })
      }
if (todos.length === 0) {
    return <div style={{textAlign: "center"}}>
    <h1 style={{fontSize: "24px", fontWeight: "bold"}}>
      You need to be friends to see his/her Todo-List!
    </h1>
    <div style={{display: "flex", justifyContent: "center", marginTop: "16px"}}>
      <Link to="/users" style={{marginRight: "32px", fontSize: "18px", fontWeight: "bold"}}>
        Back to all users
      </Link>
      <Link to="/" style={{fontSize: "18px", fontWeight: "bold"}}>
        Back to homepage
      </Link>
    </div>
  </div>
}
    
    return (
       
        <div style={{alignItems: "center"}}>
            <h1>TodoList</h1>
            {todos.map((todo, index) => (
                <p style={{fontWeight: "bold"}}key={todo.id}>{index +1}. Title: {todo.title} <br/> Description: {todo.description}
                <br/>Created at: {todo.created_at}
                <br/><Button style={{ backgroundColor: 'black', color:"white", marginLeft: "20px", marginRight: "5px"}}onClick={() => deleteTodo(todo.id)}>Delete Todo</Button>
                 {todo.completed === 1 ? (
        <Button style={{ backgroundColor: 'green', color:"white"}} onClick={() => completed(todo.id) }>
          Completed
        </Button>
      ) : (
        <Button style={{ backgroundColor: 'red', color:"white" }} onClick={() => completed(todo.id) }>
          Not Completed
        </Button>
      )}
      
                </p>
             
             
            ))}
            <br/>
      <Link to="/users">Back to users</Link>
      <br/>
      <Link to="/">Back to LoginPage</Link>
      <ToastContainer/>
        </div>
       
    );
}

export default TodoList;
