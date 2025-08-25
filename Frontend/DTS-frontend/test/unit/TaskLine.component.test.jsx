import { render, screen } from '@testing-library/react';
import { beforeEach, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { tasks } from '../data/data.json';

import {TaskLine} from '../../src/components/TaskLine';

const mockSetTask = vi.fn().mockResolvedValue({});
const mockSetShow = vi.fn().mockResolvedValue({});


describe('Tests of the TaskLine component of the Tasks.jsx page', () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
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

    test('Test that the a status 1 - in progress task will display the correct badge', () => {
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

    test('Test that the a status 2 - pending task will display the correct badge', () => {
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
        expect(dueDateElement).toHaveStyle({ color: "#a30d0dff" });
    });

    test('Test that a completed task, with a due date in the past is displayed in grey', () => {
        //Arrange
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const mockTask = { ...tasks[0], taskDueDate: yesterday.toISOString() }
        

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
        expect(dueDateElement).toHaveStyle({ color: "#555" });
    });

    test('Test that a task, with a due date in the future is displayed in grey', () => {
        //Arrange
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const mockTask = { ...tasks[0], taskDueDate: tomorrow.toISOString() }
        

        const expectedDate = tomorrow.toLocaleDateString('en-GB', {
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
        expect(dueDateElement).toHaveStyle({ color: "#555" });
    });

    test('Test that clicking on a task will trigger setTask and setShow functions', async () => {
        //Arrange
        const mockTask = tasks[0];

        //Act
        render(<TaskLine task={mockTask} setTask={mockSetTask} setShow={mockSetShow} />);

        const taskCard = screen.getByText(mockTask.taskTitle);

        await userEvent.click(taskCard);

        //Assert
        expect(mockSetTask).toHaveBeenCalledWith(mockTask);
        expect(mockSetShow).toHaveBeenCalledWith(true);        
    })    
})