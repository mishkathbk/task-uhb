import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '../app/components/Pagination';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
describe('Pagination', () => {
  it('renders Prev and Next buttons', () => {
    render(<Pagination page={1} totalPages={5} />);
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('disables Prev on first page', () => {
    render(<Pagination page={1} totalPages={5} />);
    expect(screen.getByText(/Prev/i)).toBeDisabled();
  });

  it('disables Next on last page', () => {
    render(<Pagination page={5} totalPages={5} />);
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });
});