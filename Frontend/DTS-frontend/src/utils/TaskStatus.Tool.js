export default class TaskStatusTool{

    static StatusToText(statusCode) {
        return {
            1: "Pending",
            2: "In Progress",
            3: "Completed"
        }[statusCode]||"Unknown";
    }

    static StatusToBadgeStyle(statusCode) {
        return {
            1: "warning",
            2: "primary",
            
        }[statusCode];
    }

}