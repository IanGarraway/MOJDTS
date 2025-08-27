import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, vi } from 'vitest';

import {Tasks} from '../../src/pages/Tasks';
import {tasks} from '../data/data.json';

const mockGetAll = vi.fn().mockResolvedValue({});
    
    vi.mock('../../src/services/Tasks.Services', () => {
        return {
            default: vi.fn().mockImplementation(() => ({
                getAll: mockGetAll,                
            })),
        }
    });

describe('Tasks Page Tests', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('That the tasks page render No tasks found when an empty array is passed in', async () => {
        //Arrange
        mockGetAll.mockResolvedValue([]);

        //Act
        render(<Tasks />);

        //Assert
        expect(await screen.findByText(/No tasks found/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /New Task/i })).toBeInTheDocument();        
    })

    test('That clicking the new tasks button will open a blank task screen', async () => {
        //Arrange
        mockGetAll.mockResolvedValue([]);

        //Act
        render(<Tasks />);
        expect(screen.queryByRole('button', { name: /Save/i })).not.toBeInTheDocument();

        const newTaskButton = screen.getByRole('button', { name: /New Task/i });
        await userEvent.click(newTaskButton);

        //Assert

        expect(await screen.findByRole('button', { name: /Save/i })).toBeInTheDocument();

        const titleInput = screen.getByLabelText(/title/i); //also confirming that the title and description are blank
        expect(titleInput).toHaveValue('');
        const descriptionInput = screen.getByLabelText(/description/i);
        expect(descriptionInput).toHaveValue('');
    });

    test('that the page renders with 3 tasks when an array of 3 tasks is passed in', async () => {
        //Arrange
        mockGetAll.mockResolvedValue(tasks);

        //Act
        render(<Tasks />);

        const displayTasks = await screen.findAllByTestId('task-card');

        //Assert
        expect(displayTasks).toHaveLength(3);
    })

});