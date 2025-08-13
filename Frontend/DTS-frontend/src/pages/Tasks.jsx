import React, { useEffect, useState } from 'react'
import TaskService from '../services/Tasks.Service';
import TaskTable from '../components/TaskTable';

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {        
        const tasksData = await TaskService.getAll();        
        setTasks(tasksData);

    }

    useEffect(() => {
        getTasks()
    }, [])
  
  
    return (
        <div>
            <TaskTable tasks={tasks} />
        </div>
    );
}
