import { Card, Badge } from 'react-bootstrap';
import TaskStatusTool from '../utils/TaskStatus.Tool';

/**
 * TaskLine Component
 * 
 * Represents a single task as a clickable card.
 * Displays task title, description, status badge, and due date.
 * Highlights past-due tasks in red.
 * 
 * Props:
 * - task: Task object containing title, description, status and due date
 * - setTask: Function to set the currently selected task
 * - setShow: Function to show the task modal
 */
export const TaskLine = ({ task, setTask, setShow }) => {
    const statusText = TaskStatusTool.statusToText(task.taskStatus);
    const statusBadgeStyle = TaskStatusTool.statusToBadgeStyle(task.taskStatus);

    // Format due date for GB display
    const dueDate = new Date(task.taskDueDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    //default date colour
    let dateColour = "#555"

    //highLight overdue tasks in red if task is not complete
    if (new Date(task.taskDueDate) < new Date()&&task.taskStatus !=3) {
        dateColour = "#a30d0dff";
    }

    const onTaskClick = () => {
        setTask(task);
        setShow(true);
    }

    
    
    return (
        <div className='taskCard' data-testid="task-card">
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
