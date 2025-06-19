import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterForm from '../app/_components/FilterForm';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
}));
describe('FilterForm', () => {
    it('renders search input', () => {
        render(<FilterForm search={''} />);
        expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();
    });

});