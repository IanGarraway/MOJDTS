# User Stories

## User story 1 - Create a task

"As a caseworker, I want to be able to create a new task with a title, optional description, status, and due date/time, so that I can keep track of things I need to do."

### Definition of Done

#### backend

- [x] POST /tasks endpoint created
- [x] validation on title (required)
- [x] validation on status (required, number)
- [x] validation on due date/time (required)
- [x] Return 201 Created on successful task creation
- [x] return 400 Bad Request with detailed error messages for invalid input

#### frontend

- [ ] interface screen for creating a task
- [ ] input validation matching backend rules
- [ ] api call to POST /newtask
- [ ] confirmation message on successful task creation
- [ ] user friendly error message if task creation failure

## User story 2 - View All Tasks

"As a caseworker, I want to view a list of all my tasks, so that I can quickly see everything I need to do."

### Definition of Done

#### backend

- [x] GET /getall endpoint created
- [x] Returns array of tasks with id, title, status and due date/time

#### frontend

- [ ] Task list view created
- [ ] API call to GET /getall
- [ ] Display task in a clear readable format
- [ ] Show "No tasks found" if list is empty

## User story 3 - View task details

"As a caseworker, I want to view a specific task by its ID, so that I can check it's details without searching manually"

### Definition of Done

#### backend

- [x] GET /{id} endpoint created
- [x] Returns full task details if task exists
- [x] Returns 404 if id valid but task doesn't exist
- [x] returns 400 if invalid id is sent

#### frontend

- [ ] Task detail view created
- [ ] API call to GET /{id}
- [ ] Show meaningful error message if task not found

## User story 4 - Update Task Status and Details

"As a caseworker, I want to update a task's status, title, description or due date, so that I can keep my task list accurate and up to date.

### Definition of Done

#### backend

- [ ] PATCH /{id} endpoint created
- [ ] validation on title (required)
- [ ] validation on status (required, number)
- [ ] validation on due date/time (required)
- [ ] Returns 200 on successful task update
- [ ] Returns 404 if id valid but task doesn't exist
- [ ] returns 400 if invalid id is sent

#### frontend

- [ ] Task edit form implemented
- [ ] Client-side validation matches backend rules
- [ ] API call to PATCH /{id}
- [ ] Show success message when update complete
- [ ] Show user-friendly error message if validation fails or task not found

## User story 5 - Delete a Task
"As a caseworker, I want to delete a task, so that I can remove tasks which are no longer relevant."

#### Backend

- [ ] DELETE {id} endpoint created
- [ ] Return 204 on successful deletion
- [ ] Return 404 not found if task doesn't exist
- [ ] returns 400 if invalid id is sent

#### Frontend

- [ ] Delete button implemented with confirmation prompt
- [ ] API call to DELETE /{id}
- [ ] Remove deleted task from UI without page refresh
- [ ] Show user friendly error message if deletion fails
