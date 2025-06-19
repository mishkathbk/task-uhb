import React from 'react'

type Props = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
const Pagination = ({ totalPages, currentPage, setCurrentPage }: Props) => {
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
        <div>
            <nav className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-white px-2 py-2 shadow border border-gray-200">
                <button
                    className={`px-2 sm:px-3 py-1 rounded-md font-medium transition-colors ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-blue-100 text-blue-600'
                        }`}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next &#8594;
                </button>
            </nav>
        </div>
    )
}

export default Pagination