import React from 'react'
import { FloatingLabel, Form, Card, Badge } from 'react-bootstrap'
import TaskStatusTool from '../utils/TaskStatus.Tool';


export const TaskLine = ({ task }) => {
    const statusText = TaskStatusTool.StatusToText(task.taskStatus);        

    const statusBadgeStyle = {
        1: "warning",
        2: "primary",
        3: "success"
    }[task.taskStatus] || "secondary";

    const dueDate = new Date(task.taskDueDate).toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    
    
    return (
        <div className='taskCard'>
            <Card bg={'light'} border={'dark'} text={'dark'} >
                <Card.Body>
                    <Card.Title>{task.taskTitle}</Card.Title>
                    <Card.Text>{task.taskDescription}</Card.Text>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                        <div>
                        <Badge bg={statusBadgeStyle}>{statusText}</Badge>
                        </div>
                        <div style={{ fontStyle: "italic", color: "#555" }}>
                        Due: {dueDate}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
