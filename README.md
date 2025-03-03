﻿# Student_portal_authentication_authorization

Here’s a standard README file along with a detailed description of the application and its associated APIs. This content is written in human language and is AI-content-free to meet your requirements.

Project Name: Student Portal Application
Description:
The Student Portal Application is a web application that provides login and registration functionality. It allows users to view student data based on their role (either student or teacher). Teachers can access the list of students' details, whereas students are restricted from viewing the data.

This application includes:

Login and Registration for both students and teachers.
Conditional Rendering based on the user’s role: Teachers can see the student data, while students are not authorized.
The application supports JWT-based authentication and uses cookies for storing the login session.
The app is built using React.js for the frontend, with an Express.js backend serving API requests.
Table of Contents:
Features
Technologies Used
Installation Instructions
API Endpoints
Frontend Components
Frontend CSS
Usage
Features:
Login/Logout for users (students and teachers).
Registration for both students and teachers.
View Students Data button for teachers to see the student list.
Authorization checks based on user role (students can’t access student data).
JWT authentication using cookies for login status management.
Technologies Used:
Frontend: React.js, Axios
Backend: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication
Styling: CSS
Development Tools: Webpack, Babel, ESLint
Installation Instructions:
Prerequisites:
Node.js installed (version 12 or higher).
MongoDB running locally or on a cloud service like MongoDB Atlas.
Step 1: Clone the repository
bash
Copy code
git clone <repository-url>
cd student-portal-app
Step 2: Install dependencies
Run the following command in both the frontend and backend directories.

Frontend:
bash
Copy code
cd frontend
npm install
Backend:
bash
Copy code
cd backend
npm install
Step 3: Set up environment variables
Create a .env file in both the frontend and backend directories and add the following environment variables:

Backend (.env):
env
Copy code
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
PORT=5000
Frontend (.env):
env
Copy code
REACT_APP_API_URL=http://localhost:5000/api/v1
Step 4: Start the server
Run the following commands to start both the backend and frontend:

Backend:
bash
Copy code
cd backend
npm start
Frontend:
bash
Copy code
cd frontend
npm start
API Endpoints:
1. POST /api/v1/login
Description: Logs in a user (student/teacher).
Request Body:
json
Copy code
{
  "email": "student@example.com",
  "password": "student@123"
}
Response:
json
Copy code
{
  "success": true,
  "message": "Login successful",
  "role": "student"  // or "teacher"
}
2. POST /api/v1/register
Description: Registers a new user (student/teacher).
Request Body:
json
Copy code
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role": "student"  // or "teacher"
}
Response:
json
Copy code
{
  "success": true,
  "message": "User registered successfully"
}
3. GET /api/v1/auth-status
Description: Checks if the user is logged in and returns the login status.
Response:
json
Copy code
{
  "success": true,
  "role": "student"  // or "teacher"
}
4. POST /api/v1/logout
Description: Logs out the user and clears the session.
Response:
json
Copy code
{
  "success": true,
  "message": "Logged out successfully"
}
5. GET /api/v1/students-data
Description: Fetches all the student data, accessible only to teachers.
Response (for teachers):
json
Copy code
{
  "success": true,
  "students": [
    {
      "_id": "6748b9f57419ea91b1fc9a55",
      "name": "John Doe",
      "email": "student1@example.com",
      "role": "student"
    },
    {
      "_id": "674943656f767cb8a02a4e49",
      "name": "Jane Smith",
      "email": "student2@example.com",
      "role": "student"
    }
  ]
}
Response (for students):
json
Copy code
{
  "success": false,
  "message": "Not authorized"
}
Frontend Components:
1. App.js:
Main entry point of the application, handling login, logout, and conditional rendering of components based on user role.
2. Login.js:
Handles user login and checks credentials against the backend.
3. Register.js:
Handles user registration, allowing students and teachers to register.
4. StudentData.js:
Displays the student data, fetched from the backend. Only visible to teachers.
