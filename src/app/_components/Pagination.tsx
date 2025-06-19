"use client";

import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    totalPages: number;
    page: number;
}
const Pagination = ({ totalPages, page }: Props) => {
    const router = useRouter();
    
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }
        return pages;
    };
    return (
        <div>
            <nav className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-white px-2 py-2 shadow ">
                <button
                    className={`px-2 sm:px-3 py-1 rounded-md font-medium transition-colors ${page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-blue-100 text-blue-600'
                        }`}
                    onClick={() => router.push(`?page=${page - 1}`)}
                    disabled={page === 1}
                >
                    &#8592; Prev
                </button>
                {getPageNumbers().map((pageNumber, idx) =>
                    pageNumber === '...' ? (
                        <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 text-gray-400 select-none"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={idx}
                            className={`px-2 sm:px-3 py-1 rounded-md font-medium transition-colors ${page === pageNumber
                                ? 'bg-blue-600 text-white shadow'
                                : 'hover:bg-blue-100 text-blue-600'
                                }`}
                            onClick={() => {
                                router.push(`?page=${pageNumber}`)
                            }}
                        >
                            {pageNumber}
                        </button>
                    )
                )}
                <button
                    className={`px-2 sm:px-3 py-1 rounded-md font-medium transition-colors ${page === totalPages || totalPages === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-blue-100 text-blue-600'
                        }`}
                    onClick={() => router.push(`?page=${page + 1}`)}
                    disabled={page === totalPages || totalPages === 0}
                >
                    Next &#8594;
                </button>
            </nav>
        </div>
    )
}

export default Pagination