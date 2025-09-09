import { beforeEach, describe, expect, test } from "vitest";

import FilterTools from "../../src/utils/Filter.Tools";

import {tasks} from '../data/data.json';

describe('Tests of the Filter Tools', () => {
    test('That it will return all of the data', () => {
        //Arrange
        const mockTasks = tasks;
        const mockFilter = new Set([1, 2, 3]);

        //Act
        const result = FilterTools.filterByStatus(mockTasks, mockFilter);        

        //Assert
        expect(result).toEqual(mockTasks);
    });

    test('That it will return tasks with status 1', () => {
        //Arrange
        const mockTasks = tasks;
        const mockFilter = new Set([1]);

        //Act
        const result = FilterTools.filterByStatus(mockTasks, mockFilter);        

        //Assert
        expect(result).toHaveLength(1);
    })

    test('That it returns only tasks with status 2 or 3', () => {
        //Arrange
        const mockTasks = tasks;
        const mockFilter = new Set([2,3]);

        //Act
        const result = FilterTools.filterByStatus(mockTasks, mockFilter);        

        //Assert
        expect(result).toHaveLength(2);
    })
    test('That it will return only tasks with status 3', () => {
        //Arrange
        const mockTasks = tasks;
        const mockFilter = new Set([3]);

        //Act
        const result = FilterTools.filterByStatus(mockTasks, mockFilter);        

        //Assert
        expect(result[0]).toEqual(mockTasks[0]);
    })
    
});
describe('FilterTools.filterByStatus - dynamic tests', () => {

    const statusSets = [
        { filter: new Set([1]), expectedStatuses: [1] },
        { filter: new Set([2]), expectedStatuses: [2] },
        { filter: new Set([3]), expectedStatuses: [3] },
        { filter: new Set([1,2]), expectedStatuses: [1,2] },
        { filter: new Set([2,3]), expectedStatuses: [2,3] },
        { filter: new Set([1,2,3]), expectedStatuses: [1,2,3] },
    ];

    statusSets.forEach(({ filter, expectedStatuses }) => {
        test(`returns tasks with statuses ${Array.from(filter).join(', ')}`, () => {
            const result = FilterTools.filterByStatus(tasks, filter);

            // Check all returned tasks have a valid status
            expect(result.every(task => expectedStatuses.includes(task.taskStatus))).toBe(true);

            // Optionally check the count matches expected count based on tasks data
            const expectedCount = tasks.filter(task => expectedStatuses.includes(task.taskStatus)).length;
            expect(result).toHaveLength(expectedCount);
        });
    });

});
