import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useMemo } from "react";

interface PaginationButtonsProps {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    totalElements: number;
    onItemsPerPageChange: (newItemsPerPage: number) => void;
    onClickNext: () => void;
    onClickPrevious: () => void;
}

const PaginationButtons = ({
    currentPage,
    itemsPerPage,
    totalPages,
    totalElements,
    onItemsPerPageChange,
    onClickNext,
    onClickPrevious,
}: PaginationButtonsProps) => {

    const showingRange = useMemo(() => {
        const from = (currentPage - 1) * itemsPerPage + 1;
        const to = Math.min(currentPage * itemsPerPage, totalElements);

        return {
            from: totalElements === 0 ? 0 : from,
            to: totalElements === 0 ? 0 : to,
        };
    }, [currentPage, itemsPerPage, totalElements, totalPages]);

    // Handling dropdown value change
    const handleOnItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = Number(event.target.value);
        onItemsPerPageChange(newItemsPerPage); // Pass the selected value back to the parent
    };

    return (
        <div className="flex flex-row flex-wrap items-center gap-3 space-x-2 justify-end">
            <div className="flex flex-row items-center space-x-2">
                <span className="font-medium text-sm">
                    Items Per Page
                </span>

                {/* Dropdown for selecting items per page */}
                <select
                    className="border-gray-300 bg-gray-100 font-medium text-sm rounded py-1"
                    value={itemsPerPage}
                    onChange={handleOnItemsPerPageChange}
                >
                    {/* Option values for items per page */}
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <div className="flex flex-row items-center space-x-4">
                <span className="text-center font-medium text-sm whitespace-nowrap">
                    {showingRange.from} – {showingRange.to} of {totalElements}
                </span>
                <div className="flex flex-row items-center space-x-2">
                    <button
                        className="flex items-center space-x-2 justify-center w-full text-white bg-[#0B2147] disabled:bg-[#a2b5d8] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
                        onClick={onClickPrevious}
                        disabled={currentPage <= 1}
                    >
                        <ChevronLeftIcon className="size-4 font-medium text-white" />
                    </button>
                    <button
                        className="flex items-center space-x-2 justify-center w-full text-white bg-[#0B2147] disabled:bg-[#a2b5d8] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
                        onClick={onClickNext}
                        disabled={currentPage >= totalPages}
                    >
                        <ChevronRightIcon className="size-4 font-medium text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationButtons;
