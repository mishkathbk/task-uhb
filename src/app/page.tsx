import { Api } from '@/api/Api';
import React from 'react'
import Table from './components/Table';
import { TData } from '@/api/type';

const getApi = async (): Promise<TData[]> => {
  const response = await Api.getData();
  return response?.data;
};
const Page = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
  const response = await getApi();
  const page = (await searchParams).page || 1;
  return (
    <div className='flex justify-center w-full px-[0.5rem] md:px-[1rem] lg:px-[4rem] min-h-screen'>
      <Table response={response} page={Number(page)} />
    </div>
  )
}

export default Page