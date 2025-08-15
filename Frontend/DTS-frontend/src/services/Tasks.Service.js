
export default class TaskService {

    static patchPayload(originalTask, updatedTask) {
        const fieldsToCheck = ["taskTitle", "taskStatus"];
        const patchData = {};

        fieldsToCheck.forEach(field => {
            if (updatedTask[field] !== originalTask[field]) {                
                patchData[field] = updatedTask[field];
            }
        });

        console.log(patchData);

        return patchData;
    }

}