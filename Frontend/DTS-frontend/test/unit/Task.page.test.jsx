import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, vi } from 'vitest';

import Task from '../../src/pages/Task';
import {tasks} from '../data/data.json';

const mockNewTask = vi.fn().mockResolvedValue({});
const mockUpdateTask = vi.fn().mockResolvedValue({});
const mockDeleteTask = vi.fn().mockResolvedValue({});
    
    vi.mock('../../src/services/Tasks.Services', () => {
        return {
            default: vi.fn().mockImplementation(() => ({
                newTask: mockNewTask,
                updateTask: mockUpdateTask,
                deleteTask: mockDeleteTask,
            })),
        }
    });

describe('Task Page Tests', () => {    

    const mockGetTasks = vi.fn();
    const mockSetShow = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders form field with default values for new task', () => {
        //Act
        render(<Task task={null} setShow={mockSetShow} getTasks={mockGetTasks} />);

        //Assert
        expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Task Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Due Date & Time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Task Status/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /save/i })).toBeDisabled(); //confirm the save button is visible, but disabled
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument(); //confirm the delete button is not visible
    });

    test('allows submitting a new task', async () => {
        //Act
        render(<Task task={null} setShow={mockSetShow} getTasks={mockGetTasks} />);

        fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'Test Task' } });
        fireEvent.change(screen.getByLabelText(/Due Date & Time/i), { target: { value: '2025-12-08T12:00' } });

        const saveButton = screen.getByRole('button', { name: /save/i });
        expect(saveButton).toBeEnabled();

        fireEvent.click(saveButton);

        //Assert
        await waitFor(() => {
            expect(mockNewTask).toHaveBeenCalled();
            expect(mockGetTasks).toHaveBeenCalledWith(true);
            expect(mockSetShow).toHaveBeenCalledWith(false);
        });
    });

    test('default due date is set to tomorrow', () => {
        //Arrange
        render(<Task task={null} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const dueDateInput = screen.getByLabelText(/Due Date & Time/i);
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(12, 0, 0, 0);

        const expectedValue = tomorrow.toISOString().slice(0, 16);

        //Assert
        expect(dueDateInput.value).toBe(expectedValue);
    })

    test('task pages displays a task when one is passed in', () => {
        //Arrange
        const mockTask = tasks[0];

        const expectedDescription = mockTask.taskDescription;
        const expectedDate = mockTask.taskDueDate.slice(0, 16);
        const expectedStatus = mockTask.taskStatus;
        const expectedTitle = mockTask.taskTitle;

        //Act
        render(<Task task={mockTask} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const descriptionBox = screen.getByLabelText(/Task Description/i);
        const dueDateBox = screen.getByLabelText(/Due Date & Time/i);
        const statusBox = screen.getByLabelText(/Task Status/i);
        const titleBox = screen.getByLabelText(/Task Title/i);

        const deleteButton = screen.queryByRole('button', { name: /delete/i });
        const saveButton = screen.queryByRole('button', { name: /save/i })

        //Assert
        expect(descriptionBox).toHaveValue(expectedDescription);
        expect(dueDateBox).toHaveValue(expectedDate);
        expect(statusBox).toHaveValue(expectedStatus.toString());
        expect(titleBox).toHaveValue(expectedTitle);

        expect(deleteButton).toBeInTheDocument(); //confirm the delete button is visible, but disabled
        expect(deleteButton).toBeDisabled();
        expect(saveButton).toBeEnabled(); //confirm the save button is enabled.
    })

    test("task page doesn't respond to save attempts when no data is changed", async () => {

        //Arrange
        const mockTask = tasks[0];

        const expectedDescription = mockTask.taskDescription;
        const expectedDate = mockTask.taskDueDate.slice(0, 16);
        const expectedStatus = mockTask.taskStatus;
        const expectedTitle = mockTask.taskTitle;

        //Act
        render(<Task task={mockTask} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const saveButton = screen.queryByRole('button', { name: /save/i })

        await waitFor(()=>fireEvent.click(saveButton));

        //Assert        

        expect(mockUpdateTask).not.toHaveBeenCalled();
        expect(mockGetTasks).not.toHaveBeenCalled();
        expect(mockSetShow).not.toHaveBeenCalled(); 
    });

    test("task page does respond to save attempts when data is changed", async () => {
        //Arrange
        const mockTask = tasks[0];

        const expectedDescription = mockTask.taskDescription;
        const expectedDate = mockTask.taskDueDate.slice(0, 16);
        const expectedStatus = mockTask.taskStatus;
        const expectedTitle = mockTask.taskTitle;

        

        //Act
        render(<Task task={mockTask} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const descriptionBox = screen.getByLabelText(/Task Description/i);
        await userEvent.type(descriptionBox, 'The Task description has been changed');

        const statusBox = screen.getByLabelText(/Task Status/i);
        await userEvent.selectOptions(statusBox, '3');

        const saveButton = screen.queryByRole('button', { name: /save/i })

        await waitFor(()=>userEvent.click(saveButton));

        //Assert        

        expect(mockUpdateTask).toHaveBeenCalled();
        expect(mockGetTasks).toHaveBeenCalledWith(false);
        expect(mockSetShow).toHaveBeenCalledWith(false); 
    });

    test("shows error message when newTask fails", async () => {
        //Arrange
        mockNewTask.mockResolvedValue({ error: "Failed to create task" });

        //Act
        render(<Task task={null} setShow={mockSetShow} getTasks={mockGetTasks} />);

        //Assert
        const titleInput = screen.getByLabelText(/Task Title/i);
        await userEvent.type(titleInput, "Some Task");

        const saveButton = screen.getByRole("button", { name: /save/i });
        await userEvent.click(saveButton);

        expect(screen.getByText(/Failed to create task/i)).toBeInTheDocument();
        expect(mockSetShow).not.toHaveBeenCalled();
        expect(mockGetTasks).not.toHaveBeenCalled();
    });

    test("shows error message when updateTask fails", async () => {
        //Arrange
        const mockTask = tasks[0];              

        mockUpdateTask.mockResolvedValue({ error: "Failed to update task" });
        
        //Act

        render(<Task task={mockTask} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const titleInput = screen.getByLabelText(/Task Title/i);
        await userEvent.type(titleInput, "Some Task");

        const saveButton = screen.getByRole("button", { name: /save/i });
        await userEvent.click(saveButton);

        expect(screen.getByText(/Failed to update task/i)).toBeInTheDocument();
        expect(mockSetShow).not.toHaveBeenCalled();
        expect(mockGetTasks).not.toHaveBeenCalled();
    });

    test("clicking the switch enables the delete button", async () => {
        //Arrange
        const mockTask = tasks[0];                      
        
        //Act

        render(<Task task={mockTask} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const deleteButton = screen.queryByRole('button', { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toBeDisabled();

        const deleteSwitch = screen.getByTestId('delete-switch');
        await userEvent.click(deleteSwitch);

        expect(deleteButton).toBeEnabled();
        
    });

    test("clicking the switch again disables the delete button", async () => {
        //Arrange
        const mockTask = tasks[0];                      
        
        //Act

        render(<Task task={mockTask} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const deleteButton = screen.queryByRole('button', { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toBeDisabled();

        const deleteSwitch = screen.getByTestId('delete-switch');
        await userEvent.click(deleteSwitch);

        expect(deleteButton).toBeEnabled();
        await userEvent.click(deleteSwitch);
        expect(deleteButton).toBeDisabled();
        
    });

    test("clicking the enabled delete button calls the delete function", async () => {
        //Arrange
        const mockTask = tasks[0];                      
        
        //Act

        render(<Task task={mockTask} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const deleteButton = screen.queryByRole('button', { name: /delete/i });      

        const deleteSwitch = screen.getByTestId('delete-switch');
        await userEvent.click(deleteSwitch);
        expect(deleteButton).toBeEnabled();

        await userEvent.click(deleteButton);

        expect(mockDeleteTask).toHaveBeenCalled();
        expect(mockGetTasks).toHaveBeenCalled();
        expect(mockSetShow).toHaveBeenCalledWith(false);         
    });

    test("clicking the enabled delete button will display an error", async () => {
        //Arrange
        const mockTask = tasks[0];   
        
        mockDeleteTask.mockResolvedValue({ error: "Failed to update task" });
        
        //Act

        render(<Task task={mockTask} setShow={mockSetShow} getTasks={mockGetTasks} />);

        const deleteButton = screen.queryByRole('button', { name: /delete/i });      

        const deleteSwitch = screen.getByTestId('delete-switch');
        await userEvent.click(deleteSwitch);
        expect(deleteButton).toBeEnabled();

        await userEvent.click(deleteButton);

        expect(screen.getByText(/Failed to update task/i)).toBeInTheDocument();
        expect(mockDeleteTask).toHaveBeenCalled();
        expect(mockGetTasks).not.toHaveBeenCalled();
        expect(mockSetShow).not.toHaveBeenCalled();        
    });




    
})