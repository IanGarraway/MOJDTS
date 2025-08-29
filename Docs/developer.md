# Developer Documentation

The Task Manager Webapp follows a MERN architecture (MongoDB, Express.js, React, Node.js), separating responsibilities between the frontend, backend and the database.

## 1. Project Architecture

### Overview

```css
[ React (Frontend)] <-> [Express API (Backend)] <-> [MongoDB Database]
```

the following diagram shows the flow of CRUD requests from the client to the database.

```mermaid
flowchart TD
    A[Client] -->|GET /tasks| B[TasksController]
    A -->|POST /tasks| B
    A -->|PATCH /tasks/:id| B
    A -->|DELETE /tasks/:id| B
    B --> C[TaskService]
    C --> D[TaskModel]
    D --> E[(MongoDB)]
```

The controllers handle HTTP requests, which delegate business logic to services. Models manage persistence in MongoDB. On the frontend, pages provide container views, components handle UI, services call the API, and utils contain shared logic.

#### Frontend (React + Vite)

- Provides the user interface.
- Handles displaying tasks, forms for creating/updating tasks, and state management.
- Communicates with the backend through Axios to perform API requests.

#### Backend (Node.js + Express)

- Exposes a REST API for tasks.
- Contains routing, validation, and error handling.
- Uses Mongoose models to interact with MongoDB.
  
#### Database (MongoDB)

- Stores tasks as documents in a collection.
- Mongoose enforces schema validation (title, description, status, due date).

### Design Considerations

#### Separation of concerns

Business logic is isolated in controllers, database access in models and the UI in react.

#### Scalability

The modular folder structure makes it easy to add new features (for example user accounts).

#### Error Handling

Centralised middleware handles validation and API errors consistently.

#### Test Driven Development

Where possible a test driven approach has been applied to create robust functional code.

#### Naming Conventions

Following standard JavaScript naming convention, camelCase has been used on variables and functions, PascalCase for classes and files.
  
### Folder Structure

#### Backend Folder Structure

Contains the Express server, task logic and Mongoose database models.

``` text
Backend/
├── config/
│   └── Config.js
├── controllers/
│   └── Task.Controller.js
├── db/
│   └── Database.js
├── models/
│   └── Task.model.js
├── routes/
│   └── Task.Routes.js
├── server/
│   └── Server.js
├── services/
│   └── Task.Service.js
├── test/
│   └── integration/
│       └── Task.test.js
├── .env
├── .env.dev
├── .env.test
├── index.js
└── package.json
```

#### Documentation

Markdown documentation, images and supporting files

``` text
Docs/
├── images/
├── api.md
├── developer.md
├── testing.md
└── userStories.md
```

#### Frontend Folder Structure

React + Vite application, with components, pages, Axios services and utility functions

```text
frontend/
└── DTS-frontend
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── TaskLine.jsx
    │   │   └── TaskTable.jsx
    │   ├── pages/
    │   │   ├── Task.jsx
    │   │   └── Tasks.jsx
    │   ├── services/
    │   │   ├── Tasks.API.js
    │   │   └── Tasks.Services.js
    │   ├── utils/
    │   │   ├── Tasks.Tools.js
    │   │   └── TaskStatus.Tool.js
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── test/
    │   ├── data/
    │   │   └── data.json
    │   └── unit/
    │       ├── Tasks.API.test.js
    │       ├── Tasks.Services.test.js
    │       ├── Tasks.Tools.test.js
    │       └── TaskStatus.Tool.test.js
    ├── .env
    ├── .env.development
    ├── .env.test
    ├── index.html
    ├── package.json
    └── vite.config.js
```

### Entry Points

Backend Entry point: backend/index.js  
Frontend Entry point: frontend/DTS-frontend/main.jsx

## 2. Installation

### Requirements

- Ensure MongoDB is installed and running locally (default port 27017).
- a web browser of your choice is available

### Backend installation

from the backend folder:

using a terminal:

- npm install

This project uses three environments: production (.env), development (.env.dev), and test (.env.test). Each must be configured with the correct MongoDB URI and port, this is done through adding 3 files, .env, .env.dev and .env.test to the backend folder

.env:

```dotenv
ALLOWED_ORIGIN=http://localhost:5173
PORT=4001
HOST=127.0.0.1
DB_URI=mongodb://localhost:27017/dtsTask
```

.env.dev:

```dotenv
ALLOWED_ORIGIN=http://localhost:5173
PORT=4000
HOST=127.0.0.1
DB_URI=mongodb://localhost:27017/dtsTask-dev
```

.env.test

```dotenv
ALLOWED_ORIGIN=http://localhost:5173
PORT=3000
HOST=127.0.0.1
DB_URI=mongodb://localhost:27017/dtsTask-tes
```

### Frontend installation

from the frontend/DTS-frontend folder

using a terminal:

- npm install

This project uses three environments: production (.env), development (.env.dev), and test (.env.test). Each must be configured with the correct MongoDB URI and port. this is done by creating 3 files, .env, .env.development and .env.test in the DTS-frontend folder.

these should contain

.env.development:

``` dotenv
VITE_API_URL=http://localhost:4000
```

.env.test:

``` dotenv
VITE_API_URL=http://localhost:3000
```

## 3. Start up instructions

for the developer environment version

### Backend start up

From a terminal in the `./backend/` folder:

``` bash
npm run start
```

### Frontend start up

From a terminal in the `./frontend/DTS-frontend` folder:

``` bash
npm run dev
```

## 4. Technologies used overview

### Backend Technologies

- Express 5.1.0
- Express-validator 7.2.1
- mongoose 8.17.1
- cors 2.8.5
- dotenv 17.2.1
- cross-env 10.0.0

### Frontend Technologies

- Vite 7.1.0
- React 19.1.1
- Bootstrap 5.3.7
- React-bootstrap 2.10.10
- React-dom 19.1.1
- Axios 1.11.0
- dotenv 17.2.1

## 5. Testing

A more detailed explanation can be found in [testing.md](./testing.md).

### Backend Testing

#### Technologies used for the backend testing

The backend tests are implemented using:

- **Mocha** - test runner
- **Chai** - assertion library
- **Supertest** - for HTTP integration testing
- **C8** - code coverage
- **MongoDB** - test database or mocked

These were applied following a Test Driven Development (TDD) approach to ensure the API layer is robust and reliable.

#### Running the backend tests

using a terminal in the `.backend/` folder

##### 1. Run all backend tests:-

```bash
npm test
```

##### 2. Generate a backend coverage report:-

```bash
npm run coverage
```

The coverage report will be output to the `./backend/coverage` folder.

### Frontend Testing

#### Technologies used for the frontend testing

The frontend tests are implemented using:

- **Vitest** - test runner for React Components.
- **React Testing Library** - for rendering components and testing user interactions.
- **User Event** - simulates realistic user interactions.
- **jsdom** - simulates a browser environment in Node.js.
- **coverage-v8** - outputs the coverage report.

These were applied following a Test Driven Development (TDD) approach to ensure the API layer is robust and reliable.

#### Running the frontend tests

In a terminal in the `./frontend/DTS-frontend/` folder

##### 1. Run all frontend tests:-

```bash
npm test
```

##### 2. Generate a frontend coverage report:-

```bash
npm run coverage
```

The coverage report will be output to the `./frontend/DTS-frontend/coverage` folder.
