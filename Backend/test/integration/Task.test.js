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
                const response = await request.post("/tasks").send(testTask);

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
                const response = await request.post("/tasks").send(testTask);

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
                const response = await request.post("/tasks").send(testTask);

                //Assert
                expect(response.status).to.equal(400);
            })
            it("should respond with 400 error if taskDueDate is missing", async () => {
                //arrange
                let testTask = {
                    "taskTitle": "Test Task",
                    "taskDescription": "Test Task",
                    "taskStatus": 1,                    
                }

                //Act
                const response = await request.post("/tasks").send(testTask);

                //Assert
                expect(response.status).to.equal(400);
            })
        })
    });

    describe("Get task Routes", () =>{
        describe("Get requests to /getall", () => {
            it("should respond with a single task", async () => {
                //Arrange
                let testTask = {
                    "taskTitle": 'Test Task',
                    "taskDescription": 'Test Task',
                    "taskStatus": 1,
                    "taskDueDate": '2025-12-08T00:00:00.000Z'
                }

                await request.post("/tasks").send(testTask);

                //act
                const response = await request.get("/tasks");

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

                await request.post("/tasks").send(testTask1);
                await request.post("/tasks").send(testTask2);

                //act
                const response = await request.get("/tasks");

                //assert
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an("array").of.length(2);

            })
        })

        describe("Get requests to /get", () => {
            it("Should return the task when the id is sent", async () => {
                //arrange
                let testTask = {
                    "taskTitle": 'Test Task',
                    "taskDescription": 'Test Task',
                    "taskStatus": 1,
                    "taskDueDate": '2025-12-08T00:00:00.000Z'
                }
                const createdTask = await Task.create(testTask);
                const taskId = createdTask._id.toString();                

                //Act
                const response = await request.get(`/tasks/${taskId}`);

                //Assert
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an("object");
                expect(response.body.taskTitle).to.equal(testTask.taskTitle);
            });

            it("Should return 404 when an id for a non existant task is sent", async () => {
                //arrange
                let testTask = {
                    "taskTitle": 'Test Task',
                    "taskDescription": 'Test Task',
                    "taskStatus": 1,
                    "taskDueDate": '2025-12-08T00:00:00.000Z'
                }
                 await Task.create(testTask);
                const taskId = "689a2ec243c64536c8086bb5";

                //Act
                const response = await request.get(`/tasks/${taskId}`);                

                //Assert
                expect(response.status).to.equal(404);                
            });

            it("Should return 400 when an invalid id is sent", async () => {
                //arrange
                let testTask = {
                    "taskTitle": 'Test Task',
                    "taskDescription": 'Test Task',
                    "taskStatus": 1,
                    "taskDueDate": '2025-12-08T00:00:00.000Z'
                }
                 await Task.create(testTask);
                const taskId = "1234";

                //Act
                const response = await request.get(`/tasks/${taskId}`);                

                //Assert
                expect(response.status).to.equal(400);                
            });

            it("Should return the correct task when the id is sent and there are multiple tasks", async () => {
                //arrange
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
                let testTask3 = {
                    "taskTitle": 'Test Task 3',
                    "taskDescription": 'Test Task',
                    "taskStatus": 1,
                    "taskDueDate": '2025-12-08T00:00:00.000Z'
                }
                await Task.create(testTask1);
                const createdTask = await Task.create(testTask2);
                await Task.create(testTask3);
                const taskId = createdTask._id.toString();                

                //Act
                const response = await request.get(`/tasks/${taskId}`);

                //Assert
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an("object");
                expect(response.body.taskTitle).to.equal(testTask2.taskTitle);
            });
        })
    })
})
