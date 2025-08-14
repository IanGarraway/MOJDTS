import React, { useEffect, useState } from 'react'
import TaskService from '../services/Tasks.Service';
import TaskTable from '../components/TaskTable';
import Task from './Task';
import { Modal, Button } from 'react-bootstrap';

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);
    const [show, setShow] = useState(false);

    const getTasks = async () => {
        const tasksData = await TaskService.getAll();
        setTasks(tasksData);

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
            <TaskTable tasks={tasks} setTask={setTask} setShow={setShow} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Task task={task} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
