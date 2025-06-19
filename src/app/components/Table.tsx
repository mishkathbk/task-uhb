"use client";

import { TData } from '@/api/type'
import React, { useState, useMemo } from 'react'
import FilterForm from './FilterForm'
import Pagination from './Pagination'

type Props = {
    response: TData[]
    page: number
}

const ITEMS_PER_PAGE = 10;

const Table = ({ response, page }: Props) => {
    const [filters, setFilters] = useState({ search: '', userId: '' });
    const filteredData = useMemo(() => {
        let data = response;
        if (filters.userId) {
            data = data.filter(item => String(item.userId) === filters.userId);
        }
        if (filters.search) {
            data = data.filter(
                item =>
                    item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                    item.body.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        return data;
    }, [filters, response]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    // useEffect(() => {
    //     router.replace(`?page=1`);
    // }, [filters, router]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredData, page]);

    // useEffect(() => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // }, [page]);


    return (
        <div className="w-full max-w-5xl mx-auto py-8 px-2 sm:px-4">
            <FilterForm response={response} setFilters={setFilters} />
            <div className="overflow-x-auto rounded-lg shadow bg-white">
                <table className="min-w-full border border-gray-200 rounded-lg text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-black">
                            <th className="px-2 py-3 sm:px-4 sm:py-4 text-[0.9rem]">ID</th>
                            <th className="px-2 py-3 sm:px-4 sm:py-4 text-[0.9rem]">User ID</th>
                            <th className="px-2 py-3 sm:px-4 sm:py-4 text-[0.9rem]">Title</th>
                            <th className="px-2 py-3 sm:px-4 sm:py-4 text-[0.9rem]">Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-black">
                                    No data found.
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-100 transition text-black">
                                    <td className="px-2 py-3 sm:px-4 sm:py-4 text-[0.9rem]">{item.id}</td>
                                    <td className="px-2 py-3 sm:px-4 sm:py-4 text-[0.9rem]">{item.userId}</td>
                                    <td className="px-2 py-3 sm:px-4 sm:py-4 text-[0.9rem] break-words max-w-xs">{item.title}</td>
                                    <td className="px-2 py-3 sm:px-4 sm:py-4 text-[0.9rem] break-words max-w-xs">{item.body}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6">
                <Pagination page={page} totalPages={totalPages} />
            </div>
            <div className="flex justify-center mt-2 text-gray-500 text-xs sm:text-sm">
                Page <span className="font-semibold text-blue-600 mx-1">{page}</span> of <span className="font-semibold text-blue-600 mx-1">{totalPages}</span>
            </div>
        </div>
    )
}
export default Table;