import React from 'react'
import { FloatingLabel, Form, Card, Badge } from 'react-bootstrap'
import TaskStatusTool from '../utils/TaskStatus.Tool';


export const TaskLine = ({ task, setTask, setShow }) => {
    const statusText = TaskStatusTool.statusToText(task.taskStatus);
    const statusBadgeStyle = TaskStatusTool.statusToBadgeStyle(task.taskStatus);

    const dueDate = new Date(task.taskDueDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    let dateColour = "#555"

    if (new Date(task.taskDueDate) < new Date()) {
        dateColour = "#a30d0dff";
    }

    const onTaskClick = () => {
        setTask(task);
        setShow(true);
    }

    
    
    return (
        <div className='taskCard'>
            <Card bg={'light'} border={'dark'} text={'dark'} onClick={onTaskClick}>
                <Card.Body>
                    <Card.Title>{task.taskTitle}</Card.Title>
                    <Card.Text>{task.taskDescription}</Card.Text>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                        <div>
                        <Badge bg={statusBadgeStyle}>{statusText}</Badge>
                        </div>
                        <div style={{ fontStyle: "italic", color: dateColour }}>
                        Due: {dueDate}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
