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

