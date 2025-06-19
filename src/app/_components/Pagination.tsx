import cn from '@/utils/tailwind'
import Link from 'next/link'
import React from 'react'

type Props = {
    filteredDataLength: number
    page: number
}

const Pagination = ({ filteredDataLength, page }: Props) => {
    const totalPages = Math.ceil(filteredDataLength / 10);
    const getPageNumbers = () => {
        const pages = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages)
            } else if (page >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
            }
        }
        return pages
    }
    return (
        <div className="flex justify-center mt-6">
            <div>
                <nav className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-white px-2 py-2 ">
                    <Link
                        href={`?page=${page - 1}`}
                        className={cn(
                            'px-2 sm:px-3 py-1 rounded-md font-medium transition-colors',
                            page === 1
                                ? 'bg-gray-100 text-gray-400 pointer-events-none'
                                : 'hover:bg-blue-100 text-blue-600'
                        )}
                        aria-disabled={page === 1}
                    >
                        &#8592; Prev
                    </Link>
    
                    {getPageNumbers().map((pageNumber, idx) =>
                        pageNumber === '...' ? (
                            <span key={idx} className="px-2 sm:px-3 py-1 text-gray-400 select-none">
                                ...
                            </span>
                        ) : (
                            <Link
                                key={idx}
                                href={`?page=${pageNumber}`}
                                className={cn(
                                    'px-2 sm:px-3 py-1 rounded-md font-medium transition-colors',
                                    page === pageNumber
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'hover:bg-blue-100 text-blue-600'
                                )}
                            >
                                {pageNumber}
                            </Link>
                        )
                    )}
    
                    <Link
                        href={`?page=${page + 1}`}
                        className={cn(
                            'px-2 sm:px-3 py-1 rounded-md font-medium transition-colors',
                            page === totalPages || totalPages === 0
                                ? 'bg-gray-100 text-gray-400 pointer-events-none'
                                : 'hover:bg-blue-100 text-blue-600'
                        )}
                        aria-disabled={page === totalPages || totalPages === 0}
                    >
                        Next &#8594;
                    </Link>
                </nav>
                <div className="flex justify-center mt-2 text-gray-500 text-xs sm:text-sm">
                    Page <span className="font-semibold text-blue-600 mx-1">{page}</span> of <span className="font-semibold text-blue-600 mx-1">{totalPages}</span>
                </div>
            </div>
        </div>
    )
}

export default Pagination
