import React, {useState} from 'react';
import { FloatingLabel, Form, Row, Col, CloseButton, Button, FormGroup } from 'react-bootstrap';

const Task = ({task}) => {
    const [deleteEnabled, setDeleteEnabled] = useState(false);
    const isNewTask = !task;

    const initialDueDate = task?.taskDueDate ? task.taskDueDate.slice(0,16) : ''; // "YYYY-MM-DDTHH:mm"

    const [title, setTitle] = useState(task?.taskTitle || '');
    const [description, setDescription] = useState(task?.taskDescription || '');
    const [dueDate, setDueDate] = useState(initialDueDate);
    const [status, setStatus] = useState(task?.taskStatus || 1);    

    const handleSubmit = (e) => {
        e.preventDefault();
        // use the state variables to save or update
        console.log({ title, description, dueDate, status });
    };

    return (
        <div>
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

                        <Button variant="danger" disabled={!deleteEnabled} hidden={isNewTask}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Task