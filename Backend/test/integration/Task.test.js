//test framework imports
import { expect } from "chai";
import supertest from "supertest";

//code imports

import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";

import TaskController from "../../src/controllers/Task.Controller.js";
import TaskRoutes from "../../src/routes/Task.Routes.js";
import TaskService from "../../src/services/Task.Service.js";

import Task from "../../src/models/Task.model.js";


describe("Tests of Task Routes", () => {
    let database;
    let testServer;
    let taskService;

    let request;
    
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI, ORIGIN } = process.env;

        taskService = new TaskService();

        const taskController = new TaskController(taskService);

        const taskRoutes = new TaskRoutes(ORIGIN);

        database = new Database(DB_URI);
        await database.connect();

        testServer = new Server(PORT, HOST, taskRoutes, ORIGIN);
        testServer.start();

        request = supertest(testServer.getApp());
    })

    after(async () => {
        await testServer.close();
        await database.close();
    })

    afterEach(async () => {
        try {
            await Task.deleteMany();            
        } catch (e) {
            console.log(e.message);
            console.log("Error clearing out Tasks");
            throw new Error(e.message);
        }
    })

    describe("Create Task Route", () => {        
        describe("Post request to /newtask", () => {
            it("should repond with Task was registered successfully", async () => {
                //arrange
                let testTask = {
                    "taskTitle": "Test Task",
                    "taskDescription": "Test Task",
                    "taskStatus": 1,
                    "taskDueDate": "2025-12-08T00:00:00.000Z"
                }

                //Act
                const response = await request.post("/newtask").send(testTask);

                //Assert
                expect(response.status).to.equal(201);
            })
            it("should respond with 400 error if title is missing", async () => {
                //arrange
                let testTask = {
                    "taskTitle": "",
                    "taskDescription": "Test Task",
                    "taskStatus": 1,
                    "taskDueDate": "2025-12-08T00:00:00.000Z"
                }

                //Act
                const response = await request.post("/newtask").send(testTask);

                //Assert
                expect(response.status).to.equal(400);
            })

            it("should respond with 400 error if status is missing", async () => {
                //arrange
                let testTask = {
                    "taskTitle": "Test Task",
                    "taskDescription": "Test Task",                    
                    "taskDueDate": "2025-12-08T00:00:00.000Z"
                }

                //Act
                const response = await request.post("/newtask").send(testTask);

                //Assert
                expect(response.status).to.equal(400);
            })
        })
    });

    describe("Get task Routes", () =>{
        describe("Get request to /getall", () => {
            it("should respond with a single task", async () => {
                //Arrange
                let testTask = {
                    "taskTitle": 'Test Task',
                    "taskDescription": 'Test Task',
                    "taskStatus": 1,
                    "taskDueDate": '2025-12-08T00:00:00.000Z'
                }

                await request.post("/newtask").send(testTask);

                //act
                const response = await request.get("/getall");

                //assert
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an("array");

                const found = response.body.some(task =>
                    task.taskTitle === testTask.taskTitle &&
                    task.taskDescription === testTask.taskDescription &&
                    task.taskStatus === testTask.taskStatus &&
                    new Date(task.taskDueDate).toISOString() === testTask.taskDueDate
                );                
                expect(found).to.be.true;
            })

            it("Should respond with an array of 2 tasks", async () => {
                //Arrange
                let testTask1 = {
                    "taskTitle": 'Test Task 1',
                    "taskDescription": 'Test Task',
                    "taskStatus": 1,
                    "taskDueDate": '2025-12-08T00:00:00.000Z'
                }
                let testTask2 = {
                    "taskTitle": 'Test Task 2',
                    "taskDescription": 'Test Task',
                    "taskStatus": 1,
                    "taskDueDate": '2025-12-08T00:00:00.000Z'
                }

                await request.post("/newtask").send(testTask1);
                await request.post("/newtask").send(testTask2);

                //act
                const response = await request.get("/getall");

                //assert
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an("array").of.length(2);

            })
        })
    })
})
