import React from "react";

const SearchBox = () => {
    return (
        <div className="flex flex-row relative">
            <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500"
                placeholder="Search for Orders"
                style={{ paddingRight: "2.5rem" }}
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
    );
};

export default SearchBox;
