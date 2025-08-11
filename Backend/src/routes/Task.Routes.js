import { Router } from "express";
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
        
    };
    getRouter = () => { return this.#router; };
    getRouterStartPoint = () => { return this.#routeStartPoint; };
}
