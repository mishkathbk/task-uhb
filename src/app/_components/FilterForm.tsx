"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
    search: string;
};

const filterSchema = z.object({
    search: z.string().max(100, 'Search must be at most 100 characters').optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

const FilterForm = ({ search }: Props) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FilterFormValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            search: search,
        },
    });

    const onSubmit = (data: FilterFormValues) => {
        const params = new URLSearchParams(window.location.search);

        if (data.search) {
            params.set('search', data.search);
        } else {
            params.delete('search');
        }
        params.set('page', '1');
        router.replace(`?${params.toString()}`);
    };

    const handleClear = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete('search');
        params.set('page', '1');
        router.replace(`?${params.toString()}`);
        reset();
    };


    return (
        <form
            className="mb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-2 sm:gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className="flex flex-col w-full ">
                <label htmlFor="search-input" className="mb-1 text-sm font-medium text-gray-700">
                    Search
                </label>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Filter by title or body..."
                    className="bg-gray-50 text-[0.9rem] py-[0.5rem] rounded-sm px-2 !text-black outline-none"
                    {...register('search')}
                />
                {errors.search && (
                    <span className="text-red-500 text-xs mt-1">{errors.search.message}</span>
                )}
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
    );
};

export default FilterForm;