import express from 'express';
import cors from 'cors';

export default class Server{
    #app;
    #host;
    #port;
    #taskRouter;
    #server;
    #allowedOrigin;

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

    close = () => {
        this.#server.close();         
    }
}