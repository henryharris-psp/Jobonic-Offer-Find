'use client'
import ServiceMatchCard from "@/components/ServiceMatchCard";
import SearchFilterDropDown from "@/components/SearchFilterDropDown";
import { fetchCategories, fetchServices } from "@/functions/helperFunctions";
import { Category } from "@/types/general";
import { Service, ServiceFilter, ServicePayload } from "@/types/service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SortingFilterDropDown from "@/components/SortingDropDown";
import { Sorting, SortingValue } from "@/types/Sorting";
import PaginationButtons from "@/components/PaginationButtons";

const sortings: Sorting[] = [
    {
        label: 'Best Match',
        value: {
            sortBy: '',
            sortOrder: 'DESC'
        }
    },
    {
        label: 'Price: Lowest to Highest',
        value: {
            sortBy: 'price',
            sortOrder: 'ASC'
        }
    },
    {
        label: 'Price: Highest to Lowest',
        value: {
            sortBy: 'price',
            sortOrder: 'DESC'
        }
    },
    {
        label: 'Rating',
        value: {
            sortBy: 'rating',
            sortOrder: 'DESC'
        }
    }
]

const defaultFilters = {
    searchKeyword: '',
    minPricePerHour: '',
    maxPricePerHour: '',
    deadlineDate: '',
    categoryId: ''
}

const defaultPagination = {
    currentPage: 1,
    itemsPerPage: 20,
    totalPages: 0,
    totalElements: 0
}

const ServiceList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCategoriesFetching, setIsCategoriesFetching] = useState<boolean>(false);

    const [services, setServices] = useState<Service[]>([]);
    const [isServicesFetching, setIsServicesFetching] = useState<boolean>(false);

    const [sorting, setSorting] = useState<SortingValue>(sortings[0].value);
    const [filters, setFilters] = useState<ServiceFilter>(defaultFilters);
    const [pagination, setPagination] = useState(defaultPagination);

    //mounted
        useEffect( () => {
            const urlParams = new URLSearchParams(window.location.search);
            const searchKeyword = urlParams.get("searchKeyword");
            const category = urlParams.get("category");
            
            if(searchKeyword || category){
                setFilters( prev => ({
                    ...prev,
                    searchKeyword: searchKeyword ?? '',
                    categoryId: category ?? ''
                }))
            }

            const controller = new AbortController();
            const signal = controller.signal;
            setIsCategoriesFetching(true);

            ( async () => {
                const categoriesData = await fetchCategories(signal);
                if (categoriesData) setCategories(categoriesData);
                setIsCategoriesFetching(false);
            })();

            return () => controller.abort();
        }, []);

    //fetch services depends on payload
        useEffect(() => {
            const controller = new AbortController();
            const signal = controller.signal;
            setIsServicesFetching(true);

            ( async () => {
                const payload: ServicePayload = {
                    pageNumber: pagination.currentPage,
                    pageSize: pagination.itemsPerPage,
                    sortBy: sorting.sortBy,
                    sortOrder: sorting.sortOrder,
                    filter: filters
                }

                const servicesData = await fetchServices('offer', signal, payload);
                if (servicesData){
                    setServices(servicesData.content);
                    setPagination( prev => ({
                        ...prev,
                        totalPages: servicesData.totalPages,
                        totalElements: servicesData.totalElements
                    }));
                };
                setIsServicesFetching(false);
            })();

            return () => controller.abort();
        }, [filters, sorting, pagination.currentPage]);

    //methods
        const handleOnFilterChange = (newFilters: object) => {
            setFilters( prev => {
                return {
                    ...prev,
                    ...newFilters
                }
            });
        }

        const handleOnSortingChange = (newSorting: SortingValue) => {
            setSorting(newSorting);
        }

        const handleOnClickNextPage = () => {
            setPagination( prev => ({
                ...prev,
                currentPage: prev.currentPage + 1
            }));
        }

        const handleOnClickPreviousPage = () => {
            setPagination( prev => ({
                ...prev,
                currentPage: prev.currentPage - 1
            }))
        }
        
    return (
        <div className="flex flex-col min-h-screen">

            {/* top section */}
            <div className="flex flex-col items-center space-y-8 my-10">
                <h1 className="text-5xl font-bold text-black">
                    Services List
                </h1>
                <Link
                    href="/customiseJobRequestForm"
                    className="text-white py-2 px-4 rounded-lg inline-block hover:bg-[#D0693B] bg-[#0B2147]"
                >
                    Not what you are looking for?
                </Link>
            </div>

            <div className="flex-1 flex flex-row space-x-4 mx-12 overflow-hidden">

                {/* category list */}
                <div className="flex flex-col w-64 max-h-96 bg-white rounded-lg overflow-hidden border border-gray-300">
                    <div className="flex items-center justify-center py-3 bg-gray-50 border-b border-b-gray-100">
                        <span className="text-xl font-bold">
                            Work Category
                        </span>       
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <div className="flex flex-col bg-white rounded-lg">
                            { isCategoriesFetching ? (
                                <span className="py-3 px-7 text-center">Loading...</span>
                            ) : (
                                categories.map( category => 
                                    <button 
                                        key={category.id}
                                        className="flex items-center justify-center hover:bg-gray-50 active:bg-gray-200 py-3 px-7 border-b border-b-gray-100 last:border-0"
                                        onClick={() => console.log(category.id)}
                                    >
                                        <span className="text-gray-600">{category.name}</span>
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* services list and filter buttons */}
                <div className="flex-1 flex flex-col pb-10 space-y-5">

                    {/* filter buttons */}
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">Match Services: {pagination.totalElements}</span>

                        <div className="flex flex-row items-center space-x-2">
                            <SearchFilterDropDown
                                minPricePerHour={filters.minPricePerHour}
                                maxPricePerHour={filters.maxPricePerHour}
                                deadlineDate={filters.deadlineDate}
                                onChange={handleOnFilterChange}
                            />
                            <SortingFilterDropDown
                                selectedSorting={sorting}
                                sortings={sortings}
                                onChange={handleOnSortingChange}
                            />
                        </div>
                    </div>

                    {/* service list */}
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                            { isServicesFetching ? (
                                <span>Searching Services...</span>
                            ) : (
                                services.map( service => 
                                    <ServiceMatchCard
                                        key={service.id}
                                        service={service}
                                        profile={service.profileDTO}
                                        onClick={() => console.log('fdf')}
                                        onChatClick={() => console.log('fdf')}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    { pagination.totalElements !== 0 ? (
                        <div className="flex justify-end">
                            <PaginationButtons
                                currentPage={pagination.currentPage}
                                totalPage={pagination.totalPages}
                                onClickNext={handleOnClickNextPage}
                                onClickPrevious={handleOnClickPreviousPage}
                            />
                        </div>
                    ) : ''}

                </div>

            </div>
        </div>
    );
};

export default ServiceList;
