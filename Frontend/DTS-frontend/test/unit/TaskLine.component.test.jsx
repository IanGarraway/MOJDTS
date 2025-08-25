import { render, screen } from '@testing-library/react';
import { beforeEach, expect, vi } from 'vitest';

import { tasks } from '../data/data.json';

import {TaskLine} from '../../src/components/TaskLine';

const mockSetTask = vi.fn().mockResolvedValue({});
const mockSetShow = vi.fn().mockResolvedValue({});


describe('Tests of the TaskLine component of the Tasks.jsx page', () => {
    
    test('Test that the TaskLine component displays a task', () => {
        //Arrange
        const mockTask = tasks[0];

        const expectedDueDate = new Date(mockTask.taskDueDate).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        const expectedStatusText = "Completed";
        const expectedStatusBadge = "success";


        //Act
        render(<TaskLine task={mockTask} setTask={mockSetTask} setShow={mockSetShow} />);

        const badge = screen.getByText(expectedStatusText);

        //Assert
        expect(screen.getByText(mockTask.taskTitle)).toBeInTheDocument();
        expect(screen.getByText(mockTask.taskDescription)).toBeInTheDocument();
        expect(screen.getByText(`Due: ${expectedDueDate}`)).toBeInTheDocument();
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass(`bg-${expectedStatusBadge}`);
    });

    test('Test that the a status 2 task will display the correct badge', () => {
        //Arrange
        const mockTask = tasks[2];

        const expectedStatusText = "In Progress";
        const expectedStatusBadge = "primary";


        //Act
        render(<TaskLine task={mockTask} setTask={mockSetTask} setShow={mockSetShow} />);

        const badge = screen.getByText(expectedStatusText);

        //Assert        
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass(`bg-${expectedStatusBadge}`);
    });

    test('Test that the a status 2 task will display the correct badge', () => {
        //Arrange
        const mockTask = tasks[1];

        const expectedStatusText = "Pending";
        const expectedStatusBadge = "warning";


        //Act
        render(<TaskLine task={mockTask} setTask={mockSetTask} setShow={mockSetShow} />);

        const badge = screen.getByText(expectedStatusText);

        //Assert        
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass(`bg-${expectedStatusBadge}`);
    });

    test('Test that a due date in the past is displayed in red', () => {
        //Arrange
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const mockTask = { ...tasks[1], taskDueDate: yesterday.toISOString() }
        

        const expectedDate = yesterday.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        
        //Act
        render(<TaskLine task={mockTask} setTask={mockSetTask} setShow={mockSetShow} />);

        const dueDateElement = screen.getByText(`Due: ${expectedDate}`);

        //Assert
        expect(dueDateElement).toHaveStyle({ color: "rgb(163, 13, 13)" });
    });

    
})