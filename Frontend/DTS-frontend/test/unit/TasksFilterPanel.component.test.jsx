import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import TasksFilterPanel from '../../src/components/TasksFilterPanel';

describe('TasksFilterPanel', () => {
    it('renders all status checkboxes', () => {
        //Arrange
        const mockSet = new Set();

        //Act
        render(<TasksFilterPanel activeStatuses={mockSet} setActiveStatuses={() => { }} />);

        //Assert
        expect(screen.getByLabelText('Pending')).toBeInTheDocument();
        expect(screen.getByLabelText('In Progress')).toBeInTheDocument();
        expect(screen.getByLabelText('Completed')).toBeInTheDocument();
    });

    it('checks checkboxes based on activeStatuses', () => {
        const activeStatuses = new Set([1, 3]);
        render(<TasksFilterPanel activeStatuses={activeStatuses} setActiveStatuses={() => { }} />);

        expect(screen.getByLabelText('Pending')).toBeChecked();
        expect(screen.getByLabelText('In Progress')).not.toBeChecked();
        expect(screen.getByLabelText('Completed')).toBeChecked();
    });

    it('calls setActiveStatuses with correct value when toggled', () => {
        const activeStatuses = new Set([1]);
        const mockSetActive = vi.fn();

        render(<TasksFilterPanel activeStatuses={activeStatuses} setActiveStatuses={mockSetActive} />);

        // Toggle "Pending" off
        fireEvent.click(screen.getByLabelText('Pending'));
        expect(mockSetActive).toHaveBeenCalledTimes(1);

        // Toggle "In Progress" on
        fireEvent.click(screen.getByLabelText('In Progress'));
        expect(mockSetActive).toHaveBeenCalledTimes(2);
    });
});