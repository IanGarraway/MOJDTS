# Testing Guide

This project is using a combination of unit and integration tests to ensure functions, components, and pages work as intended. This document is intended to explain the testing setup for both the frontend (React) and backend (Node.js/Express) parts of the project, including how to run tests and check coverage.

## Frontend

### Frontend Tools Used

- Vitest - test runner for React Components.
- React Testing Library - for rendering components and testing user interactions.
- User Event - simulates realistic user interactions.
- jsdom - simulates a browser environment in Node.js.
- coverage-v8 - outputs the coverage report.

### Frontend Testing Strategy

1. Unit Tests
   - Focus on individual components like `TaskLine`, `Task`, `TasksServices` and `TaskTools`.
   - Verify correct rendering, styling and state updates.  
2. Integration Tests
    - Tests Interactions between multiple components.
    - Example: `Tasks` page opens a modal when clicking a task or the "New Task" button, integrating `TaskLine`, `Task`, and `TaskTable`.
3. Mocking
    - API calls to `TasksService` are mocked to isolate component behaviour.
    - Functions like `setShow` and `setTask` are spied on to ensure correct invocations.
4. Services and Utilities were created using Test Driven Development. Components and pages were created using Vite live server to manually test during development. Unit and Integration tests were then created afterwards to automate testing.
  
### Frontend Test File Organisation

all test files are in the `DTS-frontend/test` folder

- unit tests in `test/unit/`
- integration in `test/integration/`
- test data in `test/data/`

### Running Frontend Tests

```bash
from a terminal in the DTS-frontend folder

# Run all frontend tests
npm test

#produce a coverage report
npm run coverage
```

### Writing Frontend Tests

1. use ```render``` from RTL to mount components.
2. Interact with components using ```userEven``` (preferred over fireEvent for realistic actions).
3. Assert on DOM elements using ```screen``` queries.
4. for async behaviour, wrap interactions in ```await waitFor()``` or use ```findBy*``` queries.
5. Use ```vi.fn()``` to mock functions and dependencies.

### Frontend Coverage

73 tests, over 10 test files for 100% coverage of statements

## Backend

### Backend Tools Used

- Mocha - test runner for Node.js
- chai - assertion library(`expect` syntax recommended).
- Supertest - test HTTP endpoints of the server.
- c8 - code coverage reporting.
- MongoDB - Either a test database or mocked model for database independent tests.

### Backend Test File Organisation

all test files are in the `backend/test` folder

- unit tests in `test/unit/`
- integration in `test/integration/`
- test data in `test/data/`

### Backend Testing strategy

1. Created fully using a test driven development approach.
2. Integration Tests (with database)
   - Connect to a test MongoDB instance.
   - Full-stack verification: routes → controller → service → model → database.
   - Examples:
     - POST /tasks creates a task and verifies it exists in the database.
     - GET /tasks/:id retrieves the correct task.
     - PATCH /tasks/:id updates task data.
     - DELETE /tasks/:id removes tasks.
3. Error Handling / Unit Tests (without database)
    - Use a fake Task model to simulate database failures.
    - Ensure controllers and services handle errors gracefully.
    - Examples:
      - All API calls return 500 when DB is unavailable.
      - Missing required fields result in 400 responses.
      - Invalid or non-existent task IDs return 400/404.
4. Test Structure
   - before / after hooks: setup server, service, and database connections.
   - afterEach: clear database collections to maintain isolation.
   - Tests grouped by HTTP method: POST, GET, PATCH, DELETE.

### Running Backend tests

```bash
from a terminal in the backend folder

# Run all frontend tests
npm test

#produce a coverage report
npm run coverage
```

### Writing Backend Tests

1. Use `describe` and `it` blocks to organise tests.
2. Use `before` / `after` hooks: setup server, service and database connections
3. Use `beforeEach` / `afterEach` for setup and tear-down.
4. Mock external dependencies when testing units.
5. Use supertest to test API endpoints

### Backend Coverage

21 tests, over 2 files, 100% coverage of Controllers, Routes, and Services.
