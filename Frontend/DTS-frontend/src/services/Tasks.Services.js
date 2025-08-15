import TasksAPI from "./Tasks.API"

export default class TasksService{

    #API

    constructor(api = TasksAPI) {
        this.#API = api;
    }

    async getAll() {
        try {
            const response = await this.#API.getAll()

            if (response.status === 200) {
                return response.data;
            }
            return { error: `Unable to fetch tasks. Please try again later. ${response.message}` };
        } catch (e) {
            console.log(e.message);
            return { error: `Unable to connect to server. Please try again.` };
        }        
    }

    async newTask(payload) {
        try {
            const response = await this.#API.newTask(payload);

            if (response.status === 201) {
                return response.data;
            } else {
            
                return { error: `Unable to create task. Status: ${response.status} - ${response.message}` }
            }
        } catch (e) {
            return {error: 'Unable to connect to server. Please try again.'}
        }
    }
        
    


}