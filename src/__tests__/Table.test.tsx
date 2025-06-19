import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../app/components/Table';

const mockData = [
    {
        userId: 1,
        id: 1,
        title: 'Test Title 1',
        body: 'Test Body 1',
    },
    {
        userId: 2,
        id: 2,
        title: 'Test Title 2',
        body: 'Test Body 2',
    },
];

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

describe('Table', () => {
    it('renders table headers', () => {
        render(<Table response={mockData} page={1} />);
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('User ID')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Body')).toBeInTheDocument();
    });

    it('renders table data', () => {
        render(<Table response={mockData} page={1} />);
        expect(screen.getByText('Test Title 1')).toBeInTheDocument();
        expect(screen.getByText('Test Body 2')).toBeInTheDocument();
    });

    it('shows "No data found." when no data', () => {
        render(<Table response={[]} page={1} />);
        expect(screen.getByText('No data found.')).toBeInTheDocument();
    });
});