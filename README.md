# RESTful API Documentation

## Overview
This REST API serves as a backend for a course management system. It facilitates user management, course creation, category handling, and user-course association.

## Architecture
The API is built using Node.js and Express.js. It leverages MongoDB as the database and employs Mongoose as the ODM. Passport.js is used for authentication via JWT tokens.

## Endpoints and Routes

#### User Routes
- `POST /users` - Create a new user.
- `GET /users` - Retrieve all users.
- `GET /users/:id` - Retrieve a user by ID.
- `PUT /users/:id` - Update a user by ID.
- `DELETE /users/:id` - Delete a user by ID.

#### Admin Routes
- `POST /admin/register` - Register a new admin.
- `POST /admin/login` - Log in as an admin.

#### Course Routes
- `POST /courses` - Create a new course.
- `GET /courses` - Retrieve all courses.
- `GET /courses/:id` - Retrieve a course by ID.
- `PUT /courses/:id` - Update a course by ID.
- `DELETE /courses/:id` - Delete a course by ID.

#### Course Category Routes
- `GET /category` - Retrieve all course categories.
- `GET /category/:id` - Retrieve a course category by ID.
- `POST /category/add` - Add a new course category.
- `PUT /category/:id` - Update a course category by ID.
- `DELETE /category/:id` - Delete a course category by ID.

#### User-Course Routes
- `POST /usercourse` - Create a new user-course association.
- `GET /usercourse` - Retrieve all user-course associations.
- `GET /usercourse/:userCourseId` - Retrieve a user-course association by ID.
- `PUT /usercourse/:userCourseId` - Update a user-course association by ID.
- `DELETE /usercourse/:userCourseId` - Delete a user-course association by ID.

## Data Models
- **User:** Contains fields for name, email, and password.
- **Admin:** Similar to User model with admin-specific functionalities.
- **Class:** Represents a course with a title and a reference to ClassCategory.
- **ClassCategory:** Describes the categories for different courses.
- **UserCourse:** Maintains associations between users and courses.

## Usage/Examples
Below are sample API usage scenarios in JavaScript (Node.js) utilizing the routes via HTTP requests.

```javascript
// Sample HTTP requests using libraries like Axios or Node's built-in HTTP/HTTPS

// Create a user
axios.post('/users', { name: 'John Doe', email: 'john@example.com', password: 'password' })
  .then(response => {
    console.log('New user created:', response.data.savedUser);
  })
  .catch(error => {
    console.error('Error creating user:', error);
  });

// Retrieve all courses
axios.get('/courses')
  .then(response => {
    console.log('All courses:', response.data.classes);
  })
  .catch(error => {
    console.error('Error retrieving courses:', error);
  });

// Update a course
axios.put('/courses/:id', { title: 'Updated Title' })
  .then(response => {
    console.log('Course updated:', response.data.classUpdate);
  })
  .catch(error => {
    console.error('Error updating course:', error);
  });

// Delete a user-course association
axios.delete('/usercourse/:userCourseId')
  .then(response => {
    console.log('User-course association deleted:', response.data.result);
  })
  .catch(error => {
    console.error('Error deleting user-course association:', error);
  });


```
## How to Use
To use this API, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and update the connection string in `config/keys.js`.
4. Start the server using `npm start`.

