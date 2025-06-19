import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Pagination from '../app/_components/Pagination';

describe('Pagination', () => {
  it('renders Prev and Next buttons', () => {
    render(<Pagination filteredDataLength={50} page={1} />);
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('disables Prev on first page', () => {
    render(<Pagination filteredDataLength={50} page={1} />);
    const prev = screen.getByText(/Prev/i);
    expect(prev).toHaveAttribute('aria-disabled', 'true');
    expect(prev.className).toMatch(/pointer-events-none/);
  });

  it('disables Next on last page', () => {
    render(<Pagination filteredDataLength={50} page={5} />);
    const next = screen.getByText(/Next/i);
    expect(next).toHaveAttribute('aria-disabled', 'true');
    expect(next.className).toMatch(/pointer-events-none/);
  });

  it('renders correct page numbers', () => {
    render(<Pagination filteredDataLength={50} page={3} />);
    const nav = screen.getByRole('navigation');
    expect(within(nav).getByText('1')).toBeInTheDocument();
    expect(within(nav).getByText('2')).toBeInTheDocument();
    expect(within(nav).getByText('3')).toBeInTheDocument();
    expect(within(nav).getByText('4')).toBeInTheDocument();
    expect(within(nav).getByText('5')).toBeInTheDocument();
  });

});