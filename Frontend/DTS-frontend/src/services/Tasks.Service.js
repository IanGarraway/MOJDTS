import data from "./data.json";

export default class TaskService{

    static async getAll() {         
        const tasks = data.Tasks;
        return tasks;
    }
}