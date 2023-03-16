React Todo App with User Authentication, Friend Management, Messaging Friends and Profile Picture Choosing.


Welcome to the React Todo App with User Authentication, Friend Management, and Messaging! This is a full-stack web application built with React, Express, and MySQL that allows users to create and manage todo lists, add friends, and send messages to their friends.

Getting Started
To get started with the React Todo App, you will need to have Node.js and MySQL installed on your local machine.
Go to the server and run node index.js to start the server.
then go to the client and run npm start to start the client.

Features
User Authentication
Users can create a new account with their name and password. Once registered, users can log in to their account with their name and password. Users can also log out of their account at any time.

Todo Lists
Users can create new todo lists with a title and description. Users can view their own todo lists on the home page, and they can edit or delete their own todo lists. Additionally, users can view their friends' shared todo lists on the friends page, but have no authorization to edit or delete them.

Friend Management
Users can see a list of all users that are registered. Then can add whoever they want. Users can view their friends on the friends page. Users can also remove friends from their friend list.

Messaging
Users can send messages to their friends from the friend list. Users can view their messages with a friend on the messages page. Users can see who sent the message and what time it was sent, they can also delete the message.

Avatar Image Selector API
This project is an API that allows users to choose from a selection of 10 avatar images and use them as their profile picture. When a user clicks on an avatar image, the image is added to the user's database entry and displayed as their profile avatar in the frontend.

How it Works
The API is built with Node.js and uses SQL to store user data. Here's an overview of how it works:

When a user logs in to the app, their user data is retrieved from the SQL database.

In the frontend, the user is presented with a selection of 10 avatar images to choose from.

When the user clicks on an avatar image, the API receives a POST request with the user's ID and the URL of the selected avatar image.

The API updates the user's database and stores the selected avatar image URL in the user's row.

When you go to the "Users" route you can see all users name and their chosen avatar images.

Technologies I Used
The React Todo App with User Authentication, Friend Management, and Messaging was built using the following technologies:

React
Express
MySQL
React Router
React Bootstrap
Axios
Node.js
