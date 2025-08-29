import TasksAPI from "./Tasks.API"

/**
 * TasksService
 * Provides methods to interact with the Tasks API.
 * Handles fetching, creating, updating, and deleting tasks.
 */
export default class TasksService{

    #API

    /**
     * Constructor
     * @param {object} api - The API module to use for requests
     */
    constructor(api = TasksAPI) {
        this.#API = api;
    }

    /**
     * getAll
     * Fetches all tasks from the server.
     * @returns {Promise<Object[]|Object>} Array of tasks or error object
     */
    async getAll() {
        try {
            const response = await this.#API.getAll()

            if (response.status === 200) {
                return response.data;
            }
            return { error: `Unable to fetch tasks. Please try again later. ${response.message}` };
        } catch (e) {            
            return { error: `Unable to connect to server. Please try again.` };
        }        
    }

    /**
     * newTask
     * Creates a new task on the server.
     * @param {Object} payload - The task data
     * @returns {Promise<Object>} Response from the server or error object
     */
    async newTask(payload) {
        try {
            const response = await this.#API.newTask(payload);

            if (response.status === 201) {
                return response;
            } else {
            
                return { error: `Unable to create task. Status: ${response.status} - ${response.message}` }
            }
        } catch (e) {
            return {error: 'Unable to connect to server. Please try again.'}
        }
    }

    /**
     * updateTask
     * Updates an existing task by ID.
     * @param {string} id - The task ID
     * @param {Object} payload - Updated task data
     * @returns {Promise<Object>} Response from the server or error object
     */
    async updateTask(id, payload) {
        try {            
            const response = await this.#API.patch(id, payload);            

            if (response.status === 200) {
                return response;
            } else {
                return { error: `Unable to update task. Status: ${response.status} - ${response.message}` }
            }
        } catch (e) {
            return {error: 'Unable to connect to server. Please try again.'}
        }
    }

    /**
     * deleteTask
     * Deletes a task by ID.
     * @param {string} _id - The task ID
     * @returns {Promise<Object>} Response from the server or error object
     */
    async deleteTask(_id) {
        try{
            const response = await this.#API.delete(_id);            

        if (response.status === 204) {
            return response;
        }
            return { error: `Unable to delete task. Status: ${response.status} - ${response.message}` };
             } catch (e) {
            return { error: 'Unable to connect to server. Please try again.' };
        }
    }
}