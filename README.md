# REST API with Express js and Mongoose

This is a REST API project built with Node.js and Mongoose. The project allows you to create, read, update, and delete data from MongoDB. The project includes five models:
1. Admin registration and login
3. Class categories
4. Classes
5. Participants
6. Participant class access

To run this project, you need to do the following:

1. Install Node.js and MongoDB on your device.
3. Copy or clone the code in this repository.
3. Run the npm install command to install all dependencies.
4. Run the program with the command node index or if you have nodemon nodemon index.
5. The server will run at http://localhost:5000.

You can use Postman to test the API. Here are the available APIs:

## Admin registration and login
        POST /admin/register To register.
        POST /admin/login to login.

## Class categories
        POST /category/add To add class categories.
        GET /category To view all class categories.
        GET /category/{id} To view a single class category.
        PUT /category/{id} To update a class category.
        DELETE /category/{id} To delete a class category.

## Classes
        POST /courses To add classes.
        GET /courses To view all classes.
        GET /courses/{id} To view a single class.
        PUT /courses/{id} To update a class.
        DELETE /courses/{id} To delete a class.

## Participants
        POST /users To add participants.
        GET /users To view all participants.
        GET /users/{id} To view a single participant.
        PUT /users/{id} To update a participant.
        DELETE /users/{id} To delete a participant.

## Participant class access
        POST /usercourse To add participant class access.
        GET /usercourse To view all participant class access.
        GET /usercourse/{id} To view a single participant class access.
        PUT /usercourse/{id} To update a participant class access.
        DELETE /usercourse/{id} To delete a participant class access.

