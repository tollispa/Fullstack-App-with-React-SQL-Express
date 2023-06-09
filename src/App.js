import MyNavbar from './components/navbar';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import AllUsers from './components/Allusers';
import Friends from "./components/Friends"
import Messenges from './components/Messenges';
import Profile from './components/Profile';
import axios from "axios"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import SelectAvatar from './components/SelectAvatar';
import Users from './components/Users';

function App() {
  axios.defaults.withCredentials = true;
  return (
   <>  
   <BrowserRouter>
   <MyNavbar />
   <Routes>
     <Route path="/" element={<Login></Login>} />
     <Route path="/register" element={<Register></Register>} />
     <Route path="todolist/:userID" element={<TodoList></TodoList>} />
     <Route path="/users" element={<AllUsers></AllUsers>} />
     <Route path="/friends" element={<Friends></Friends>} />
     <Route path="/messenges" element={<Messenges></Messenges>} />
     <Route path="/select-avatar" element={<SelectAvatar></SelectAvatar>} />
     <Route path="/profile" element={<Profile></Profile>} />
     <Route path="/create-todo" element={<Users></Users>} />

   
   </Routes>
    </BrowserRouter>
   </>
  
    
  
  );
}

export default App;
