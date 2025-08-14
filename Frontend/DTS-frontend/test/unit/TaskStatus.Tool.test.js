import { describe, expect, test } from "vitest";
import TaskStatusTool from "../../src/utils/TaskStatus.Tool";


describe("Tests of the Task Status conversion tool", () => {
    describe("Tests of the Status code to text function", () => {
        test("Should return 'Pending' to a status of 1", () => {
            //arrange
            const statusTestCode = 1

            //act
            const response = TaskStatusTool.StatusText(statusTestCode);

            //assert
            expect(response).to.equal("Pending");
        });

        test("Should return 'In Progress' to a status code of 2", () => {
            //arrange
            const statusTestCode = 2

            //act
            const response = TaskStatusTool.StatusText(statusTestCode);

            //assert
            expect(response).to.equal("In Progress");            
        })
    })
})
