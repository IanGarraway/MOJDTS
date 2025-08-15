import { beforeEach, describe, expect, test } from "vitest";

import TaskService from "../../src/services/Tasks.Service";
import {tasks} from "../data/data.json"


describe("Tasks.Service Tests", () => {
    describe("PatchPayload Tests", () => {
        test("Should return a payload with only status in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskStatus = 2;
            
            const expectedPayload = { "taskStatus": 2 };

            //Act
            const reponse = TaskService.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(reponse).to.deep.equal(expectedPayload);
        });

        test("Should return a payload with only title in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskTitle = "Modified Task Title";
            
            
            const expectedPayload = { "taskTitle": "Modified Task Title" };

            //Act
            const reponse = TaskService.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(reponse).to.deep.equal(expectedPayload);
        });

        test("Should return a payload with only date time in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskDueDate = "2025-14-08T00:00:00.000Z";
            
            
            const expectedPayload = { "taskDueDate": "2025-14-08T00:00:00.000Z" };

            //Act
            const reponse = TaskService.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(reponse).to.deep.equal(expectedPayload);
        });

        test("Should return a payload with only description in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = structuredClone(originalTask);
            modifiedTask.taskDescription = "modified description";
            
            
            const expectedPayload = { "taskDescription": "modified description" };

            //Act
            const reponse = TaskService.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(reponse).to.deep.equal(expectedPayload);
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
                "taskDueDate": "2025-14-08T00:00:00.000Z"
            };

            //Act
            const reponse = TaskService.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(reponse).to.deep.equal(expectedPayload);
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
                "taskDueDate": "2025-14-08T00:00:00.000Z",
                 "taskStatus": 2
            };

            //Act
            const reponse = TaskService.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(reponse).to.deep.equal(expectedPayload);
        });


    });
})