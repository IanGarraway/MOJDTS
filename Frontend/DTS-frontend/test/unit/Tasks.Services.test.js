import { beforeEach, describe, expect, test } from "vitest";
import { tasks } from '../data/data.json';

import TasksService from "../../src/services/Tasks.Services";

describe("Tests for Tasks.Services", () => {
    describe("Tests for the getAll function", () => {
        test("Should respond with an array of 3 tasks", async () => {
            //Arrange
            const mockAPI = {
                getAll: vi.fn().mockResolvedValue({ "status": 200, "data": tasks })
            };

            const service = new TasksService(mockAPI);

            //Act
            const response = await service.getAll();

            //Assert
            expect(response).toHaveLength(3);

        });

        test("Should throw an error when API cannot connect", async () => {
            //Arrange 
            const mockAPI = {
                getAll: vi.fn().mockRejectedValue(new Error("Network Error")),
            };

            const service = new TasksService(mockAPI);

            //Act 
            const response = await service.getAll();

            //Assert
            expect(response).toHaveProperty('error');
            expect(response.error).toBe('Unable to connect to server. Please try again.');
        });

        test("should return an error message if server responds with 500", async () => {
            //Arrange
            const mockAPI = {
                getAll: vi.fn().mockResolvedValue({ response: { status: 500 }, message: "" }),
            };
            const service = new TasksService(mockAPI);

            //Act
            const response = await service.getAll();

            //Assert
            expect(response).toHaveProperty("error");
            expect(response.error).toBe("Unable to fetch tasks. Please try again later. ");
            expect(mockAPI.getAll).toHaveBeenCalled();
        });
    });

    describe("Tests for newTask function", () => {
        test("Should respond with status 201 and the new task", async () => {
            //Arrange
            const mockAPI = {
                newTask: vi.fn().mockResolvedValue({ status: 201, data: tasks[0] }),
            };
            const service = new TasksService(mockAPI);

            const mockPayload = {
                "taskTitle": tasks[0].taskTitle,
                "taskDescription": tasks[0].taskDescription,
                "taskDueDate": tasks[0].taskDueDate,
                "taskStatus": tasks[0].status
            };

            //Act
            const response = await service.newTask(mockPayload);

            //Assert
            expect(response.status).toEqual(201);
            expect(response.data).toEqual(tasks[0]);
        })

        test("Should respond with status 400 and the error message", async () => {
            //Arrange
            const mockAPI = {
                newTask: vi.fn().mockResolvedValue({ status: 400, message: "Bad Request" }),
            };
            const service = new TasksService(mockAPI);

            const mockPayload = {
                "taskDueDate": tasks[0].taskDueDate,
                "taskStatus": tasks[0].status
            };

            //Act
            const response = await service.newTask(mockPayload);

            //Assert
            expect(response).toHaveProperty("error");
            expect(response.error).toBe(`Unable to create task. Status: 400 - Bad Request`);
            expect(mockAPI.newTask).toHaveBeenCalled();
        });

        test("Should throw an error when API cannot connect", async () => {
            //Arrange 
            const mockAPI = {
                newTask: vi.fn().mockRejectedValue(new Error("Network Error")),
            };

            const service = new TasksService(mockAPI);

            const mockPayload = {
                "taskTitle": tasks[0].taskTitle,
                "taskDescription": tasks[0].taskDescription,
                "taskDueDate": tasks[0].taskDueDate,
                "taskStatus": tasks[0].status
            };

            //Act 
            const response = await service.newTask(mockPayload);

            //Assert
            expect(response).toHaveProperty('error');
            expect(response.error).toBe('Unable to connect to server. Please try again.');
        });
    })

    describe("Tests for the Update function", () => {
        test("Should respond with 200 on successful task update", async () => {
            //Arrange
            const mockAPI = {
                patch: vi.fn().mockResolvedValue({ status: 200, data: tasks[0] }),
            };
            const service = new TasksService(mockAPI);

            const mockId = tasks[0]._id;

            const mockPayload = {
                "taskTitle": tasks[0].taskTitle,
                "taskDescription": tasks[0].taskDescription,
            };

            //Act
            const response = await service.updateTask(mockId, mockPayload);

            //Assert
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(tasks[0]);
        });

        test("Should respond with 404 if valid id but no existing task is sent", async () => {
            //Arrange
            const mockAPI = {
                patch: vi.fn().mockResolvedValue({ status: 404, message: "No task found" }),
            };
            const service = new TasksService(mockAPI);

            const mockId = tasks[0]._id;

            const mockPayload = {
                "taskTitle": tasks[0].taskTitle,
                "taskDescription": tasks[0].taskDescription,
            };

            //Act
            const response = await service.updateTask(mockId, mockPayload);

            //Assert
            expect(response).toHaveProperty('error');
            expect(response.error).toBe(`Unable to update task. Status: 404 - No task found`);
        });
        
        test("Should throw an error when API cannot connect", async () => {
            //Arrange 
            const mockAPI = {
                updateTask: vi.fn().mockRejectedValue(new Error("Network Error")),
            };

            const service = new TasksService(mockAPI);

            const mockPayload = {
                "taskTitle": tasks[0].taskTitle,
                "taskDescription": tasks[0].taskDescription,                
            };

            //Act 
            const response = await service.updateTask(mockPayload);

            //Assert
            expect(response).toHaveProperty('error');
            expect(response.error).toBe('Unable to connect to server. Please try again.');
        });
    })

    describe("Tests for Task Deletion function", () => {
        test("Should respond with a status 204 on a successful task deletion", async () => {
            //Arrange
            const mockAPI = {
                delete: vi.fn().mockResolvedValue({ status: 204 }),
            };

            const service = new TasksService(mockAPI);
            const mockId = tasks[0]._id;

            //Act
            const response = await service.deleteTask(mockId);

            //Assert
            expect(response.status).toEqual(204);
        })

        test("Should respond with a status 404 on a valid id, but no task", async () => {
            //Arrange
            const mockAPI = {
                delete: vi.fn().mockResolvedValue({ status: 404, message: `No task found` }),
            };

            const service = new TasksService(mockAPI);
            const mockId = tasks[0]._id;

            //Act
            const response = await service.deleteTask(mockId);

            //Assert
            expect(response).toHaveProperty('error');
            expect(response.error).toBe(`Unable to delete task. Status: 404 - No task found`);
        })
        
        test("Should respond with a status 400 on a invalid", async () => {
            //Arrange
            const mockAPI = {
                delete: vi.fn().mockResolvedValue({ status: 400, message: `invalid ID` }),
            };

            const service = new TasksService(mockAPI);
            const mockId = tasks[0]._id;

            //Act
            const response = await service.deleteTask(mockId);

            //Assert
            expect(response).toHaveProperty('error');
            expect(response.error).toBe(`Unable to delete task. Status: 400 - invalid ID`);
        });

         test("Should throw an error when API cannot connect", async () => {
            //Arrange 
            const mockAPI = {
                delete: vi.fn().mockRejectedValue(new Error("Network Error")),
            };

            const service = new TasksService(mockAPI);

             const mockId = tasks[0]._id;

            //Act 
            const response = await service.deleteTask(mockId);

            //Assert
            expect(response).toHaveProperty('error');
            expect(response.error).toBe('Unable to connect to server. Please try again.');
        });
    })
})
