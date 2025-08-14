export default class TaskStatusTool{

    static StatusText(statusCode) {
        return {
        1: "Pending",
        2: "In Progress"        
    }[statusCode];
    }

}