/**
 * FilterTools
 * contains Filter related helper functions
 */

export default class FilterTools {
    /**
     * filterByStatus
     * Filters tasks by their status
     * @param {Object[]} tasks - Array of task objects
     * @param {Set<number>} activeStatuses - set of status codes to include in the results
     * @returns {Object[]} - Filtered list of tasks whose status in in the activeStatuses set
     */
    static filterByStatus(tasks, activeStatuses) {
        return tasks.filter(task=> activeStatuses.has(task.taskStatus));
    }
}