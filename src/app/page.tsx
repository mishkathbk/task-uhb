import { Api } from '@/api/Api';
import React from 'react'
import Table from './_components/Table';
import { TData } from '@/api/type';
import FilterForm from './_components/FilterForm';
import Pagination from './_components/Pagination';

const getApi = async ({
  search = ""
}): Promise<TData[]> => {
  const response = await Api.getData();
  let data: TData[] = response?.data || [];
  if (search) {
    data = data.filter(
      item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.body.toLowerCase().includes(search.toLowerCase())
    );
  }
  return data;
};

const Page = async ({ searchParams }: { searchParams: Promise<{ page: string, search: string }> }) => {
  const page = Number((await searchParams).page) || 1;
  const search = (await searchParams).search || "";

  const filteredData = await getApi({
    search,
  });

  return (
    <div className='flex justify-center w-full px-[0.5rem] md:px-[1rem] lg:px-[4rem] min-h-screen'>
      <div className="w-full max-w-5xl mx-auto py-8 px-2 sm:px-4">
        <FilterForm search={search} />
        <Table page={Number(page)} filteredData={filteredData} />
        <Pagination page={Number(page)} filteredDataLength={filteredData.length} />
      </div>
    </div>
  )
}

export default Page