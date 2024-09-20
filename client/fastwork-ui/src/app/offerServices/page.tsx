'use client';
import SearchFilterDropDown from "@/components/SearchFilterDropDown";
import { fetchCategories, fetchServices } from "@/functions/helperFunctions";
import { Category } from "@/types/general";
import { Service, ServiceFilter, ServicePayload } from "@/types/service";
import Link from "next/link";
import SortingFilterDropDown from "@/components/SortingDropDown";
import { Sorting, SortingValue } from "@/types/Sorting";
import PaginationButtons from "@/components/PaginationButtons";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import ServiceMatchCardSkeleton from "@/components/ServiceMatchCardSkeleton";

type UserData = {
    id?: number;
    email?: string;
  };
  
  interface ServiceRequestDTO {
    id: string;
    submissionDeadline: string;
    workExample: string;
  }
  
  interface CategoryDTO {
    id: string;
    name: string;
  }


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
    itemsPerPage: 12,
    totalPages: 0,
    totalElements: 0
}

const skeletonCount = Array.from({ length: 6 }, (_, index) => index);

const OfferService = () => {
    const { authUser } = useSelector((state: RootState) => state.auth );

    const [searchKeywordInput, setSearchKeywordInput] = useState('');

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
                    filter: filters,
                    authId: authUser?.profile?.id || 0
                }

                const servicesData = await fetchServices('request', signal, payload);
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
        }, [filters, sorting, pagination.currentPage, pagination.itemsPerPage]);

    //methods
        const handleOnFilterChange = (newFilters: object) => {
            setFilters( prev => {
                return {
                    ...prev,
                    ...newFilters
                }
            });
        }

        const handleOnSearchKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
            setSearchKeywordInput(event.target.value);
        }

        const handleOnSortingChange = (newSorting: SortingValue) => {
            setSorting(newSorting);
        }

        const handleOnSearch = (event: FormEvent) => {
            event.preventDefault();
            setFilters(() => {
                setPagination(defaultPagination);
                return {
                    ...defaultFilters,
                    searchKeyword: searchKeywordInput
                }
            });
        }

        //pagination handler
            const handleOnItemsPerPageChange = (newItemsPerPage: number) => {
                setPagination( prev => ({
                    ...prev,
                    itemsPerPage: newItemsPerPage
                }))
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
                    Services Requests
                </h1>

                <form className="relative" onSubmit={handleOnSearch}>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search"
                        className="block min-w-96 w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. I have a service to offer"
                        value={searchKeywordInput}
                        onChange={handleOnSearchKeywordChange}
                        required 
                    />
                    <button 
                        type="submit" 
                        className="text-white absolute right-2.5 bottom-2.5 bg-[#0B2147] hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        Search
                    </button>
                </form>

                <div className="flex flex-row items-center space-x-3">
                    <span className="text-xl font-bold">
                        No requests match your skills?
                    </span>
                    <Link
                        href={
                            authUser
                                ? '/customiseService'
                                : '/register'
                        }
                        className="text-white py-2 px-4 rounded-lg inline-block hover:bg-[#D0693B] bg-[#0B2147]"
                    >
                        Personalise your service offer
                    </Link>
                </div>
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
                        <span className="font-bold text-xl">Match Requests: {pagination.totalElements}</span>

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
                                skeletonCount.map( id => 
                                    <ServiceMatchCardSkeleton key={id}/>    
                                )
                            ) : (
                                services.map( service => 
                                    <div
                                        key={service.id}
                                        className="bg-white border border-gray-100 shadow-lg"    
                                    >
                                        <span className="text-xs">
                                            Posted By Profile ID- { service.profileDTO.id } 
                                        </span>
                                        <ServiceRequestCard
                                            service={service}//TODO: remove
                                            serviceRequest={{
                                                title: service.title, // Correctly pass the title from the service object
                                                work_category: 'gg',
                                                //company: map profileId to username or firstName + lastName in User table
                                                company: service.profileDTO.firstName,
                                                location: service.location ?? 'a',
                                                employment_type: service.employmentType ?? 'a',
                                                description_1: service.description1 ?? '',
                                                description_2: service.description2 ?? '',
                                                description_3: service.description3 ?? '',
                                                examples_of_work: service.serviceRequestDTO?.workExample ?? 'a',
                                                submission_deadline: service.serviceRequestDTO?.submissionDeadline ?? '11/08',
                                                budget: service.price.toString() ?? '0',
                                                //add priceUnit here and in ServiceRequestCard component
                                                language: service.languageSpoken ?? 'English',
                                                days_left: '', // This would need calculation based on the current date and submission_deadline
                                            }} 
                                            hasProfile={true} 
                                            profilePic={'/jobonic.svg'} 
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    { pagination.totalElements !== 0 ? (
                        <PaginationButtons
                            {...pagination}
                            onItemsPerPageChange={handleOnItemsPerPageChange}
                            onClickNext={handleOnClickNextPage}
                            onClickPrevious={handleOnClickPreviousPage}
                        />
                    ) : ''}

                </div>

            </div>
        </div>
    );
};

export default OfferService;

