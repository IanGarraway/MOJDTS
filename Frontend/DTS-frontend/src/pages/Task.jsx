import React, {useState} from 'react';
import { Alert, FloatingLabel, Form, Row, Col, Button, FormGroup } from 'react-bootstrap';
import TasksService from '../services/Tasks.Services';
import TaskTools from '../utils/Tasks.Tools';


function tomorrowDate() {
    //in the case of no existing date, generates a date for the next day at 12 
    //as a default due date and time
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);  // move to tomorrow
    tomorrow.setHours(12, 0, 0, 0);            // set time to 12:00:00.000

    return tomorrow.toISOString().slice(0, 16);
}

const Task = ({task, setShow, getTasks}) => {
    const isNewTask = !task;
    
    const initialDueDate = task?.taskDueDate ? task.taskDueDate.slice(0,16) : tomorrowDate(); // "YYYY-MM-DDTHH:mm"
    
    const [deleteEnabled, setDeleteEnabled] = useState(false);
    const [description, setDescription] = useState(task?.taskDescription || '');
    const [dueDate, setDueDate] = useState(initialDueDate);
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState(task?.taskStatus || 1);
    const [title, setTitle] = useState(task?.taskTitle || '');
    
    const validTask = !!(title.trim() && dueDate.trim() && status);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskService = new TasksService();
        let response = "";
        if (isNewTask) {            
            response = await taskService.newTask(TaskTools.newTask(title, description, dueDate, status));                        
        } else {
            const updatedTask = TaskTools.newTask(title, description, dueDate, status);
            const fieldsToUpdate = TaskTools.patchPayload(task, updatedTask); 

            //only updates if there are fields to be updated
            if (Object.keys(fieldsToUpdate).length>0) {
                response = await taskService.updateTask(task._id, fieldsToUpdate);                                
            }; 
        }
        if (response.error) {
            setErrorMessage(response.error);
        } else {
            getTasks(isNewTask);
            setShow(false);
        }
    };
    
    const handleDelete = async (e) => {
        
        e.preventDefault();
        const taskService = new TasksService();
        const response = await taskService.deleteTask(task._id);
        
        if (response.error) {
            setErrorMessage(response.error);
        } else {
            getTasks();
            setShow(false);
        }
    }

    return (
        <div>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="taskTitle"
                            label="Task Title"
                            className="mb-3"
                        >
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>                    
                </Row>
      
                <FloatingLabel controlId="taskDescription" label="Task Description">
                    <Form.Control
                        as="textarea"
                        placeholder="Optional description of the task"
                        style={{ height: '150px' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FloatingLabel>
            
                <Row>
                    <Col>
                        <Form.Group controlId="taskDueDate">
                            <Form.Label>Due Date & Time</Form.Label>
                            <Form.Control type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <FormGroup controlId="taskStatus">
                            <Form.Label>Task Status</Form.Label>
                            <Form.Select
                                aria-label="taskStatus"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="1">Pending</option>
                                <option value="2">In Progress</option>
                                <option value="3">Completed</option>
                            </Form.Select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!validTask}
                        >
                            Save
                        </Button>
                    </Col>
                    <Col className="text-end d-flex align-items-center justify-content-end">
                        <Form.Check
                            type="switch"
                            id="confirm-delete-switch"
                            checked={deleteEnabled}
                            onChange={(e) => setDeleteEnabled(e.target.checked)}
                            hidden={isNewTask}
                        />

                        <Button variant="danger" disabled={!deleteEnabled} hidden={isNewTask} onClick={handleDelete}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Task