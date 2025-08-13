import { TaskLine } from "./TaskLine";


const TaskTable = ({ tasks }) => {
    
    if (!Array.isArray(tasks) || tasks.length === 0) { return (<h2>Loading data...</h2>); }

    return (
        <div className="taskTable">
            {
                tasks.map(task => (<TaskLine key={task._id}
                    task={task} />))
            }
        </div>
    );
};
export default TaskTable;