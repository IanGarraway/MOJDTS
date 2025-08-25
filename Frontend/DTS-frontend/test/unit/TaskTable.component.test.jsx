import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { tasks } from '../data/data.json';

import TaskTable from '../../src/components/TaskTable'

const mockSetTask = vi.fn().mockResolvedValue({});
const mockSetShow = vi.fn().mockResolvedValue({});
const mockNewTaskCreated = vi.fn().mockResolvedValue({});



describe('Tests of the TaskTable component', () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('that an empty array returns no task found', () => {
        //Arrange
        const mockData = {};

        //Act
        render(<TaskTable tasks={mockData} setTask={mockSetTask} setShow={mockSetShow} newTaskCreated={mockNewTaskCreated} />);

        //Assert
        expect(screen.getByText(/No tasks found/i)).toBeInTheDocument();
    })


})