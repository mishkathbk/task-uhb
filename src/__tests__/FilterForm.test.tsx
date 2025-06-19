import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterForm from '../app/components/FilterForm';

const mockData = [
    { userId: 1, id: 1, title: 'A', body: 'B' },
    { userId: 2, id: 2, title: 'C', body: 'D' },
];
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
}));
describe('FilterForm', () => {
    it('renders user id dropdown and search input', () => {
        render(<FilterForm response={mockData} setFilters={jest.fn()} />);
        expect(screen.getByLabelText(/User ID/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();
    });

    it('calls setFilters on submit', () => {
        const setFilters = jest.fn();
        render(<FilterForm response={mockData} setFilters={setFilters} />);
        fireEvent.change(screen.getByLabelText(/Search/i), { target: { value: 'test' } });
        fireEvent.click(screen.getByText(/Apply/i));
        expect(setFilters).toHaveBeenCalled();
    });
});