"use client";

import { TData } from '@/api/type'
import React from 'react'

type Props = {
    filteredData: TData[]
    page: number
}

const ITEMS_PER_PAGE = 10;

const Table = ({ filteredData, page }: Props) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(start, start + ITEMS_PER_PAGE);
    return (
        <div>
            <div className="overflow-x-auto rounded-lg border bg-white">
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

        </div>
    )
}
export default Table;