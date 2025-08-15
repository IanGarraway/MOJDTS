import axios from 'axios';
import { beforeEach, describe, expect, test } from "vitest";
import { tasks } from '../data/data.json';

import TasksAPI from '../../src/services/Tasks.API';

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
            const response = await TasksAPI.getAll();

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
            const response = await TasksAPI.getAll();

            //Assert
            expect(response.status).to.equal(200);
            expect(response.data).to.equal(mockData);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/tasks');
        });

        test('Should throw an error if axios fails', async () => {
            //Arrange
            const error = new Error('Network Error');
            axios.get.mockRejectedValue(error);

            //Assert
            await expect(TasksAPI.getAll()).rejects.toThrow('Network Error');
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
            const response = await TasksAPI.get(mockData._id);

            //Assert
            expect(response.data).to.equal(mockData);
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/tasks/${mockData._id}`);          
            
        });

        test("Should throw an error if axios fails", async () => {
            //Arrange
            const error = new Error('Network Error');
            axios.get.mockRejectedValue(error);

            //Assert
            await expect(TasksAPI.get()).rejects.toThrow('Network Error');
        });
    
    });

    describe("Tests for POST /tasks route", () => {
        beforeEach(() => {
            axios.post.mockReset();
        });


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
            const response = await TasksAPI.newTask(mockDeliveryPayload);

            //Assert
            expect(response.status).to.equal(201);
        })

        test("Should throw an error if axios fails", async () => {
            //Arrange
            const mockData = tasks[0];
            const mockResponsePayload = { status: 201, data: mockData };
            const error = new Error('Network Error');
            axios.post.mockRejectedValue(error);

            //Assert
            await expect(TasksAPI.newTask(mockResponsePayload)).rejects.toThrow('Network Error');
        });
    });

    describe("Tests for PATCH /tasks route", () => {
        beforeEach(() => {
            axios.patch.mockReset();
        });

        test("Should return a task and status code 200 ", async () => {
            //Arrange
            const mockData = tasks[0];
            const mockResponsePayload = { status: 200, data: mockData };
            const mockDeliveryPayload = {
                "taskStatus": 2,
            }

            axios.patch.mockResolvedValue(mockResponsePayload);

            //Act
            const response = await TasksAPI.patch(mockData._id, mockDeliveryPayload);

            //Assert
            expect(response.status).to.equal(200);
            expect(axios.patch).toHaveBeenCalledWith(`http://localhost:3000/tasks/${mockData._id}`, mockDeliveryPayload);
        });

        test("Should throw an error if axios fails", async () => {
            //Arrange
            const mockData = tasks[0];
            const mockResponsePayload = { status: 201, data: mockData };
            const error = new Error('Network Error');
            axios.patch.mockRejectedValue(error);

            //Assert
            await expect(TasksAPI.newTask(mockResponsePayload)).rejects.toThrow('Network Error');
        });
    });

    describe("Tests for DELETE /tasks route", () => { 
        beforeEach(() => {
            axios.delete.mockReset();
        });

        test("Should return 204 on a successful deletion", async () => {
            //Arrange
            const mockID = tasks[0]._id;
            const mockResponsePayload = { status: 204 };

            axios.delete.mockResolvedValue(mockResponsePayload);

            //Act
            const response = await TasksAPI.delete(mockID);

            //Assert
            expect(response.status).to.equal(204);
            expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/tasks/${mockID}`);

        });

        test("Should throw an error if axios fails", async () => {
            //Arrange
            const mockData = tasks[0];            
            const error = new Error('Network Error');
            axios.delete.mockRejectedValue(error);

            //Assert
            await expect(TasksAPI.delete(mockData._id)).rejects.toThrow('Network Error');
        });
    })
    
});


