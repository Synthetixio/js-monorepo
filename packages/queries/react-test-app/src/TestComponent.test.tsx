import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestComponent from './TestComponent';

test('renders the right text before and after a click', () => {
	render(<TestComponent />);
	const textElement = screen.getByText(/NetworkId is 42/i);
	expect(textElement).toBeInTheDocument();
	fireEvent.click(screen.getByRole('button'));
	const updatedTextElement = screen.getByText(/NetworkId is 1/i);
	expect(updatedTextElement).toBeInTheDocument();
});
