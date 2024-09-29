import { CheckIcon, FunnelIcon } from "@heroicons/react/24/solid";
import React, { ChangeEvent, useMemo, useState } from "react";

interface Filters {
    minPricePerHour: string;
    maxPricePerHour: string;
    deadlineDate: string;
}

interface SearchFilterDropDownProps {
    minPricePerHour: string;
    maxPricePerHour: string;
    deadlineDate: string;
    onChange: (newFilters: Filters) => void;
}

const SearchFilterDropDown = ({
    minPricePerHour,
    maxPricePerHour,
    deadlineDate,
    onChange,
}: SearchFilterDropDownProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [filters, setFilters] = useState<Filters>({
        minPricePerHour,
        maxPricePerHour,
        deadlineDate,
    });

    const isFilterApplied = useMemo(() => {
        return (
            filters.minPricePerHour !== '' ||
            filters.maxPricePerHour !== '' ||
            filters.deadlineDate !== ''
        );
    }, [filters]);

    const handleOnClickToggle = () => {
        setShow((prev) => !prev);
    };

    const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnApply = () => {
        const { minPricePerHour, maxPricePerHour } = filters;
        if (
            (minPricePerHour && isNaN(Number(minPricePerHour))) ||
            (maxPricePerHour && isNaN(Number(maxPricePerHour)))
        ) {
            alert("Please enter valid numeric values for prices.");
            return;
        }

        // Check if min price is greater than max price
        if (minPricePerHour && maxPricePerHour && Number(minPricePerHour) > Number(maxPricePerHour)) {
            alert("Min price cannot be greater than max price.");
            return;
        }

        console.log("Applying filters:", filters); // Debugging - Check what is being applied
        onChange(filters); // Send the updated filters back to the parent component
        setShow(false); // Close the dropdown
    };

    const handleOnClear = () => {
        const defaultFilters: Filters = {
            minPricePerHour: '',
            maxPricePerHour: '',
            deadlineDate: '',
        };
        setFilters(defaultFilters);
        onChange(defaultFilters); // Clear filters in the parent component
    };

    return (
        <div className="relative">
            <button
                className="flex items-center space-x-2 justify-center w-full text-white bg-[#0B2147] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
                onClick={handleOnClickToggle}
            >
                <FunnelIcon className="size-5 text-white" />
                <span>Filter</span>
                {isFilterApplied && <CheckIcon className="size-5 text-white" />}
            </button>

            {show && (
                <div className="absolute space-y-3 right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20 p-4">
                    <h3 className="font-semibold mb-2">Filter by:</h3>

                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700">
                            Min Price/hr
                        </label>
                        <input
                            name="minPricePerHour"
                            value={filters.minPricePerHour}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            onChange={handleOnInputChange}
                            placeholder="Enter min price"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700">
                            Max Price/hr
                        </label>
                        <input
                            name="maxPricePerHour"
                            value={filters.maxPricePerHour}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            onChange={handleOnInputChange}
                            placeholder="Enter max price"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700">
                            Latest Deadline
                        </label>
                        <input
                            name="deadlineDate"
                            value={filters.deadlineDate}
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            onChange={handleOnInputChange}
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            className="w-full text-sm bg-[#0C2348] text-white py-2 rounded-lg hover:bg-blue-600"
                            onClick={handleOnApply}
                        >
                            Apply Filters
                        </button>
                        <button
                            className="w-full text-sm bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                            onClick={handleOnClear}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            )}

            {show && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 z-10"
                    onClick={() => setShow(false)}
                />
            )}
        </div>
    );
};

export default SearchFilterDropDown;