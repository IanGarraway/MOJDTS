/**
 * TaskStatusTool
 * Provides helper functions for working with task statuses,
 * including conversion to human-readable labels and colour coding.
 */
export default class TaskStatusTool{

    /**
     * statusToText
     * Converts a numeric status code into a human-readable label
     * @param {number} statusCode - The numeric status of a task
     * @returns {string} - the textural representation of the the status
     */
    static statusToText(statusCode) {
        return {
            1: "Pending",
            2: "In Progress",
            3: "Completed"
        }[statusCode]||"Unknown";
    }

    /**
     * statusToBadgeStyle
     * Maps a numeric status code to a Bootstrap badge style.
     *
     * @param {number} statusCode - The numeric status of a task
     * @returns {string} - Bootstrap badge class (warning, primary, success, secondary)
     */
    static statusToBadgeStyle(statusCode) {
        return {
            1: "warning",
            2: "primary",
            3: "success"
            
        }[statusCode]||"secondary";
    }
}