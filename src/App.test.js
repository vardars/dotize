import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Dotize Online/i);
  expect(linkElement).toBeInTheDocument();
});
