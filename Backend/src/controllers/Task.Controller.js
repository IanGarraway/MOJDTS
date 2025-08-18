import mongoose from "mongoose";
import TaskService from "../services/Task.Service.js";
import { validationResult } from "express-validator";


export default class TaskController{
    #taskService;

    constructor(taskService = new TaskService()) {
        this.#taskService = taskService;
    }

    newTask = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Task validation failed', errors: errors.array() });
            }
            const newTask = this.#taskService.newTask(req);         

            return res.status(201).send({ message: "Task was registered successfully", newTask });
        } catch (e) {
            console.log("New task creation error -->", e);
            return res.status(500).send({ message: e.message || "Some error occurred while attempting to create new task" });                       
        }
    }

    getAll = async (req, res) => {                
        const taskData = await this.#taskService.getAll();
        
        return res.status(200).send(taskData);
    }

    get = async (req, res) => { 
        if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
            return res.status(400).send({ message: "Invalid task ID format" });
        }
        const taskData = await this.#taskService.get(req.params._id); 
        if (taskData == null) { return res.status(404).send({ message: "No task found" }); }        
        return res.status(200).send(taskData);
    }

    patch = async (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
            return res.status(400).send({ message: "Invalid task ID format" });
        }

        const updatedTask = await this.#taskService.patch(req);
        
        if (updatedTask == null) { return res.status(404).send({ message: "No task found" }); }        
        
        return res.status(200).send(updatedTask);
    }

    delete = async (req, res) => {
        
        if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
            return res.status(400).send({ message: "Invalid task ID format" });
        }
        
        const result = await this.#taskService.delete(req);

        if (result.deletedCount === 0) { return res.status(404).send(); }        
        return res.status(204).send();
        
    }
}