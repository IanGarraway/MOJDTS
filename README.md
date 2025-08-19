# DTS Developer Technical Test - Task Manager App

A simple responsive task management webapp built using the MERN (MongoDB, Express, React, Node.JS) tech stack. Users can create, update and delete tasks with due dates and statuses.



## Features

- Create new tasks
- Edit and update existing tasks
- Delete tasks, with a confirmation
- Task status with colour coded badges
- Past-due highlighting

## Tech Stack

### Frontend technology

**Frontend:** React (Vite), React-Bootstrap, Axios  
**Backend:** Node.js, Express, Mongoose, MongoDB  

## User stories

The application was designed and implemented based on a set of user stories.  
See [docs/userStories.md](./Docs/userStories.md)

## Getting Started

### Installation

#### Requirements

- Ensure MongoDB is installed and running locally (default port 27017).
- a web browser of your choice is available

#### Backend

from the backend folder:

using a terminal:

- npm install

This project uses three environments: production (.env), development (.env.dev), and test (.env.test). Each must be configured with the correct MongoDB URI and port, this is done through adding 3 files, .env, .env.dev and .env.test to the backend folder

.env:

```env
ALLOWED_ORIGIN=http://localhost:5173
PORT=4001
HOST=127.0.0.1
DB_URI=mongodb://localhost:27017/dtsTask
```

.env.dev:

```.dev
ALLOWED_ORIGIN=http://localhost:5173
PORT=4000
HOST=127.0.0.1
DB_URI=mongodb://localhost:27017/dtsTask-dev
```

.env.test
```.test
ALLOWED_ORIGIN=http://localhost:5173
PORT=3000
HOST=127.0.0.1
DB_URI=mongodb://localhost:27017/dtsTask-tes
```

#### Frontend

from the frontend/DTS-frontend folder

using a terminal:

- npm install

This project uses three environments: production (.env), development (.env.dev), and test (.env.test). Each must be configured with the correct MongoDB URI and port. this is done by creating 3 files, .env, .env.development and .env.test in the DTS-frontend folder.

these should contain

.env.development:

``` .development
VITE_API_URL=http://localhost:4000
```

.env.test:

``` .test
VITE_API_URL=http://localhost:3000
```

### Running

From a terminal in the backend folder:

- npm start

From a terminal in the DTS-frontend folder:

- npm run dev

The app should now be accessible using a browser at address http://localhost:5173/

## Developer Documentation

See [docs/developer.md](./Docs/developer.md)

## API Documentation

See [docs/api.md](./Docs/api.md)

## Testing

See [docs/testing.md](./Docs/testing.md)

