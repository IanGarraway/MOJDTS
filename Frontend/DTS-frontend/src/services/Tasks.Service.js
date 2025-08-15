//import data from "./data.json";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export default class TasksService{  

    
    static async getAll() {         
        try {
            const response = await axios.get(`${apiURL}/tasks`);

            return response;
        } catch (e) {
            console.log(e.message);
            throw e;
        }
    }

    static async get(id) {
        const response = await axios.get(`${apiURL}/tasks/${id}`);

            return response;
    }

    static async newTask(taskData) {
        const response = await axios.post(`${apiURL}/tasks`,
            taskData
        );
        return response;
    }
}