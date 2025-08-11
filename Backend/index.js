import Config from "./src/config/Config.js";
import Server from "./src/server/Server.js";
import TaskRoutes from "./src/routes/Task.Routes.js";

Config.load();
const { PORT, HOST, DB_URI, ALLOWED_ORIGIN } = process.env;

const taskRoutes = new TaskRoutes(ALLOWED_ORIGIN);

const server = new Server(PORT, HOST, taskRoutes, ALLOWED_ORIGIN);


server.start();
