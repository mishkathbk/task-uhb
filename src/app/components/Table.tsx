"use client"
import { TData } from '@/api/type'
import React, { useState, useMemo, useEffect } from 'react'

type Props = {
    response: TData[]
}

const ITEMS_PER_PAGE = 10;

const Table = ({ response }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [userId, setUserId] = useState('');
    const [filters, setFilters] = useState({ search: '', userId: '' });

    const userIds = useMemo(
        () => Array.from(new Set(response.map(item => item.userId))),
        [response]
    );

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

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);
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

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ search, userId });
    };

    const handleClear = () => {
        setSearch('');
        setUserId('');
        setFilters({ search: '', userId: '' });
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-8 px-2 sm:px-4">
            <form
                className="mb-4 flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4"
                onSubmit={handleFilter}
            >
                <div className="flex flex-col w-full sm:w-1/4">
                    <label className="mb-1 text-sm font-medium text-gray-700">User ID</label>
                    <select
                        className="bg-gray-50 py-[0.6rem] text-[0.9rem] rounded-sm px-2 !text-black outline-none"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                    >
                        <option value="border-0 ">All</option>
                        {userIds.map(id => (
                            <option key={id} value={id}>{id}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                    <label className="mb-1 text-sm font-medium text-gray-700">Search</label>
                    <input
                        type="text"
                        placeholder="Filter by title or body..."
                        className="bg-gray-50 text-[0.9rem] py-[0.5rem] rounded-sm px-2 !text-black outline-none"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Apply
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline text-red-500 bg-white hover:bg-red-500 hover:text-white border-red-500 hover:border-transparent"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>
            </form>
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
                                <td colSpan={4} className="text-center py-4">
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
                <nav className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-white px-2 py-2 shadow border border-gray-200">
                    <button
                        className={`px-2 sm:px-3 py-1 rounded-md font-medium transition-colors ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-blue-100 text-blue-600'
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
                                className="px-2 sm:px-3 py-1 text-gray-400 select-none"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={idx}
                                className={`px-2 sm:px-3 py-1 rounded-md font-medium transition-colors ${currentPage === page
                                    ? 'bg-blue-600 text-white shadow'
                                    : 'hover:bg-blue-100 text-blue-600'
                                    }`}
                                onClick={() => setCurrentPage(Number(page))}
                            >
                                {page}
                            </button>
                        )
                    )}
                    <button
                        className={`px-2 sm:px-3 py-1 rounded-md font-medium transition-colors ${currentPage === totalPages || totalPages === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-blue-100 text-blue-600'
                            }`}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next &#8594;
                    </button>
                </nav>
            </div>
            <div className="flex justify-center mt-2 text-gray-500 text-xs sm:text-sm">
                Page <span className="font-semibold text-blue-600 mx-1">{currentPage}</span> of <span className="font-semibold text-blue-600 mx-1">{totalPages}</span>
            </div>
        </div>
    )
}
export default Table;