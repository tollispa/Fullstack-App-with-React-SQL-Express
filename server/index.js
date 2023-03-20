const express = require("express")

const cors = require("cors")

const cookieParser = require("cookie-parser")
const session = require("express-session")
const bodyParser = require("body-parser")
const app = express();
const register = require("./register/register") 
const login = require("./login/login")
const logout = require("./logout/logout")
const todos = require("./todos/todos")
const postTodo = require("./todos/createTodo")
const users = require("./database/users")
const completedTodos = require("./todos/completedTodos")
const addFriend = require("./friends/addfriend")
const friends = require("./database/friends")
const deleteFriend = require("./friends/deletefriend")
const messengeFriend = require("./friends/messengefriend")
const getMessenge = require("./friends/getmessenges")
const deleteMessage = require("./friends/deleteMessage")
const avatars = require("./database/avatars")
const selectAvatar = require("./Avatars/selectAvatar")
const User = require("./database/UserInfo")
const deleteAcc = require("./deleteAccount/deleteAcc")
const post  = require("./post/Post")
const getPost = require("./post/GetPosts")
const deletePost = require("./post/deletePosts")

app.use(session({
    key: "userId",
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    
    cookie: {
        domain: "localhost",
        path: "/",
        maxAge: 1000 * 60 * 24,
        httpOnly: true
      
    },
}));


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/register", register)
app.use("/login", login)
app.use("/logout", logout)
app.use("/todos", todos)
app.use("/createTodo", postTodo)
app.use("/users", users)
app.use("/completedtodos", completedTodos)
app.use("/addfriend", addFriend)
app.use("/friends", friends)
app.use("/deletefriends", deleteFriend)
app.use("/messengefriend", messengeFriend)
app.use("/messege", getMessenge)
app.use("/deletemessage", deleteMessage)
app.use("/avatars", avatars)
app.use("/selectavatar", selectAvatar)
app.use("/user", User)
app.use("/deleteaccount", deleteAcc)
app.use("/post", post)
app.use("/getposts", getPost)
app.use("/deleteposts", deletePost)


app.get("/isLoggedIn", (req, res) => {

    if (req.session.userName) {
        res.status(200).send(req.session.userName)
    } else {
        res.sendStatus(401)
    }
    
})



app.listen(4000, () => {
console.log("server running on 4000")
})