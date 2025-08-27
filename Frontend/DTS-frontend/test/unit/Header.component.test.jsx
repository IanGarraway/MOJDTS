import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import Header from '../../src/components/Header.jsx';

describe('Tests of the Header component of the Tasks.jsx page', () => {

    test("renders the correct titles", () => {
        // Act
        render(<Header />);

        // Assert
        expect(screen.getByText("HMCTS Caseworker")).toBeInTheDocument();
        expect(screen.getByText("Task Manager")).toBeInTheDocument();
    });

});