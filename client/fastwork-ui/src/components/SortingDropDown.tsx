import { Sorting, SortingValue } from "@/types/Sorting";
import { CheckIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import SortIcon from "../../public/icons/SortIcon";

interface SortingDropDownProps {
    selectedSorting: SortingValue;
    sortings: Sorting[];
    onChange: (sorting: SortingValue) => void;
}

const SortingDropDown = ({
    selectedSorting,
    sortings,
    onChange,
}: SortingDropDownProps) => {
    const [show, setShow] = useState<boolean>(false);

    //methods
        const isSelected = (sortingValue: SortingValue) => {
            return sortingValue.sortBy === selectedSorting.sortBy && 
            sortingValue.sortOrder === selectedSorting.sortOrder;
        }

        const handleOnClickToggle = () => {
            setShow((prev) => !prev);
        };

    return (
        <>
            <div className="relative">
                <button
                    className="flex items-center space-x-2 justify-center w-full text-white bg-[#0B2147] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
                    onClick={handleOnClickToggle}
                >
                    <SortIcon className="size-5 text-white" />
                    <span>Sort</span>
                </button>
                
                {show ? (
                    <div className="flex flex-col absolute overflow-hidden right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        { sortings.map( sorting => 
                            <button 
                                key={sorting.value.sortBy}
                                className="flex items-center justify-between hover:bg-gray-50 active:bg-gray-200 py-2 px-3 border-b border-b-gray-200 last:border-0"
                                onClick={() => onChange(sorting.value)}
                            >
                                <span 
                                    className={`flex-1 text-start text-sm ${
                                        isSelected(sorting.value) ? 'font-bold' : ''
                                    }`}
                                >
                                    {sorting.label}
                                </span>
                                { isSelected(sorting.value) ? (
                                    <CheckIcon className="size-4 text-black"/>
                                ) : ''}
                            </button>
                        )}
                    </div>
                ) : ''}
            </div>
            
            {/* backdrop */}
            { show ? (
                <div 
                    className="fixed top-0 right-0 bottom-0 left-0 z-10"
                    onClick={() => setShow(false)}
                />
            ) : ''}
        </>
        
    );
};

export default SortingDropDown;
