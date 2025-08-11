import TaskService from "../services/Task.Service.js";

export default class TaskController{
    #taskService;

    constructor(taskService = new TaskService()) {
        this.#taskService = taskService;
    }
}