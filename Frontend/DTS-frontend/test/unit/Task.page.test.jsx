import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import Task from '../../src/pages/Task';
//import TasksService from '../../src/services/Tasks.Services';
import { beforeEach, expect, vi } from 'vitest';

const mockNewTask = vi.fn().mockResolvedValue({});
    
    vi.mock('../../src/services/Tasks.Services', () => {
        return {
            default: vi.fn().mockImplementation(() => ({
                newTask: mockNewTask,
            })),
        }
    });

describe('Task Component', () => {    

    const mockGetTasks = vi.fn();
    const mockSetShow = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders form field with default values for new task', () => {
        render(<Task task={null} setShow={mockSetShow} getTasks={mockGetTasks} />);

        expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Task Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Due Date & Time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Task Status/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /save/i })).toBeDisabled(); //confirm the save button is visible, but disabled
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument(); //confirm the delete button is not visible
    });

    test('allows submitting a new task', async () => {
        render(<Task task={null} setShow={mockSetShow} getTasks={mockGetTasks} />);

        fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'Test Task' } });
        fireEvent.change(screen.getByLabelText(/Due Date & Time/i), { target: { value: '2025-12-08T12:00' } });

        const saveButton = screen.getByRole('button', { name: /save/i });
        expect(saveButton).toBeEnabled();

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockNewTask).toHaveBeenCalled();
            expect(mockGetTasks).toHaveBeenCalledWith(true);
            expect(mockSetShow).toHaveBeenCalledWith(false);
        });
    })
})