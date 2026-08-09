import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('shows a validation message when display name is too short', () => {
    render(<App />);

    const input = screen.getByLabelText(/Display name/i);
    fireEvent.change(input, { target: { value: 'Jo' } });

    const saveButton = screen.getByRole('button', { name: /Save settings/i });
    fireEvent.click(saveButton);

    expect(screen.getByText(/Display name must be at least 3 characters./i)).toBeInTheDocument();
  });

  it('shows success message when form is valid', () => {
    render(<App />);

    const input = screen.getByLabelText(/Display name/i);
    fireEvent.change(input, { target: { value: 'Jane Doe' } });

    const saveButton = screen.getByRole('button', { name: /Save settings/i });
    fireEvent.click(saveButton);

    expect(screen.getByText(/Settings saved successfully!/i)).toBeInTheDocument();
  });
});
