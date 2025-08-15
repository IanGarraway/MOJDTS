import { TaskLine } from "./TaskLine";


const TaskTable = ({ tasks, setTask, setShow }) => {
    
    if (!Array.isArray(tasks) || tasks.length === 0) { return (<h2>No tasks found</h2>); }

    return (
        <div className="taskTable">
            {
                tasks.map(task => (<TaskLine key={task._id}
                    task={task}
                    setTask={setTask}
                    setShow={setShow}
                />))
            }
        </div>
    );
};
export default TaskTable;