Calendar Booking Backend Service

# Overview

This project is a backend service that allows users to schedule meetings while preventing overlapping time slots.

It was developed as part of the Kraftshala Backend Developer Intern assignment.

The application provides REST APIs to:

* Create and retrieve users
* Create, list, update, and delete meetings
* Enforce a strict rule that no two meetings for the same user can overlap

---

## Tech Stack

* Node.js
* JavaScript
* Express.js
* SQLite 
* Postman used for testing API's 
* Live deployment using render
---

### Architecture Overview

* Routes define the API endpoints
* Controllers manage HTTP requests and responses
* Services contain the business logic
* Models define the database schema using Sequelize

---

# Database Design#

# Users Table

| Column    | Type    | 
| --------- | ------- | 
| id        | INTEGER | 
| name      | STRING  | 
| email     | STRING  | 
| createdAt | DATE    | 
| updatedAt | DATE    

# Meetings Table

| Column    | Type     |
| --------- | -------- | 
| id        | INTEGER  | 
userId    | INTEGER    | 
| title     | STRING   |
| startTime | DATETIME | 
| endTime   | DATETIME |
| createdAt | DATE     |
| updatedAt | DATE     | 

Relationship:

* One user can have multiple meetings
* Each meeting belongs to one user

---

# Business Rule: No Overlapping Meetings

A meeting cannot be created or updated if it overlaps with an existing meeting for the same user.

Conflict condition:

```
existing.startTime < new.endTime
AND
existing.endTime > new.startTime
```

If a conflict is detected:

* HTTP Status: 400 Bad Request
* Message: "Time slot already booked"

This validation applies during:

* Meeting creation
* Meeting updates (excluding the meeting being updated)

---

# API Endpoints

# User APIs

Create User
POST /users

Request Body:

```
{
  "name": "Rohit",
  "email": "rohit@example.com"
}
```

Get User by ID
GET /users/:id

---

# Meeting APIs

Create Meeting
POST /meetings

```
{
  "userId": 1,
  "title": "Interview",
  "startTime": "2026-02-10T10:00:00.000Z",
  "endTime": "2026-02-10T10:30:00.000Z"
}
```

List Meetings
GET /meetings

Get Meeting by ID
GET /meetings/:id

Update Meeting
PUT /meetings/:id

Delete Meeting
DELETE /meetings/:id

---

## Validation Rules

* All required fields must be provided
* startTime must be earlier than endTime
* Clear and meaningful error messages are returned
* Proper HTTP status codes are used

 Status Code  Meaning    ---

 201          Resource created                 
 200          Successful request                
 204          Resource deleted                  
 400          Validation or business rule error 
 404          Resource not found                

---

# API Testing

The APIs can be tested using Postman, VS Code REST Client, or cURL.
An `app.http` file is included for quick testing.

You can verify:

* Successful meeting creation
* Rejection of overlapping meetings
* Proper updates and deletions


# Author

Kavala Satya Niharika
Email: kavalasatyaniharika@gmail.com
LinkedIn: https://www.linkedin.com/in/niharika528
GitHub: https://github.com/satyaniharika1/

