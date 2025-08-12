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

    patch = async (req) => {
        return await Task.findByIdAndUpdate(
            req.params._id,
            { $set: req.body }, //Only update the fields send in the body
            { new: true, runValidators: true } //new: true will return the updated task
        );
    }

}