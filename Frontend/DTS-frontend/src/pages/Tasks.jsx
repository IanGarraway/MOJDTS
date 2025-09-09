import { useEffect, useState } from 'react'
import { Alert, Col, Button, Modal, Offcanvas, Row } from 'react-bootstrap';

import TaskTable from '../components/TaskTable';
import Task from './Task';
import TasksFilterPanel from '../components/TasksFilterPanel';
import TasksService from '../services/Tasks.Services';
import FilterTools from '../utils/Filter.Tools';

/**
 * Tasks Page Component
 * 
 * Manages the list of tasks and handles creating/updating tasks via a modal.
 * Uses TasksService to fetch tasks from the backend.
 */
export const Tasks = () => {
    const [activeStatuses, setActiveStatuses] = useState(new Set([1,2,3]))
    const [errorMessage, setErrorMessage] = useState("");
    const [newTaskCreated, setNewTaskCreated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);    
    const [visibleTasks, setVisibleTasks] = useState([]);

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

    //Updates the visible list of tasks if the active statuses or the tasks are changed
    useEffect(() => {
        const filteredTasks = FilterTools.filterByStatus(tasks, activeStatuses);
        setVisibleTasks(filteredTasks);
    }, [tasks, activeStatuses]);

    const handleClose = () => setShowModal(false);
    const handleCloseOffCanvas = () => setShowOffCanvas(false);
    const handleShowOffCanvas = () => setShowOffCanvas(true);
    
    // Open modal for new task
    const newTaskClick = () => {
        setTask(null);
        setShowModal(true);
    }

    return (
        <div>
            {/* New Task Button, Filters button & Error Alert */}
            <div className="newTaskButtonWrapper">
                <Row>
                    <Col >
                        <Button variant="outline-primary" onClick={newTaskClick} >New Task</Button>
                    </Col>                                     
                    <Col className="d-flex justify-content-end">
                        <Button variant="outline-primary" onClick={handleShowOffCanvas} className="me-2">
                            Filters
                        </Button>
                        <Offcanvas show={showOffCanvas}
                            onHide={handleCloseOffCanvas}
                            placement='end'
                            scroll={true}
                            backdrop={false}
                            className="w-25"
                            
                        >
                            <Offcanvas.Header closeButton>                               
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <TasksFilterPanel activeStatuses={activeStatuses} setActiveStatuses={setActiveStatuses} />
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Col>
                </Row>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </div>
            
            {/* Task Table */}
            <TaskTable tasks={visibleTasks} setTask={setTask} setShowModal={setShowModal} newTaskCreated={newTaskCreated} />

            {/* Task Modal for creating/editing tasks */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Task task={task} setShowModal={setShowModal} getTasks={getTasks} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
