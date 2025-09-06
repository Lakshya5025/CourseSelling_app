

# **Course Selling App**

This is a backend application for a course-selling platform, built with Node.js and Express. It provides APIs for managing users, courses, and purchases.

## **Features**

* **User Management:**  
  * User signup and signin.  
* **Admin Features:**  
  * Admin signup and signin.  
  * Upload new courses.  
  * Update existing course details.  
* **Course Management:**  
  * Fetch a list of all available courses.  
  * Get detailed information about a specific course.

## **Technologies Used**

* [Express.js](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.  
* [Mongoose](https://mongoosejs.com/): An elegant MongoDB object modeling tool for Node.js.  
* [bcrypt](https://www.npmjs.com/package/bcrypt): A library for hashing passwords.  
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): An implementation of JSON Web Tokens.  
* [Zod](https://zod.dev/): A TypeScript-first schema declaration and validation library.  
* [dotenv](https://www.npmjs.com/package/dotenv): A zero-dependency module that loads environment variables from a .env file into process.env.  
* [Nodemon](https://nodemon.io/): A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## **Setup and Installation**

1. **Clone the repository:**  
   Bash  
   git clone https://github.com/lakshya5025/courseselling\_app.git

2. **Navigate to the project directory:**  
   Bash  
   cd courseselling\_app

3. **Install dependencies:**  
   Bash  
   npm install

4. **Create a .env file** in the root of the project and add the following environment variables:  
   MONGO\_URL=\<YOUR\_MONGODB\_CONNECTION\_STRING\>  
   PORT=3000

5. **Start the server:**  
   Bash  
   npm start

   The server will be running on http://localhost:3000.

## **API Endpoints**

### **Admin Routes**

* POST /admin/signup: Admin registration.  
* POST /admin/signin: Admin login.  
* POST /admin/courses: Upload a new course.  
* PUT /admin/courses/:id: Update a course.

### **User Routes**

* POST /user/signup: User registration.  
* POST /user/signin: User login.

### **Course Routes**

* GET /courses: Get all courses.  
* GET /courses/:id: Get a specific course by its ID.

## **Database Schema**

The application uses MongoDB for its database, with the following schemas:

* **User:**  
  * email (String, unique)  
  * password (String)  
  * firstName (String)  
  * lastName (String)  
  * type (String) \- 'user' or 'admin'  
* **Course:**  
  * title (String)  
  * imageUrl (String)  
  * createrId (ObjectId)  
  * price (Number)  
  * description (String)  
* **Purchase:**  
  * userId (ObjectId)  
  * courseId (ObjectId)