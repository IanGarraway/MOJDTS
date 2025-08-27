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
        mockGetAll.mockResolvedValue({});

        //Act
        render(<Tasks />);

        //Assert
        expect(await screen.findByText(/No tasks found/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /New Task/i })).toBeInTheDocument();        
    })

});