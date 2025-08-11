import TaskService from "../services/Task.Service.js";
import Task from "../models/Task.model.js";
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
            const newTask = new Task({
                taskTitle: req.body.taskTitle,
                taskDescription: req.body.taskDescription,
                taskStatus: req.body.taskStatus,
                taskDueDate: req.body.taskDueDate
            });            
            
            await newTask.save();            

            return res.status(201).send({ message: "Task was registered successfully" });
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
        const taskData = await this.#taskService.get(req.params._id);        
        
        return res.status(200).send(taskData);
    }
}