# API Reference - Task Manager WebApp

## Base URL

```http
http://localhost:4000
```

## Endpoints

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| GET    | /tasks      | Get all tasks       |
| GET    | /tasks/\:id | Get a task by ID    |
| POST   | /tasks      | Create a new task   |
| PATCH  | /tasks/\:id | Update a task       |
| DELETE | /tasks/\:id | Delete a task by ID |

---

### 1. Get All Tasks

**GET** /tasks

Returns a list of all tasks

**Response** - 200 OK

``` json
[
  {
    "_id": "689c7ba78b0e0c4fe62e2ff8",
    "taskTitle": "Finish documentation",
    "taskDescription": "Write the API reference",
    "taskStatus": 2,
    "taskDueDate": "2025-08-20T12:00:00.000Z"
  }
]
```

---

### 2. Get a task by ID

**GET** /tasks/:id

Returns a single task by its ID.

**Response** - 200 OK

```json
{
    "_id": "689c7ba78b0e0c4fe62e2ff8",
    "taskTitle": "Finish documentation",
    "taskDescription": "Write the API reference",
    "taskStatus": 2,
    "taskDueDate": "2025-08-20T12:00:00.000Z"
}
```

**Response** - 404 Not found

``` json
{
    "error": "Task not found"
}
```

---

### 3. Create a New Task

**POST** /tasks

Creates a new task.

#### Request Body

```json
{
    "taskTitle": "New Task",
    "taskDescription": "Optional description",
    "taskStatus": 1,
    "taskDueDate": "2025-08-22T12:00:00.000Z"
}
```

**Response** - 201 Created

```json
{
    "_id": "689c7ba78b0e0c4fe62e2ffa",
    "taskTitle": "New Task",
    "taskDescription": "Optional description",
    "taskStatus": 1,
    "taskDueDate": "2025-08-22T12:00:00.000Z"
}

```

**Response** - 400 Bad request

```json
{
    "message": "Task validation failed"
}
```

---

### 4. Update a Task

**PATCH** /tasks/:id

Updates one or more fields of an existing task.

#### Request Body (only the fields to be updated)

```json
{
    "taskDescription": "Updated description",
    "taskStatus": 3,
}
```

**Response** - 200 OK

```json
{
    "_id": "689c7ba78b0e0c4fe62e2ff8",
    "taskTitle": "Finish documentation",
    "taskDescription": "Updated description",
    "taskStatus": 3,
    "taskDueDate": "2025-08-20T12:00:00.000Z"
}
```

**Response** - 400 Bad request

```json
{
    "message": "Invalid task ID format"
}
```

**Response** - 404 Not found

``` json
{
    "error": "Task not found"
}
```

---

### 5. Delete a Task

**DELETE** /tasks/:id

Deletes a task by ID.

**Response** - 204 No Content - success (no body)

**Response** - 400 Bad request

```json
{
    "message": "Invalid task ID format"
}
```

**Response** - 404 Not found

``` json
{
    "error": "Task not found"
}
```

---

### Common status codes

- 200 OK – Successful request

- 201 Created – Resource created successfully

- 400 Bad Request – Validation or malformed data error

- 404 Not Found – Task does not exist

- 500 Internal Server Error – Server error
  