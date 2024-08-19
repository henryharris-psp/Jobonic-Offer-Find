import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";

interface PaginationButtonsProps {
    currentPage: number;
    totalPage: number;
    onClickNext: () => void;
    onClickPrevious: () => void;
}

const PaginationButtons = ({
    currentPage,
    totalPage,
    onClickNext,
    onClickPrevious
}: PaginationButtonsProps) => {
    return (
        <div className="flex flex-row space-x-5 items-center">

            <div className="flex flex-row">
                <span className="text-center">Page {currentPage} / {totalPage} </span>
            </div>

            <div className="flex flex-row space-x-2">
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
                    disabled={ currentPage >= totalPage }
                >
                    <ChevronRightIcon className="size-6 text-white"/>
                </button>
            </div>
            
        </div>
    );
};

export default PaginationButtons;
