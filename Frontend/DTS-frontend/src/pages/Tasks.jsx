import React, { useEffect, useState } from 'react'

import TasksAPI from '../services/Tasks.API';
import TaskTable from '../components/TaskTable';
import Task from './Task';
import { Modal, Button, Alert } from 'react-bootstrap';
import TasksService from '../services/Tasks.Services';

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);
    const [show, setShow] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const getTasks = async () => {
        const tasksService = new TasksService()

        let response;
        try {            
            response = await tasksService.getAll();            
            if (response.error) {
                setErrorMessage(response.error);                
            }else {
                setTasks(response);
            }
        } catch (e) {
            
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
            <Button variant="outline-primary" onClick={newTaskClick} >New Task</Button>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
