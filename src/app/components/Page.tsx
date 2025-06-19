// import React from 'react';
// import { render } from '@testing-library/react';
// import * as ApiModule from '@/api/Api';
// import Page from '@/app/page';

// // Mock Table to just show its props for test
// // eslint-disable-next-line react/display-name
// jest.mock('../app/components/Table', () => (props: unknown) => (
//     <div data-testid="table-props">{JSON.stringify(props)}</div>
// ));

// // Mock API call
// const mockData = [
//     { userId: 1, id: 1, title: 'Test', body: 'Body' }
// ];

// // Directly mock getData on the Api object
// (ApiModule.Api.getData as jest.Mock) = jest.fn().mockResolvedValue({ data: mockData });

// describe('Page', () => {
//     it('renders Table with correct page from searchParams', async () => {
//         const searchParams = Promise.resolve({ page: '3' });
//         const { findByTestId } =  render( <Page searchParams={searchParams} />);
//         const tableProps = await findByTestId('table-props');
//         expect(tableProps.textContent).toContain('"page":3');
//         expect(tableProps.textContent).toContain('"response":[{"userId":1,"id":1,"title":"Test","body":"Body"}]');
//     });

//     it('defaults to page 1 if searchParams.page is missing', async () => {
//         const searchParams = Promise.resolve({ page: '' });
//         const { findByTestId } = render( <Page searchParams={searchParams} />);
//         const tableProps = await findByTestId('table-props');
//         expect(tableProps.textContent).toContain('"page":1');
//     });
// });