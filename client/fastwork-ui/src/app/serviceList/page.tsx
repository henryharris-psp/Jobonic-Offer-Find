'use client'
import ServiceMatchCard from "@/components/ServiceMatchCard";
import SearchFilterDropDown from "@/components/SearchFilterDropDown";
import { fetchServices } from "@/functions/helperFunctions";
import { Category } from "@/types/general";
import { Service, ServiceFilter, ServicePayload } from "@/types/service";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import SortingDropDown from "@/components/SortingDropDown";
import { Sorting, SortingValue } from "@/types/Sorting";
import PaginationButtons from "@/components/PaginationButtons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ServiceMatchCardSkeleton from "@/components/ServiceMatchCardSkeleton";
import httpClient from "@/client/httpClient";

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
    itemsPerPage: 50,
    totalPages: 0,
    totalElements: 0
}

const skeletonCount = Array.from({ length: 6 }, (_, index) => index);
const ServiceList = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCategoriesFetching, setIsCategoriesFetching] = useState<boolean>(false);
    const [services, setServices] = useState<Service[]>([]);
    const [isServicesFetching, setIsServicesFetching] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortingValue>(sortings[0].value);
    const [filters, setFilters] = useState<ServiceFilter>(defaultFilters);
    const [pagination, setPagination] = useState(defaultPagination);
    const [selectedWorkCategory, setSelectedWorkCategory] = useState<string>('');
    const hasProfile = Boolean(authUser?.profile); // Check if profile exists
    // Filter services based on the selected category
    const filteredServices = services.filter(service => {
        const isSelectedCategoryMatch = selectedWorkCategory ? service.categoryDTO?.name === selectedWorkCategory : true;
        return isSelectedCategoryMatch;
    });
    // Mounted
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchKeyword = urlParams.get("searchKeyword");
        const categoryId = urlParams.get("categoryId"); // Changed from "category" to "categoryId"
        // Set filters based on search keyword and category
        if (searchKeyword || categoryId) {
            setFilters(prev => ({
                ...prev,
                searchKeyword: searchKeyword ?? '',
                categoryId: categoryId ?? ''
            }));
            setSelectedWorkCategory(categoryId ?? ''); // Set the selected category based on the categoryId from URL
        }
        // Fetch categories
        const controller = new AbortController();
        const signal = controller.signal;
        setIsCategoriesFetching(true);

        (async () => {
            const res = await httpClient.post('category/all', {
                pageNumber: 1,
                pageSize: 100,
                sortBy: 'id',
                sortOrder: 'DESC',
                filter: {
                    searchKeyword: ''
                }
            } ,{ signal });
            setCategories(res.data.content);
            setIsCategoriesFetching(false);
        })();

        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setIsServicesFetching(true);
    
        (async () => {
            const payload: ServicePayload = {
                pageNumber: pagination.currentPage,
                pageSize: pagination.itemsPerPage,
                sortBy: sorting.sortBy,
                sortOrder: sorting.sortOrder,
                filter: {
                    ...filters,  // Includes minPricePerHour and maxPricePerHour
                    categoryId: selectedWorkCategory, // Use selectedWorkCategory for filtering
                    minPricePerHour: filters.minPricePerHour || '', // Passes min price
                    maxPricePerHour: filters.maxPricePerHour || '', // Passes max price
                    deadlineDate: filters.deadlineDate || ''
                },
                authId: authUser?.profile?.id || 0,
                postedByAuthUser: false
            };
    
            const servicesData = await fetchServices('offer', payload, signal);
            if (servicesData) {
                setServices(servicesData.content);
                setPagination(prev => ({
                    ...prev,
                    totalPages: servicesData.totalPages,
                    totalElements: servicesData.totalElements
                }));
            }
            setIsServicesFetching(false);
        })();
    
        return () => controller.abort();
    }, [filters, sorting, pagination.currentPage, pagination.itemsPerPage, selectedWorkCategory]);

    // Methods
    const handleOnFilterChange = (newFilters: object) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters
        }));
    };    

    const handleOnSortingChange = (newSorting: SortingValue) => {
        setSorting(newSorting);  // Updates the state correctly
    };

    // Pagination handler
    const handleOnItemsPerPageChange = (newItemsPerPage: number) => {
        setPagination(prev => ({
            ...prev,
            currentPage: 1,
            itemsPerPage: newItemsPerPage
        }));
    }

    const handleOnClickNextPage = () => {
        setPagination(prev => ({
            ...prev,
            currentPage: prev.currentPage + 1
        }));
    }

    const handleOnClickPreviousPage = () => {
        setPagination(prev => ({
            ...prev,
            currentPage: prev.currentPage - 1
        }));
    }

    const handleOnCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedWorkCategory(selectedValue);

        // Reset pagination and filters when switching to All Categories
        setFilters(prev => ({
            ...prev,
            categoryId: selectedValue ? selectedValue : ''
        }));

        // Reset pagination to the first page
        setPagination(defaultPagination);
    };

    return (
        <div className="flex flex-col min-h-screen mx-auto">

            {/* top section */}
            <div className="flex flex-col items-center space-y-8 my-10">
                <h1 className="text-5xl font-bold text-black">
                    Services List
                </h1>
                <Link
                    href={
                        authUser
                            ? '/customiseJobRequestForm'
                            : '/register'
                    }
                    className="text-white py-3 px-4 text-sm font-medium rounded-lg inline-block hover:bg-[#D0693B] bg-[#0B2147]"
                >
                    Not what you are looking for?
                </Link>
            </div>

            <div className="flex-1 flex flex-row space-x-4 mx-12 overflow-hidden">

                {/* services list and filter buttons */}
                <div className="flex-1 flex flex-col pb-10 space-y-5">
                    {/* filter buttons */}
                    <div className="flex justify-between sm:flex-col md:flex-row flex-row items-start lg:items-center md:items-center">
                        <span className="font-bold text-xl">Match Services:{filteredServices.length}</span>
                        <div className="flex flex-row items-center space-x-2">
                            {/* Work Category Dropdown */}
                            <div className="relative">
                                <select
                                    className="border-gray-300 bg-gray-100 font-medium text-sm rounded p-2"
                                    value={selectedWorkCategory}
                                    onChange={handleOnCategoryChange} // Handle category selection
                                >
                                    <option value="" className="font-medium text-sm">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <SearchFilterDropDown
                                minPricePerHour={filters.minPricePerHour}
                                maxPricePerHour={filters.maxPricePerHour}
                                deadlineDate={filters.deadlineDate}
                                onChange={handleOnFilterChange}
                            />
                            <SortingDropDown
                                selectedSorting={sorting}
                                sortings={sortings}
                                onChange={handleOnSortingChange}
                            />
                        </div>
                    </div>
                    {/* service list */}
                    <div className="flex-grow overflow-auto pt-4 min-h-[350px]">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                            {isServicesFetching ? (
                                skeletonCount.map(id =>
                                    <ServiceMatchCardSkeleton key={id} />
                                )
                            ) : (
                                filteredServices.map(service =>
                                    <div
                                        key={service.id}
                                        className="flex flex-col"
                                    >
                                        {/* <span>
                                            Posted By - { service.profileDTO.id }
                                        </span> */}
                                        <ServiceMatchCard
                                            key={service.id}
                                            service={service}
                                            profile={service.profileDTO}
                                            hasProfile={hasProfile} // Pass the boolean
                                            onClick={() => console.log('fdf')}
                                            onChatClick={() => console.log('fdf')}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {pagination.totalElements !== 0 ? (
                        <div className="flex justify-center p-4 border-t">
                        <PaginationButtons
                            {...pagination}
                            onItemsPerPageChange={handleOnItemsPerPageChange}
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
