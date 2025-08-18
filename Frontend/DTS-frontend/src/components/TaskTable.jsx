import { useEffect, useRef } from "react";
import { TaskLine } from "./TaskLine";

const TaskTable = ({ tasks, setTask, setShow }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom whenever tasks change
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [tasks]);

    
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