import { TData } from '@/api/type';
import React, { useMemo, useState } from 'react'

type Props = {
    response: TData[];
    setFilters: (value: {
        search: string, userId: string
    }) => void;
}
const FilterForm = ({ response, setFilters }: Props) => {
    const [userId, setUserId] = useState('');
    const [search, setSearch] = useState('');
    const userIds = useMemo(
        () => Array.from(new Set(response.map(item => item.userId))),
        [response]
    );
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
                    <option value="">All</option>
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
    )
}

export default FilterForm