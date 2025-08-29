import { Router } from "express";
import { body } from "express-validator";
import TaskController from "../controllers/Task.Controller.js";


/**
 * TaskRoutes
 * Encapsulates the routing for task-related endpoints.
 * Handles CORS, route validation, and delegates to the TaskController.
 */
export default class TaskRoutes{

    #origin;
    #controller;
    #router;
    #routeStartPoint;

    /**
     * Constructor
     * @param {string} origin - Allowed origin for CORS
     * @param {TaskController} controller - Instance of TaskController
     * @param {string} routeStartPoint - Base path for the routes
     */
    constructor(origin = 'http://localhost:5173', controller = new TaskController(), routeStartPoint = "/") {
        this.#origin = origin;
        this.#controller = controller;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    /**
     * #initialiseRoutes
     * Private method to set up routes and middleware
     */
    #initialiseRoutes = () => {
        this.#router.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", this.#origin);
            res.header("Access-Control-Allow-Methods", "GET, POST");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

        // POST /tasks - creates a new task, confirming required fields are not empty
        this.#router.post('/tasks', [
            body(`taskTitle`).exists().notEmpty().escape(),
            body(`taskStatus`).exists().notEmpty().escape(),
            body(`taskDueDate`).exists().notEmpty().escape()
        ], this.#controller.newTask);

        this.#router.get('/tasks', this.#controller.getAll);
        this.#router.get('/tasks/:_id', this.#controller.get);
        this.#router.patch('/tasks/:_id', this.#controller.patch);
        this.#router.delete('/tasks/:_id', this.#controller.delete);
        
    };
    getRouter = () => { return this.#router; };
    getRouterStartPoint = () => { return this.#routeStartPoint; };
}
