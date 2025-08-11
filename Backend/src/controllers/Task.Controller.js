import TaskService from "../services/Task.Service.js";

export default class TaskController{
    #taskService;

    constructor(taskService = new TaskService()) {
        this.#taskService = taskService;
    }

    newTask = async (req, res) => {
        return res.status(201).send({ message: "Task was registered sucessfully" });
    }
}