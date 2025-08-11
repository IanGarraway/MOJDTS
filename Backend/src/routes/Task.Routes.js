import { Router } from "express";
import { body } from "express-validator";
import TaskController from "../controllers/Task.Controller.js";

export default class TaskRoutes{

    #origin;
    #controller;
    #router;
    #routeStartPoint;

    constructor(origin = 'http://localhost:5173', controller = new TaskController(), routeStartPoint = "/") {
        this.#origin = origin;
        this.#controller = controller;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        this.#router.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", this.#origin);
            res.header("Access-Control-Allow-Methods", "GET, POST");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

        this.#router.post('/newtask', [
            body(`taskTitle`).exists().notEmpty().escape(),
            body(`taskStatus`).exists().notEmpty().escape()
        ], this.#controller.newTask);

        this.#router.get('/getall', this.#controller.getAll);
        
    };
    getRouter = () => { return this.#router; };
    getRouterStartPoint = () => { return this.#routeStartPoint; };
}
