export default class TaskStatusTool{

    static statusToText(statusCode) {
        return {
            1: "Pending",
            2: "In Progress",
            3: "Completed"
        }[statusCode]||"Unknown";
    }

    static statusToBadgeStyle(statusCode) {
        return {
            1: "warning",
            2: "primary",
            3: "success"
            
        }[statusCode]||"secondary";
    }

}