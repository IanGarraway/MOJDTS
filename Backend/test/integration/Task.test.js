//test framework imports
import { expect } from "chai";
import supertest from "supertest";

//code imports

import Config from "../../src/config/Config.js";
import Server from "../../src/server/Server.js";

import TaskController from "../../src/controllers/Task.Controller.js";
import TaskRoutes from "../../src/routes/Task.Routes.js";
import TaskService from "../../src/services/Task.Service.js";


describe("Tests of Task Routes", () => {
    let testServer;
    let taskService;

    let request;
    
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI, ORIGIN } = process.env;

        taskService = new TaskService();

        const taskController = new TaskController(taskService);

        const taskRoutes = new TaskRoutes(ORIGIN);

        testServer = new Server(PORT, HOST, taskRoutes, ORIGIN);
        testServer.start();

        request = supertest(testServer.getApp());
    })

    after(async () => {
        await testServer.close();
    })

    describe("Create Task Route", () => {
        
        describe("Post request to /newtask", () => {
            it("should repond with Task was registered successfully", async () => {
                //arrange
                let testTask = {
                    "Title": "Test Task",
                    "Description": "Test Task",
                    "Status": "Open",
                    "Due date/time": "12/08/2025"
                }

                //Act
                const response = await request.post("/newtask").send(testTask);

                //Assert
                expect(response.status).to.equal(201);
            })
        })
    })
})
