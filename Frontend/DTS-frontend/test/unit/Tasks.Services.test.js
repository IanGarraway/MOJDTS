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
            const result = await service.getAll();

            //Assert
            expect(result).toHaveProperty('error');
            expect(result.error).toBe('Unable to connect to server. Please try again.');
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
            const result = await service.newTask(mockPayload);

            //Assert
            expect(result).toHaveProperty('error');
            expect(result.error).toBe('Unable to connect to server. Please try again.');
        });

        

        


    })
})
