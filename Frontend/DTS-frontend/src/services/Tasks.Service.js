//import data from "./data.json";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export default class TasksService{  

    
    static async getAll() {         
        const response = await axios.get(`${apiURL}/tasks`);        

        return response;
    }
}