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
    
});