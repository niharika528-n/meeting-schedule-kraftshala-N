# 📅 Calendar Booking Backend Service

## 📌 Overview

This project is a backend service that allows users to schedule meetings while **preventing overlapping time slots**.  
It was built as part of the **Kraftshala – Backend Developer Intern assignment**.

The application provides REST APIs to:
- Create and fetch users
- Create, list, update, and delete meetings
- Enforce a strict business rule where **no two meetings for the same user can overlap**

---

## 🛠️ Tech Stack

- Node.js
- JavaScript
- Express.js
- Sequelize ORM
- SQLite (used for local development and demo)

---

## 🗂️ Project Structure

```
Meeting_Scheduler_kraftshala/
├─ modules/
│ ├─ user/
│ │ ├─ model.js
│ │ ├─ service.js
│ │ ├─ interface.js
│ │ ├─ routes.js
│ │ └─ dto.js
│ └─ meeting/
│ ├─ model.js
│ ├─ service.js
│ ├─ interface.js
│ ├─ routes.js
│ └─ dto.js
├─ middlewares/
│ └─ errorHandler.js
├─ config/
│ └─ database.js
├─ app.js
└─ server.js

```

---

### Architecture Flow

- **Routes** define API endpoints
- **Controllers** handle HTTP requests and responses
- **Services** contain business logic
- **Models** define database structure using Sequelize

---

## 🧱 Database Design

### Users Table

| Column | Type | Description |
|------|------|------------|
| id | INTEGER | Primary Key |
| name | STRING | Required |
| email | STRING | Required, Unique |
| createdAt | DATE | Auto-generated |
| updatedAt | DATE | Auto-generated |

---

### Meetings Table

| Column | Type | Description |
|------|------|------------|
| id | INTEGER | Primary Key |
| userId | INTEGER | Foreign Key → Users |
| title | STRING | Required |
| startTime | DATETIME | Required |
| endTime | DATETIME | Required |
| createdAt | DATE | Auto-generated |
| updatedAt | DATE | Auto-generated |

**Relationship**
- One user can have multiple meetings
- A meeting belongs to one user

---

## 🚦 Business Rule: No Overlapping Meetings

A meeting **cannot be created or updated** if it overlaps with an existing meeting for the same user.

### Conflict Condition

A conflict exists if:

existing.startTime < new.endTime
AND
existing.endTime > new.startTime


If a conflict is detected:
- HTTP Status: **400 Bad Request**
- Message: **"Time slot already booked"**

This validation is applied during:
- Meeting creation
- Meeting update (excluding the current meeting)

---

## 📡 API Endpoints

### User APIs

#### Create User

``` bash
POST /users
```

**Request Body**
```json
{
  "name": "Rohit",
  "email": "rohit@example.com"
}
```

---

### Get User by ID

```bash
GET /users/:id
```

---

### 📅 Meeting APIs

### Create Meeting

```bash
POST /meetings
```
```json
{
  "userId": 1,
  "title": "Interview",
  "startTime": "2026-02-10T10:00:00.000Z",
  "endTime": "2026-02-10T10:30:00.000Z"
}
```

---

### List Meetings

```bash
GET /meetings
```

---

### Get Meeting by ID

```bash
GET /meetings/:id
```
---

### Update Meeting
```bash
PUT /meetings/:id
```
---

### Delete Meeting
```bash
DELETE /meetings/:id
```
---

## ✅ Validation Rules

- All required fields must be provided
- `startTime` must be before `endTime`
- Meaningful error messages are returned
- Proper HTTP status codes are used:

| Status Code | Meaning |
|------------|---------|
| 201 | Resource created |
| 200 | Successful request |
| 204 | Resource deleted |
| 400 | Validation or business rule error |
| 404 | Resource not found |

---

## 🧪 API Testing

- APIs can be tested using **Postman**, **VS Code REST Client**, or **cURL**
- An `app.http` file is included for quick testing

**Demonstrates:**
- Successful meeting creation
- Rejection of overlapping meetings
- Valid meeting updates and deletions

---

## 👨‍💻 Author

**Rohit Raparthi**  
📧 [rohit.raparthi2003@gmail.com](mailto:rohit.raparthi2003@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/rohit-raparthi/) / [GitHub](https://github.com/RohitRaparthi/)
