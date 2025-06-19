"use client"
import { TData } from '@/api/type'
import React, { useState, useMemo } from 'react'

type Props = {
    response: TData[]
}

const ITEMS_PER_PAGE = 10;

const Table = ({ response }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');

    const filteredData = useMemo(() => {
        if (!filter) return response;
        return response.filter(
            (item) =>
                item.title.toLowerCase().includes(filter.toLowerCase()) ||
                item.body.toLowerCase().includes(filter.toLowerCase())
        );
    }, [filter, response]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    // Reset to first page when filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    // Dynamic pagination logic
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="w-full  mx-auto py-[2rem]">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filter by title or body..."
                    className="py-[0.5rem] px-[0.5rem] rounded-sm text-[0.9rem]  w-[50%] bg-gray-50 text-black outline-none focus:ring-0"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-800">
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Title</th>
                            <th>Body</th>
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
                                <tr key={item.id} className='text-black border-b border-gray-200 hover:bg-gray-50 transition-colors '>
                                    <td className='font-medium '>{item.id}</td>
                                    <td>{item.userId}</td>
                                    <td className="">{item.title}</td>
                                    <td>{item.body}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6">
                <nav className="inline-flex items-center gap-1 rounded-lg  px-3 py-2 shadow-sm border ">
                    <button
                        className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-blue-100 text-black'
                            }`}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        &#8592; Prev
                    </button>
                    {getPageNumbers().map((page, idx) =>
                        page === '...' ? (
                            <span
                                key={idx}
                                className="px-3 py-1 text-gray-500 select-none"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={idx}
                                className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-colors ${currentPage === page
                                    ? 'bg-white text-blue-600 shadow'
                                    : 'hover:bg-blue-100 text-black'
                                    }`}
                                onClick={() => setCurrentPage(Number(page))}
                            >
                                {page}
                            </button>
                        )
                    )}
                    <button
                        className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${currentPage === totalPages || totalPages === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-blue-100 text-black'
                            }`}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next &#8594;
                    </button>
                </nav>
            </div>
            <div className="flex justify-center mt-2 text-gray-500 text-sm">
                Page <span className="font-semibold text-blue-600 mx-1">{currentPage}</span> of <span className="font-semibold text-blue-600 mx-1">{totalPages}</span>
            </div>
        </div>
    )
}
export default Table;