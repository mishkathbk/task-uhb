import { Api } from '@/api/Api';
import React from 'react'
import Table from './components/Table';
import { TData } from '@/api/type';

const getApi = async (): Promise<TData[]> => {
  const response = await Api.getData();
  return response?.data;
};
const Page = async () => {
  const response = await getApi();
  return (
    <div className='flex justify-center w-full px-[0.5rem] md:px-[1rem] lg:px-[4rem] min-h-screen'>
      <Table response={response} />
    </div>
  )
}

export default Page