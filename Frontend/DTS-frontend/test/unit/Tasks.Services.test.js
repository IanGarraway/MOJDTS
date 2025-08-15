import axios from 'axios';
import { beforeEach, describe, expect, test } from "vitest";
import { tasks } from '../data/data.json';

import TasksService from '../../src/services/Tasks.Service';

vi.mock('axios');

describe("Tasks Services Tests", () => {
    describe("Tests of the GET /tasks Route", () => {
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
            expect(response.data).to.equal(mockData);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/tasks');
        });

        test("Should return empty array if no tasks", async () => {
            //Arrange
            const mockData = [];
            const mockResponsePayload = { status: 200, data: mockData };

            axios.get.mockResolvedValue(mockResponsePayload);

            //Act
            const response = await TasksService.getAll();

            //Assert
            expect(response.status).to.equal(200);
            expect(response.data).to.equal(mockData);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/tasks');
        });

        test('throws an error if axios fails', async () => {
            //Arrange
            const error = new Error('Network Error');
            axios.get.mockRejectedValue(error);

            //Assert
            await expect(TasksService.getAll()).rejects.toThrow('Network Error');
        });

    });

    describe("Tests of the GET /tasks/{id} route ", () => {
        beforeEach(() => {
            axios.get.mockReset();
        });

        test("Should return a single task", async () => {
            //Arrange            
            const mockData = tasks[0];
            const mockResponsePayload = { status: 200, data: mockData };
            
            axios.get.mockResolvedValue(mockResponsePayload);
            
            //Act
            const response = await TasksService.get(mockData._id);

            //Assert
            expect(response.data).to.equal(mockData);
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/tasks/${mockData._id}`);          
            
        });

        test("throws an error if axios fails", async () => {
            //Arrange
            const error = new Error('Network Error');
            axios.get.mockRejectedValue(error);

            //Assert
            await expect(TasksService.get()).rejects.toThrow('Network Error');
        });
    
    });

    describe("Tests for POST /tasks route", () => {
        test("Should return a task, confirming one is created", async () => {
            //Arrange
            const mockData = tasks[0];
            const mockResponsePayload = { status: 201, data: mockData };
            const mockDeliveryPayload = {
                "taskTitle": mockData.taskTitle,
                "taskDescription": mockData.taskDescription,
                "taskStatus": mockData.taskStatus,
                "taskDueDate": mockData.taskDueDate
            };

            axios.post.mockResolvedValue(mockResponsePayload);

            //Act
            const response = await TasksService.newTask(mockDeliveryPayload);

            //Assert
            expect(response.status).to.equal(201);
        })
    })
    
});


