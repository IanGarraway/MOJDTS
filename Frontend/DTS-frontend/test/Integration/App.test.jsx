import { render, screen } from '@testing-library/react';
import App from '../../src/App';

test('App renders Header and Tasks components', () => {
  render(<App />);

  expect(screen.getByText(/HMCTS Caseworker/i)).toBeInTheDocument(); // Header text
  expect(screen.getByText(/New Task/i)).toBeInTheDocument(); // Task button from Tasks page
});