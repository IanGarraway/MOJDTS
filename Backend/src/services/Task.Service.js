import Task from "../models/Task.model.js";

export default class TaskService{

    getAll = async (req) => {
        try {
            return await Task.find({});
        } catch (e) {            
            throw e;
        }
    }

    get = async (taskId) => {
        try {
            return await Task.findById(taskId)            
        } catch (e) {
            throw e;
        }
    }

}