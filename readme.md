# **Course Selling App Backend**

Welcome to the Course Selling App backend\! This repository contains the complete server-side code for a robust platform that allows administrators to create and manage courses, and users to browse and purchase them. The application is built with Node.js and Express, follows a RESTful API structure, and uses MongoDB for data persistence.

## **Table of Contents**

- [Features](https://www.google.com/search?q=%23features)
- [How It Works](https://www.google.com/search?q=%23how-it-works)
  - [Authentication Flow](https://www.google.com/search?q=%23authentication-flow)
  - [Role-Based Access Control](https://www.google.com/search?q=%23role-based-access-control)
- [Tech Stack & Key Libraries](https://www.google.com/search?q=%23tech-stack--key-libraries)
- [Prerequisites](https://www.google.com/search?q=%23prerequisites)
- [Setup and Installation](https://www.google.com/search?q=%23setup-and-installation)
- [API Endpoint Details](https://www.google.com/search?q=%23api-endpoint-details)
  - [Admin Routes](https://www.google.com/search?q=%23admin-routes)
  - [User Routes](https://www.google.com/search?q=%23user-routes)
  - [Course Routes](https://www.google.com/search?q=%23course-routes)
- [Database Schema](https://www.google.com/search?q=%23database-schema)
- [Project Structure](https://www.google.com/search?q=%23project-structure)
- [Environment Variables](https://www.google.com/search?q=%23environment-variables)

## **Features**

- **Dual User Roles**: The application distinguishes between regular users and admins, providing different functionalities for each.
- **Secure Authentication**: User and admin authentication is handled using JSON Web Tokens (JWTs), which are securely stored in httpOnly cookies.
- **Password Hashing**: Passwords are never stored in plaintext. They are salted and hashed using bcrypt for maximum security.
- **Input Validation**: Incoming request bodies for signup and signin are validated using Zod to ensure data integrity and prevent common vulnerabilities.
- **RESTful API**: A well-structured set of API endpoints for managing users, courses, and purchases.
- **Protected Routes**: Critical routes, such as creating courses or purchasing them, are protected by middleware that verifies the user's authentication status and role.

## **How It Works**

This application is designed around a modular and scalable architecture, separating concerns into routers, controllers, and database models.

### **Authentication Flow**

1. A user or admin signs up or signs in.
2. The server validates the input data using Zod.
3. Upon successful signin, the server generates a JWT containing the user's ID, first name, and email.
4. This JWT is then set as an httpOnly cookie in the response. This is a secure method as it prevents client-side JavaScript from accessing the token, mitigating XSS attacks.
5. For subsequent requests to protected routes, the server's authentication middleware automatically reads and verifies the JWT from the cookie.

### **Role-Based Access Control**

- The user and admin signin/signup routes, although sharing the same controller logic, are differentiated by a setUserType middleware. This middleware sets a userType property on the request object, which is then used to tag the user's role in the database.
- Admin-specific routes (like creating or updating courses) are protected by a dedicated auth middleware in adminRouter.js. This middleware not only verifies the JWT but also checks if the user's type is 'admin' in the database.

## **Tech Stack & Key Libraries**

- [**Node.js**](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [**Express.js**](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
- [**MongoDB**](https://www.mongodb.com/): A NoSQL database for storing application data.
- [**Mongoose**](https://mongoosejs.com/): An elegant MongoDB object modeling tool for Node.js.
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken): For generating and verifying JSON Web Tokens for authentication.
- [**bcrypt**](https://www.npmjs.com/package/bcrypt): A library for hashing passwords before storing them in the database.
- [**Zod**](https://zod.dev/): A TypeScript-first schema declaration and validation library, used here for validating API request bodies.
- [**cookie-parser**](https://www.npmjs.com/package/cookie-parser): Middleware to parse Cookie header and populate req.cookies with an object keyed by the cookie names.
- [**dotenv**](https://www.npmjs.com/package/dotenv): A zero-dependency module that loads environment variables from a .env file into process.env.
- [**Nodemon**](https://nodemon.io/): A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## **Prerequisites**

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- MongoDB (either a local instance or a cloud-hosted solution like MongoDB Atlas)

## **Setup and Installation**

1. **Clone the repository:**  
   Bash  
   git clone https://github.com/lakshya5025/courseselling\_app.git

2. **Navigate to the project directory:**  
   Bash  
   cd courseselling_app

3. **Install dependencies:**  
   Bash  
   npm install

4. **Create a .env file** in the root of the project. See the [Environment Variables](https://www.google.com/search?q=%23environment-variables) section for details on what to include.
5. **Start the server:**

   - For production:  
     Bash  
     npm start

   - For development (with automatic restarts):  
     Bash  
     npm run dev

The server will be running on http://localhost:3000 (or the port you specified).

## **API Endpoint Details**

### **Admin Routes**

- POST /admin/signup
  - **Description**: Registers a new administrator.
  - **Body**: { "email": "admin@example.com", "password": "password123", "firstName": "Admin", "lastName": "User" }
- POST /admin/signin
  - **Description**: Logs in an administrator and returns an auth cookie.
  - **Body**: { "email": "admin@example.com", "password": "password123" }
- POST /admin/courses
  - **Description**: Creates a new course. Requires admin authentication.
  - **Body**: { "title": "New Course", "description": "A great course", "price": 100, "imageUrl": "http://example.com/image.jpg" }
- PUT /admin/courses/update/:id
  - **Description**: Updates an existing course. Requires admin authentication.
  - **Params**: id \- The ID of the course to update.
  - **Body**: { "title": "Updated Course Title", "price": 150 }

### **User Routes**

- POST /user/signup
  - **Description**: Registers a new user.
  - **Body**: { "email": "user@example.com", "password": "password123", "firstName": "John", "lastName": "Doe" }
- POST /user/signin
  - **Description**: Logs in a user and returns an auth cookie.
  - **Body**: { "email": "user@example.com", "password": "password123" }

### **Course Routes**

- GET /courses
  - **Description**: Retrieves a list of all available courses.
- GET /courses/:id
  - **Description**: Retrieves detailed information for a specific course.
  - **Params**: id \- The ID of the course.
- POST /courses/:id/purchase
  - **Description**: Purchases a course. Requires user authentication.
  - **Params**: id \- The ID of the course to purchase.

## **Database Schema**

The application uses MongoDB with the following Mongoose schemas defined in db.js:

- **User (users collection):**
  - email (String, unique)
  - password (String)
  - firstName (String)
  - lastName (String)
  - type (String) \- Can be 'user' or 'admin'.
- **Course (courses collection):**
  - title (String)
  - imageUrl (String)
  - createrId (ObjectId, ref: 'users')
  - price (Number)
  - description (String)
- **Purchase (purchases collection):**
  - userId (ObjectId, ref: 'users')
  - courseId (ObjectId, ref: 'courses')

## **Project Structure**

.  
├── .gitignore  
├── controllers  
│ └── signController.js \# Logic for signup and signin  
├── db.js \# MongoDB connection and Mongoose schemas  
├── index.js \# Main server entry point  
├── package-lock.json  
├── package.json  
├── readme.md  
└── routers  
 ├── adminRouter.js \# Routes for admin-specific actions  
 ├── courseRouter.js \# Routes for course browsing and purchasing  
 └── userRouter.js \# Routes for user authentication

## **Environment Variables**

Create a .env file in the root of your project with the following variables:

\# The connection string for your MongoDB database  
MONGO_URL=\<YOUR_MONGODB_CONNECTION_STRING\>

\# The port you want the server to run on  
PORT=3000

\# A secret key for signing JSON Web Tokens  
JWT_SECRET=\<YOUR_JWT_SECRET\>
