import { beforeEach, describe, expect, test } from "vitest";

import TaskService from "../../src/services/Tasks.Service";
import {tasks} from "../data/data.json"


describe("Tasks.Service Tests", () => {
    describe("PatchPayload Tests", () => {
        test("Should return a payload with only status in it", () => {
            //Arrange
            const originalTask = tasks[1];
            const modifiedTask = originalTask;
            modifiedTask.taskStatus = 2;
            
            const expectedPayload = { "taskStatus": 2 };

            //Act
            const reponse = TaskService.patchPayload(originalTask, modifiedTask);

            //Assert
            expect(reponse).to.deep.equal(expectedPayload);
        })
    })
})