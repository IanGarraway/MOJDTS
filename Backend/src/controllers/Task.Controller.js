import mongoose from "mongoose";
import TaskService from "../services/Task.Service.js";
import { validationResult } from "express-validator";

/**
 * TaskController
 * Handles HTTP requests for tasks and delegates business logic to TaskService.
 * Each method corresponds to a REST API endpoint: create, read, update, delete tasks.
 */
export default class TaskController{
    #taskService;

    constructor(taskService = new TaskService()) {
        this.#taskService = taskService;
    }

    /**
     * Create a new task
     * Validates request body and passes it to TaskService
     * Returns 201 on success, 400 on validation failure, 500 on server error
     */
    newTask = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Task validation failed', errors: errors.array() });
            }
            const newTask = await this.#taskService.newTask(req);            

            return res.status(201).send({ message: "Task was registered successfully", newTask });
        } catch (e) {            
            return res.status(500).send({ message: e.message || "Some error occurred while attempting to create new task" });
        }
    }

    /**
     * Retrieve all tasks
     * Returns 200 with an array of tasks, 500 on server error
     */
    getAll = async (req, res) => {     
        try {
            const taskData = await this.#taskService.getAll();
        
            return res.status(200).send(taskData);
        } catch (e) {            
            return res.status(500).send({ message: e.message || "Some error occurred while attempting to create new task" });
        }
    }

    /**
     * Retrieve a single task by ID
     * Validates the ID format, returns 404 if task not found
     */
    get = async (req, res) => { 
        try {
            // Check if task ID is a valid Mongo ObjectId
            if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
                return res.status(400).send({ message: "Invalid task ID format" });
            }
            const taskData = await this.#taskService.get(req.params._id);
            if (taskData == null) { return res.status(404).send({ message: "No task found" }); }
            return res.status(200).send(taskData);
        } catch (e) {
            return res.status(500).send({ message: e.message || "Some error occurred while attempting to create new task" });
        }
    }

    /**
     * Update task (patch)
     * Validates ID, calls service to update task
     * Returns 404 if task not found
     */
    patch = async (req, res) => {
        try {
            // Check if task ID is a valid Mongo ObjectId
            if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
                return res.status(400).send({ message: "Invalid task ID format" });
            }

            const updatedTask = await this.#taskService.patch(req);
        
            if (updatedTask == null) { return res.status(404).send({ message: "No task found" }); }
        
            return res.status(200).send(updatedTask);
        } catch (e) {
            return res.status(500).send({ message: e.message || "Some error occurred while attempting to create new task" });
        }
    }

    /**
     * Delete a task by ID
     * Validates ID, calls service to delete task
     * Returns 204 if deleted, 404 if task not found
     */
    delete = async (req, res) => {
        try {
            // Check if task ID is a valid Mongo ObjectId
            if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
                return res.status(400).send({ message: "Invalid task ID format" });
            }
        
            const result = await this.#taskService.delete(req);

            if (result.deletedCount === 0) { return res.status(404).send(); }
            return res.status(204).send();
        } catch (e) {
            return res.status(500).send({ message: e.message || "Some error occurred while attempting to create new task" });
        }
    }
}