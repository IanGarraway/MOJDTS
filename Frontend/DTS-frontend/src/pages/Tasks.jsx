import { useEffect, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap';

import TaskTable from '../components/TaskTable';
import Task from './Task';
import TasksService from '../services/Tasks.Services';

/**
 * Tasks Page Component
 * 
 * Manages the list of tasks and handles creating/updating tasks via a modal.
 * Uses TasksService to fetch tasks from the backend.
 */
export const Tasks = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [show, setShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);
    const [newTaskCreated, setNewTaskCreated] = useState(false);

    /**
     * Fetch tasks from backend
     * @param {boolean} isNew - whether this call follows creation of a new task
     */
    const getTasks = async (isNew = false) => {
        const tasksService = new TasksService()
                  
        const response = await tasksService.getAll();
        if (response.error) {
            setErrorMessage(response.error);           
        }else {
            setTasks(response);
            if(newTaskCreated!=isNew){setNewTaskCreated(isNew)}
        }        
    }

    useEffect(() => {
        getTasks()
    }, [])

    const handleClose = () => setShow(false);
    
    // Open modal for new task
    const newTaskClick = () => {
        setTask(null);
        setShow(true);
    }

    return (
        <div>
            {/* New Task Button & Error Alert */}
            <div className="newTaskButtonWrapper">
                <Button variant="outline-primary" onClick={newTaskClick} >New Task</Button>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </div>
            
            {/* Task Table */}
            <TaskTable tasks={tasks} setTask={setTask} setShow={setShow} newTaskCreated={newTaskCreated} />

            {/* Task Modal for creating/editing tasks */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Task task={task} setShow={setShow} getTasks={getTasks} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
