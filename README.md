📒 iNote - MERN Stack Notes Application
iNote is a full-stack web application that lets users securely create, manage, and delete personal notes. Built using the MERN stack (MongoDB, Express, React, Node.js) with JWT-based authentication.

🚀 Features
✅ User Authentication (JWT)
✅ Passwords stored securely with bcrypt hashing
✅ Protected Routes using Middleware
✅ Add, View, Update & Delete Notes
✅ Notes are private to each user
✅ Express Validator for input sanitization
✅ MongoDB for persistent storage

🛠️ Tech Stack
Frontend: React, Bootstrap

Backend: Node.js, Express.js

Database: MongoDB Atlas or Local MongoDB

Authentication: JSON Web Tokens (JWT)

Password Security: bcryptjs

Validation: express-validator

📁 Project Structure
bash
Copy
Edit
/backend
├── index.js              # Server Entry Point
├── db.js                 # MongoDB Connection Logic
├── models/Users.js       # User Schema
├── models/Notes.js       # Notes Schema
├── routes/auth.js        # Authentication Routes
├── routes/notes.js       # Notes Routes
├── middleware/fetchUser.js # JWT Token Middleware

/frontend
├── src
│   ├── App.js            # Main React App
│   ├── components/       # React Components (Navbar, Notes, etc.)
│   ├── context/          # State Management with Context API
🔒 Authentication Flow
Register User:
POST /api/auth/createuser
Returns a JWT on successful registration.

Login User:
POST /api/auth/login
Returns a JWT if credentials are valid.

Protected Routes:
Use auth-token in headers for routes like adding, fetching, updating, or deleting notes.

📌 API Endpoints
Auth Routes
Route	Method	Description	Protected
/api/auth/createuser	POST	Register a new user	❌
/api/auth/login	POST	Login with existing user	❌

Notes Routes
Route	Method	Description	Protected
/api/notes/fetchallnotes	GET	Fetch user's notes	✅
/api/notes/addnote	POST	Add a new note	✅
/api/notes/updatenote/:id	PUT	Update a specific note	✅
/api/notes/deletenote/:id	DELETE	Delete a note	✅

⚙️ Installation & Setup
Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in /backend for environment variables (Optional for now if hardcoded keys used).

Start the server:

bash
Copy
Edit
nodemon index.js
Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
📝 Notes
Passwords are securely hashed using bcryptjs.

Authentication is handled via JWT; token must be sent in headers as auth-token.

Only the owner of a note can modify or delete it.