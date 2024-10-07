import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/solid';
import React, { FormEvent, useRef, useState } from 'react'
import Button from './Button';

interface SearchInputProps {
    isSearching?: boolean;
    onAiSearch: (keyword: string) => void;
    onNormalSearch: (keyword: string) => void;
}

const SearchInput = ({
    isSearching = false,
    onAiSearch,
    onNormalSearch
}: SearchInputProps) => {

    const inputRef = useRef(null);
    const [searchMode, setSearchMode] = useState<'keyword' | 'ai'>('ai');

    //methods
        const handleOnSearch = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if(inputRef){
                const keyword = inputRef?.current?.value;
                searchMode === 'ai' ? onAiSearch(keyword) : onNormalSearch(keyword);
            }
        }

    return (
        <div className="flex flex-col items-center space-y-2">
            { searchMode === 'ai' ? (
                <form onSubmit={handleOnSearch}>
                    <div className={`relative border-rainbow shadow bg-red-400 h-12 w-96 rounded-full overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed ${
                        isSearching ? 'shadow-rainbow' : ''
                    }`}>
                        <input 
                            ref={inputRef}
                            type="text" 
                            className={`absolute focus: top-0 right-0 left-0 bottom-0 m-[2px] border-none rounded-full font-thin text-sm px-5 ${
                                isSearching ? 'animate-pulse' : ''
                            }`}
                            placeholder="Describe what you want"
                            readOnly={isSearching}
                        />
                        <button
                            className="flex disabled:opacity-70 disabled:cursor-not-allowed items-center space-x-1 absolute m-[5px] px-4 top-0 bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                            disabled={isSearching}
                        >
                            <SparklesIcon className="size-4 text-white"/>
                            <span className="font-semibold text-sm text-white">
                                AI Search
                            </span>   
                        </button>
                    </div>
                </form>
            ) : (
                <form className="relative" onSubmit={handleOnSearch}>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        ref={inputRef}
                        type="search"
                        id="default-search"
                        className="block min-w-96 w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. I have a service to offer"
                        required
                    />
                    <div className="flex items-center p-2 absolute top-0 right-0 bottom-0">
                        <Button
                            size="sm"
                            title="Search"
                            color="primary"
                        />
                    </div>
                </form>
            )}

            <div className="flex">
                { searchMode === 'ai' ? (
                    <button 
                        className="flex disabled:opacity-70 disabled:cursor-not-allowed space-x-1 h-8 px-3 items-center to-sky-500 rounded-xl shadow border border-gray-300"
                        onClick={() => setSearchMode('keyword')} 
                        disabled={isSearching}   
                    >
                        <MagnifyingGlassIcon className="size-4"/>
                        <span className="text-xs">Search by Keyword</span>
                    </button>
                ) : (
                    <button 
                        className="flex disabled:opacity-70 disabled:cursor-not-allowed space-x-2 h-8 px-3 items-center bg-gradient-to-tr from-indigo-500 to-sky-500 rounded-full"
                        onClick={() => setSearchMode('ai')}
                        disabled={isSearching}  
                    >
                        <SparklesIcon className="size-4 text-white"/>
                        <span className="text-xs text-white">Search with AI</span>
                    </button>
                )}
            </div>
        </div>
    );
};


export default SearchInput