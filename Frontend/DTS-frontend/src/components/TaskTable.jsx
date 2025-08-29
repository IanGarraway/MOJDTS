import { useEffect, useRef } from "react";
import { TaskLine } from "./TaskLine";

/**
 * TaskTable Component
 * 
 * Displays a scrollable list of tasks using TaskLine components.
 * Automatically scrolls to the bottom when a new task is created.
 * 
 * Props:
 * - tasks: Array of task objects to display
 * - setTask: Function to set the selected task for editing
 * - setShow: Function to toggle the task modal visibility
 * - newTaskCreated: Boolean flag to indicate a newly added task
 */
const TaskTable = ({ tasks, setTask, setShow, newTaskCreated }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom whenever tasks change and a new task is created
        if (newTaskCreated) {
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }
    }, [tasks, newTaskCreated]);

    // Display message if no tasks exist
    if (!Array.isArray(tasks) || tasks.length === 0) { return (<h2>No tasks found</h2>); }

    
    return (
        <div className="taskTable" ref={containerRef} >
            {
                tasks.map(task => (
                    <TaskLine
                        key={task._id}
                        task={task}
                        setTask={setTask}
                        setShow={setShow}
                    />
                ))
            }
        </div>
    );
};
export default TaskTable;