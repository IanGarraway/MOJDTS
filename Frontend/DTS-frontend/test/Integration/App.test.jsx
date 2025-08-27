import { render, screen } from '@testing-library/react';
import App from '../../src/App';


describe('Tests of app.jsx', () => {
    test('App renders Header and Tasks components', () => {
        //Act
        render(<App />);

        //Assert
        expect(screen.getByText(/HMCTS Caseworker/i)).toBeInTheDocument(); // Header text
        expect(screen.getByText(/New Task/i)).toBeInTheDocument(); // Task button from Tasks page
    });
});