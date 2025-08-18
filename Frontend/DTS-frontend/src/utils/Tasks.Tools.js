
export default class TaskTools {

    static patchPayload(originalTask, updatedTask) {
        originalTask.taskDueDate = originalTask.taskDueDate.slice(0, 16);
        updatedTask.taskDueDate = updatedTask.taskDueDate.slice(0, 16)
        
        const fieldsToCheck = ["taskTitle", "taskDescription", "taskDueDate", "taskStatus"];
        const patchData = {};

        fieldsToCheck.forEach(field => {
            if (updatedTask[field] !== originalTask[field]) {                
                patchData[field] = updatedTask[field];
            }
        });        

        return patchData;
    }

    static newTask(taskTitle, taskDescription, taskDueDate, taskStatus) {
        return {
            "taskTitle": taskTitle,
            "taskDescription": taskDescription,
            "taskDueDate": taskDueDate,
            "taskStatus": taskStatus
        }
        
    }

}