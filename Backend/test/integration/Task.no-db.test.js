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

        const taskRoutes = new TaskRoutes(ORIGIN, taskController);

        mongoose.set("bufferCommands", false);
        await mongoose.disconnect();        

        testServer = new Server(PORT, HOST, taskRoutes, ORIGIN);
        testServer.start();

        request = supertest(testServer.getApp());
    })

    after(async () => {
        await testServer.close();
    })

    
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
            expect(response.body.message).to.equal("DB not available");
        })
    });
    
    describe("Get requests to /tasks/", () => {
        it("should respond with a status 500", async () => {
            //Arrange                

            //act
            const response = await request.get("/tasks");

            //assert
            expect(response.status).to.equal(500);
            expect(response.body.message).to.equal("DB not available");
        })
    });

    describe("Get requests to /tasks/{id}", () => {
        it("Should return with a status 500", async () => {
            //arrange            
            const taskId = "689c7ba78b0e0c4fe62e2ffa";

            //Act
            const response = await request.get(`/tasks/${taskId}`);

            //Assert
            expect(response.status).to.equal(500);
            expect(response.body.message).to.equal("DB not available");
        });
    });
    describe("Patch requests to /tasks/", () => {
        it("Should return with a status 500", async () => {
            //Arrange
            const mockId = "689c7ba78b0e0c4fe62e2ffa"
            const newData = { "taskStatus": 2 };

            //Act
            const response = await request.patch(`/tasks/${mockId}`).send(newData);
                
            //Assert
            expect(response.status).to.equal(500);
            expect(response.body.message).to.equal("DB not available");
        });
    })


})