import express from 'express';
import cors from 'cors';

/**
 * Server
 * Encapsulates the Express server setup, middleware, CORS configuration, and routes.
 */
export default class Server{
    #app;
    #host;
    #port;
    #taskRouter;
    #server;
    #allowedOrigin;

    /**
     * Constructor
     * @param {number} port - Port for the server to listen on
     * @param {string} host - Host address for the server
     * @param {TaskRoutes} taskRoutes - Instance of TaskRoutes to register endpoints
     * @param {string} allowedOrigin - Frontend URL allowed by CORS
     */

    constructor(port, host, taskRoutes, allowedOrigin) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#taskRouter = taskRoutes;
        this.#allowedOrigin = allowedOrigin;        
    }

    getApp = () => {
        return this.#app;
    }

    /**
     * start
     * Sets up middleware, CORS, routes and starts listening on the specified host and port
     */
    start = () => {

        const corsOptions = {
            origin: this.#allowedOrigin, //allow only the react front end to be the origin            
            methods: ['GET', 'POST', 'PATCH', 'DELETE'], //allowed methods
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token'], //allowed headers
        };

        this.#app.use(cors(corsOptions));
        this.#app.use(express.json());

        this.#app.use(
            this.#taskRouter.getRouterStartPoint(),
            this.#taskRouter.getRouter()
        );

        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening http://${this.#host}:${this.#port}`);
        });
    };

    /**
     * close
     * Stops the server
     */
    close = () => {
        this.#server.close();         
    }
}