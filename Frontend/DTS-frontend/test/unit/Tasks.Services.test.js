import axios from 'axios';
import { beforeEach, describe, expect, test } from "vitest";
import { tasks } from '../data/data.json';

import TasksService from '../../src/services/Tasks.Service';

vi.mock('axios');

describe("Tasks Services Tests", () => {
    describe("tests of the GET /Tasks Route", () => {
        beforeEach(() => {
            axios.get.mockReset();
        });

        test("Should return the test data", async () => {
            //Arrange
            const mockData = tasks;
            const mockResponsePayload = { status: 200, data: mockData };

            axios.get.mockResolvedValue(mockResponsePayload);

            //Act
            const response = await TasksService.getAll();

            //Assert
            expect(response).to.equal(mockData);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/tasks');
        });
    });
    
})


