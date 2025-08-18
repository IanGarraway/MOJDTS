import { useEffect, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap';

import TaskTable from '../components/TaskTable';
import Task from './Task';
import TasksService from '../services/Tasks.Services';

export const Tasks = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [show, setShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);

    const getTasks = async () => {
        const tasksService = new TasksService()
                  
        const response = await tasksService.getAll();
        if (response.error) {
            setErrorMessage(response.error);           
        }else {
            setTasks(response);
        }        
    }

    useEffect(() => {
        getTasks()
    }, [])

    const handleClose = () => setShow(false);
    const newTaskClick = () => {
        setTask(null);
        setShow(true);
    }

    return (
        <div>
            <div className="newTaskButtonWrapper">
                <Button variant="outline-primary" onClick={newTaskClick} >New Task</Button>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </div>
            <TaskTable tasks={tasks} setTask={setTask} setShow={setShow} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Task task={task} setShow={setShow} getTasks={getTasks} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
