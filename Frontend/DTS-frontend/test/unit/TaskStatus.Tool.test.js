import { describe, expect, test } from "vitest";
import TaskStatusTool from "../../src/utils/TaskStatus.Tool";


describe("Tests of the Task Status conversion tool", () => {
    describe("Tests of the Status code to text function", () => {
        test("Should return pending to a status of 1", () => {
            //arrange
            const statusTestCode = 1

            //act
            const response = TaskStatusTool.StatusText(statusTestCode);

            expect(response).to.equal("pending");
        })
    })
})
