import TasksAPI from "./Tasks.API"

export default class TasksService{

    #API

    constructor(api = TasksAPI) {
        this.#API = api;
    }

    async getAll() {
        const response = await this.#API.getAll()
        console.log(response);

        return response.data;
        
    }
        
    


}