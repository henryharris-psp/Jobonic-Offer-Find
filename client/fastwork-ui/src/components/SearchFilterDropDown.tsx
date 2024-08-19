import { CheckIcon, FunnelIcon } from "@heroicons/react/24/solid";
import React, { ChangeEvent, useMemo, useState } from "react";

interface SearchFilterDropDownProps {
    minPricePerHour: string;
    maxPricePerHour: string;
    deadlineDate: string;
    onChange: (newFilters: object) => void;
}

const SearchFilterDropDown = ({
    minPricePerHour,
    maxPricePerHour,
    deadlineDate,
    onChange,
}: SearchFilterDropDownProps) => {
    
    const [show, setShow] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        minPricePerHour,
        maxPricePerHour,
        deadlineDate,
    });

    const isFilterApplied = useMemo(() => {
        return (
            minPricePerHour !== "" ||
            maxPricePerHour !== "" ||
            deadlineDate !== ""
        );
    }, [minPricePerHour, maxPricePerHour, deadlineDate]);

    //methods
        const handleOnClickToggle = () => {
            setShow( prev => !prev );
        }

        const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleOnApply = () => {
            onChange(filters);
        };

        const handleOnClear = () => {
            const defaultFilters = {
                minPricePerHour: "",
                maxPricePerHour: "",
                deadlineDate: "",
            }
            setFilters(defaultFilters);
            onChange(defaultFilters);
        };

    return (
        <div className="relative">
            <button
                className="flex items-center space-x-2 justify-center w-full text-white bg-[#0B2147] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
                onClick={handleOnClickToggle}
            >
                <FunnelIcon className="size-5 text-white"/>
                <span>Filter</span>
                { isFilterApplied ? (
                    <CheckIcon className="size-5 text-white"/>
                ) : ''}
            </button>
            {show ? (
                <div className="absolute space-y-3 right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
                    <h3 className="font-semibold mb-2">Filter by:</h3>

                    {/* minprice */}
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">
                                Min Price/hr
                            </label>
                            { minPricePerHour ? (
                                <span className="text-[#0C2348]">✔</span>
                            ) : ''}
                        </div>
                        <input
                            name="minPricePerHour"
                            value={filters.minPricePerHour}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            onChange={handleOnInputChange}
                        />
                    </div>

                    {/* maxprice */}
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">
                                Max Price/hr
                            </label>
                            { maxPricePerHour ? (
                                <span className="text-[#0C2348]">✔</span>
                            ) : ''}
                        </div>
                        <input
                            name="maxPricePerHour"
                            value={filters.maxPricePerHour}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            onChange={handleOnInputChange}
                        />
                    </div>
                    
                    {/* date */}
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">
                                Latest Deadline
                            </label>
                            { deadlineDate ? (
                                <span className="text-[#0C2348]">✔</span>
                            ) : ''}
                        </div>
                        <input
                            name="deadlineDate"
                            value={filters.deadlineDate}
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            onChange={handleOnInputChange}
                        />
                    </div>

                    {/* buttons */}
                    <div className="flex space-x-2">
                        <button
                            className="w-full text-sm bg-[#0C2348] text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={handleOnApply}
                        >
                            Apply Filters
                        </button>
                        <button
                            className="w-full text-sm bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                            onClick={handleOnClear}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            ) : ''}
        </div>
    );
};

export default SearchFilterDropDown;
