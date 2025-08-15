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

        })
    })
})
