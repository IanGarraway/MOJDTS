//test framework imports
import { expect } from "chai";
import supertest from "supertest";

//code imports

import Config from "../../src/config/Config.js";
import Server from "../../src/server/Server.js";

import TaskController from "../../src/controllers/Task.Controller.js";
import TaskRoutes from "../../src/routes/Task.Routes.js";
import TaskService from "../../src/services/Task.Service.js";

import mongoose from "mongoose";




describe("Tests of Task Routes with no database", () => {    
    let testServer;
    let taskService;

    let request;
    
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI, ORIGIN } = process.env;

        class FakeTaskModel {
            constructor() { }
            save() { throw new Error("DB not available"); }
            static find() { throw new Error("DB not available"); }
            static findById() { throw new Error("DB not available"); }
            static findByIdAndUpdate() { throw new Error("DB not available"); }
            static deleteOne() { throw new Error("DB not available"); }
        }

        taskService = new TaskService(FakeTaskModel);

        const taskController = new TaskController(taskService);

        const taskRoutes = new TaskRoutes(ORIGIN);

        mongoose.set("bufferCommands", false);
        await mongoose.disconnect();        

        testServer = new Server(PORT, HOST, taskRoutes, ORIGIN);
        testServer.start();

        request = supertest(testServer.getApp());
    })

    after(async () => {
        await testServer.close();
    })

    describe("Create Task Route", () => {
        describe("Post request to /tasks", () => {
            it("should respond with 500 database error", async () => {
                //arrange
                let testTask = {
                    "taskTitle": "Test Task",
                    "taskDescription": "Test Task",
                    "taskStatus": 1,
                    "taskDueDate": "2025-12-08T00:00:00.000Z"
                }

                //Act
                const response = await request.post("/tasks").send(testTask);

                //Assert
                
                expect(response.status).to.equal(500);
            })
        })
    })


})