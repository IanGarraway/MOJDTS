
export default class TaskTools {

    static patchPayload(originalTask, updatedTask) {
        const fieldsToCheck = ["taskTitle", "taskDescription", "taskDueDate", "taskStatus"];
        const patchData = {};

        fieldsToCheck.forEach(field => {
            if (updatedTask[field] !== originalTask[field]) {                
                patchData[field] = updatedTask[field];
            }
        });

        console.log(patchData);

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