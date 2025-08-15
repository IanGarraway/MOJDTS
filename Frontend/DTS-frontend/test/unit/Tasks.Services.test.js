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
            // Arrange
            const mockAPI = {
                getAll: vi.fn().mockResolvedValue({ response: { status: 500 }, message: "" }),
            };
            const service = new TasksService(mockAPI);

            // Act
            const response = await service.getAll();

            // Assert
            expect(response).toHaveProperty("error");
            expect(response.error).toBe("Unable to fetch tasks. Please try again later. ");
            expect(mockAPI.getAll).toHaveBeenCalled();
        });
    });
})
