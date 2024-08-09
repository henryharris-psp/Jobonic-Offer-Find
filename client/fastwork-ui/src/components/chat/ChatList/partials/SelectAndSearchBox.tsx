import React from "react";

interface Option {
    label: string,
    value: any
}

interface SearchAndSearchBoxProps {
    selectedValue: any;
    options: Option[];
    inputValue: any;
    onSelect: (value: any) => void;
    onInputChange: (value: any) => void;
}

const SelectAndSearchBox = ({
    selectedValue,
    options,
    inputValue,
    onSelect,
    onInputChange
}: SearchAndSearchBoxProps) => {

    //methods
        const handleOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onSelect(e.target.value);
        };

        const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onInputChange(e.target.value);
        };

    return (
        <div className="flex flex-col">
            <select
                id="type"
                className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-t-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                required
                value={selectedValue}
                onChange={handleOnSelect}
            >
                {options.map( option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="flex flex-row relative">
                <input
                    type="search"
                    id="search-dropdown"
                    value={inputValue}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 border-t-0 rounded-b-lg focus:border-blue-500"
                    placeholder="Search for Orders"
                    style={{ paddingRight: "2.5rem" }}
                    onChange={handleOnInputChange}
                />
                <div className="flex items-center justify-center absolute top-0 bottom-0 right-0">
                    <button className="flex items-center justify-center rounded-full text-[#828282] hover:bg-gray-100 active:bg-gray-200 w-8 h-8 m-2">
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectAndSearchBox;
