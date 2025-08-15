import TasksAPI from "./Tasks.API"

export default class TasksService{

    #API

    constructor(api = TasksAPI) {
        this.#API = api;
    }

    async getAll() {
        try {
            const response = await this.#API.getAll()

            return response.data;
        } catch (e) {
            return { error: "Unable to connect to server. Please try again." };
        }
        
    }
        
    


}