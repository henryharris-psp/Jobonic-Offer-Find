import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useMemo, useState } from "react";
import SafeInput, { SafeInputChangeEvent } from "./SafeInput";
import Button from "./Button";

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
    onClickPrevious
}: PaginationButtonsProps) => {
    const [isEditable, setIsEditable] = useState(false);
    const [count, setCount] = useState<number>(itemsPerPage);

    const showingRange = useMemo(() => {
        const from = (currentPage - 1) * itemsPerPage + 1;
        const to = Math.min(currentPage * itemsPerPage, totalElements);
    
        return {
            from: totalElements === 0 ? 0 : from,
            to: totalElements === 0 ? 0 : to,
        };
    }, [currentPage, itemsPerPage, totalElements, totalPages]);    

    //methods
        const handleOnCountChange = (event: SafeInputChangeEvent) => {
            const { value } = event.target;
            setCount(Number(value));
        }

        const handleOnSubmit = () => {
            onItemsPerPageChange(count);
            setIsEditable(false);
        }

        const handleOnCancelEdit = () => {
            setCount(itemsPerPage);
            setIsEditable(false);
        }

    return (
        <div className="flex flex-row flex-wrap items-center gap-3 space-x-2 justify-end">

            <div className="flex flex-row items-center space-x-2">
                <span>
                    Items Per Page
                </span>

                { isEditable ? (
                    <div className="min-w-12 max-w-20">
                        <SafeInput
                            size="lg"
                            value={count}
                            onChange={handleOnCountChange}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center bg-white border border-gray-200 rounded-lg h-10">
                        <span className="px-3 text-gray-500">
                            { count }
                        </span>
                    </div>
                )}
                
                { isEditable ? (
                    <div className="flex flex-row items-center space-x-1">
                        <Button
                            size="sm"
                            color="secondary"
                            title="Cancel"
                            onClick={handleOnCancelEdit}
                        />
                        <Button
                            size="sm"
                            color="warning"
                            title="Set"
                            onClick={handleOnSubmit}
                        />
                    </div>
                ) : (
                    <Button
                        size="sm"
                        color="primary"
                        title="Change"
                        onClick={() => setIsEditable(true)}
                    />
                )}
            </div>

            <div className="flex flex-row items-center space-x-4">
                <span className="text-center whitespace-nowrap">
                    {showingRange.from} – {showingRange.to} of {totalElements}
                </span>
                <div className="flex flex-row items-center space-x-2">
                    <button
                        className="flex items-center space-x-2 justify-center w-full text-white bg-[#0B2147] disabled:bg-[#a2b5d8] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
                        onClick={onClickPrevious}
                        disabled={ currentPage <= 1 }
                    >
                        <ChevronLeftIcon className="size-6 text-white"/>
                    </button>
                    <button
                        className="flex items-center space-x-2 justify-center w-full text-white bg-[#0B2147] disabled:bg-[#a2b5d8] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
                        onClick={onClickNext}
                        disabled={ currentPage >= totalPages }
                    >
                        <ChevronRightIcon className="size-6 text-white"/>
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default PaginationButtons;
