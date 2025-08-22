import Task from "../models/Task.model.js";

export default class TaskService{

    #task;

constructor(taskModel = Task){
    this.#task = taskModel;
    }


    getAll = async (req) => {
        try {
            return await this.#task.find({});
        } catch (e) {            
            throw e;
        }
    }

    get = async (taskId) => {
        try {
            return await this.#task.findById(taskId)            
        } catch (e) {
            throw e;
        }
    }

    patch = async (req) => {
        return await this.#task.findByIdAndUpdate(
            req.params._id,
            { $set: req.body }, //Only update the fields send in the body
            { new: true, runValidators: true } //new: true will return the updated task
        );
    }

    newTask = async (req) => {
        
        const newTask = new this.#task({
                taskTitle: req.body.taskTitle,
                taskDescription: req.body.taskDescription,
                taskStatus: req.body.taskStatus,
                taskDueDate: req.body.taskDueDate
            });            
            
            return await newTask.save();   
    }

    delete = async (req) => {
        return await this.#task.deleteOne({"_id": req.params._id})
    }

}