import { beforeEach, describe, expect, test } from "vitest";

import TaskTools from "../../src/utils/Tasks.Tools";
import {tasks} from "../data/data.json"


describe("Tests for Tasks.Tools ", () => {
    describe("PatchPayload Tests", () => {
        test("Should return a payload with only status in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskStatus = 2;
            
            const expectedPayload = { "taskStatus": 2 };

            //Act
            const response = TaskTools.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(response).to.deep.equal(expectedPayload);
        });

        test("Should return a payload with only title in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskTitle = "Modified Task Title";
            
            
            const expectedPayload = { "taskTitle": "Modified Task Title" };

            //Act
            const response = TaskTools.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(response).to.deep.equal(expectedPayload);
        });

        test("Should return a payload with only date time in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskDueDate = "2025-14-08T00:00";
            
            
            const expectedPayload = { "taskDueDate": "2025-14-08T00:00" };

            //Act
            const response = TaskTools.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(response).to.deep.equal(expectedPayload);
        });

        test("Should return a payload with only description in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskDescription = "modified description";
            
            
            const expectedPayload = { "taskDescription": "modified description" };

            //Act
            const response = TaskTools.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(response).to.deep.equal(expectedPayload);
        });

        test("Should return a payload with title, description and date time in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskDueDate = "2025-14-08T00:00:00.000Z";
            modifiedTask.taskDescription = "modified description";
            modifiedTask.taskTitle = "Modified Task Title";
            
            
            
            const expectedPayload = {
                "taskTitle": "Modified Task Title",
                "taskDescription": "modified description",
                "taskDueDate": "2025-14-08T00:00"
            };

            //Act
            const response = TaskTools.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(response).to.deep.equal(expectedPayload);
        });

        test("Should return a payload with title, description, status and date time in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskDueDate = "2025-14-08T00:00:00.000Z";
            modifiedTask.taskDescription = "modified description";
            modifiedTask.taskTitle = "Modified Task Title";
            modifiedTask.taskStatus = 2;
            
            
            const expectedPayload = {
                "taskTitle": "Modified Task Title",
                "taskDescription": "modified description",
                "taskDueDate": "2025-14-08T00:00",
                 "taskStatus": 2
            };

            //Act
            const response = TaskTools.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(response).to.deep.equal(expectedPayload);
        });


    });

    describe("New Task creation tool", () => {
        test("passing in the 4 items returns a valid object", () => {
            //Arrange
            const mockTitle = tasks[0].taskTitle;
            const mockDescription = tasks[0].taskDescription;
            const mockDueDate = tasks[0].taskDueDate;
            const mockStatus = tasks[0].taskStatus;

            const expectedResult = {
                "taskTitle": mockTitle,
                "taskDescription": mockDescription,
                "taskDueDate": mockDueDate,
                "taskStatus": mockStatus
            };

            //Act
            const response = TaskTools.newTask(mockTitle, mockDescription, mockDueDate, mockStatus);

            //Assert
            expect(response).toEqual(expectedResult);

        })
    })
})