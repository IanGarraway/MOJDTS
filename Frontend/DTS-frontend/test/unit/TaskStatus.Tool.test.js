import { describe, expect, test } from "vitest";
import TaskStatusTool from "../../src/utils/TaskStatus.Tool";


describe("Tests of the Task Status conversion tool", () => {
    describe("Tests of the Status code to text function", () => {
        test("Should return 'Pending' to a status of 1", () => {
            //arrange
            const statusTestCode = 1

            //act
            const response = TaskStatusTool.StatusToText(statusTestCode);

            //assert
            expect(response).to.equal("Pending");
        });

        test("Should return 'In Progress' to a status code of 2", () => {
            //arrange
            const statusTestCode = 2

            //act
            const response = TaskStatusTool.StatusToText(statusTestCode);

            //assert
            expect(response).to.equal("In Progress");
        })

        test("Should return 'Completed' to a status code of 3", () => {
            //arrange
            const statusTestCode = 3

            //act
            const response = TaskStatusTool.StatusToText(statusTestCode);

            //assert
            expect(response).to.equal("Completed");
        })

        test("Should return 'Unknown' to other status codes", () => {
            //arrange
            const statusTestCode = 4

            //act
            const response = TaskStatusTool.StatusToText(statusTestCode);

            //assert
            expect(response).to.equal("Unknown");
        })

        test("Should return 'Unknown' to invalid status codes", () => {
            //arrange
            const statusTestCode = "invalid"

            //act
            const response = TaskStatusTool.StatusToText(statusTestCode);

            //assert
            expect(response).to.equal("Unknown");
        })
    });

    describe("Tests of the status code to badge style function", () => {
        test("Should return 'Warning' to status code 1", () => {
            //arrange
            const statusTestCode = 1

            //act
            const response = TaskStatusTool.StatusToBadgeStyle(statusTestCode);

            //assert
            expect(response).to.equal("warning");
        })
    })
})
