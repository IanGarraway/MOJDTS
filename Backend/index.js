import Config from "./src/config/Config.js";
import Server from "./src/server/Server.js";
import TaskRoutes from "./src/routes/Task.Routes.js";
import Database from "./src/db/Database.js";

Config.load();
const { PORT, HOST, DB_URI, ALLOWED_ORIGIN } = process.env;

const taskRoutes = new TaskRoutes(ALLOWED_ORIGIN);

const server = new Server(PORT, HOST, taskRoutes, ALLOWED_ORIGIN);
const database = new Database(DB_URI);


server.start();
await database.connect();
