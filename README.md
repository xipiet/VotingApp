# Voting App

A simple, lightweight voting app to self host, built with **Node.js**, **Express**, and **Socket.IO** for real-time communication. It allows users to vote for candidates and an admin panel to manage candidates and voting status.

## Features
- **Admin Panel**: Add candidates and toggle voting.
- **Voting**: Users can vote for one candidate when voting is open.
- **Real-time Updates**: Clients automatically refresh the page when voting starts or stops.
- **Only One Vote per User**: Each user can vote once, tracked by IP address.

## Technologies Used
- **Node.js**: Backend server.
- **Express**: Web framework.
- **Socket.IO**: Real-time communication between the server and clients.
- **Body-parser**: Middleware for handling JSON requests.

---

## Requirements
- **Node.js**: Version 14 or higher.
- **npm**: Node package manager (comes with Node.js).

---

## Installation and Setup

### 1. Clone/download the Repository:
git clone https://github.com/xipiet/voting-app.git

### 3. Allow powershell to execute the script:
Set-ExecutionPolicy RemoteSigned

### 3. Install the requirements:
-Download the LTS-Version from https://nodejs.org/en
-npm install 
-npm install express body-parser
-npm install socket.io

### 4. Navigate to the folder:
cd yourPath/VotingApp

### 5. Start the server:
node server.js

### 6. Host the app:
You have to portforward the port "3000" to give other users access through your router.
Now give them your portforwarded port with the ip. It should look like "<<yourIp>>:3000"
To access the admin panel just add "/admin.html" to the url

