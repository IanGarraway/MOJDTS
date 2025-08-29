/**
 * TaskTools
 * Contains helper functions for creating and preparing task objects for API calls.
 */
export default class TaskTools {

    /**
     * patchPayLoad
     * Compares an original task with an updates task and returns only the changed
     * fields suitable for a PATCH request.
     * @param {Object} originalTask - the original task object
     * @param {Object} updatedTask  - a task object generated from the user interface
     * @returns {Object} - object consisting of only the changed fields 
     */
    static patchPayload(originalTask, updatedTask) {
        // Truncate taskDueDate to the first 16 characters (YYYY-MM-DDTHH:mm)
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

    /**
     * newTask
     * Creates a new task object with the required properties
     * 
     * @param {string} taskTitle - The title of the task
     * @param {string} taskDescription - Optional description of the task
     * @param {string} taskDueDate - Due date of the task (ISO string)
     * @param {number} taskStatus - Status of the task (numeric of enum)
     * @returns {Object} - Task object read for sending to the API
     */
    static newTask(taskTitle, taskDescription, taskDueDate, taskStatus) {
        return {
            "taskTitle": taskTitle,
            "taskDescription": taskDescription,
            "taskDueDate": taskDueDate,
            "taskStatus": taskStatus
        }
        
    }

}