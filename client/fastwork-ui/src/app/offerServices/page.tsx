'use client';
import SearchFilterDropDown from "@/components/SearchFilterDropDown";
import { fetchServices } from "@/functions/helperFunctions";
import { Category } from "@/types/general";
import { Service, ServiceFilter, ServicePayload } from "@/types/service";
import Link from "next/link";
import SortingDropDown from "@/components/SortingDropDown";
import { Sorting, SortingValue } from "@/types/Sorting";
import PaginationButtons from "@/components/PaginationButtons";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import ServiceMatchCardSkeleton from "@/components/ServiceMatchCardSkeleton";
import ServiceModal from "@/components/ServiceModal";
import httpClient from "@/client/httpClient";

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
    itemsPerPage: 50,
    totalPages: 0,
    totalElements: 0
}

const skeletonCount = Array.from({ length: 6 }, (_, index) => index);

const OfferService = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [searchKeywordInput, setSearchKeywordInput] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCategoriesFetching, setIsCategoriesFetching] = useState<boolean>(false);
    const [services, setServices] = useState<Service[]>([]);
    const [isServicesFetching, setIsServicesFetching] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortingValue>(sortings[0].value);
    const [filters, setFilters] = useState<ServiceFilter>(defaultFilters);
    const [pagination, setPagination] = useState(defaultPagination);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedWorkCategory, setSelectedWorkCategory] = useState<string>('');
    // Filter services based on the selected category
    const filteredServices = services.filter(service =>
        selectedWorkCategory ? service.categoryDTO?.name === selectedWorkCategory : true
    );
    //mounted
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchKeyword = urlParams.get("searchKeyword");
        const category = urlParams.get("category");
        if (searchKeyword || category) {
            setFilters(prev => ({
                ...prev,
                searchKeyword: searchKeyword ?? '',
                categoryId: category ?? ''
            }))
        }
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
    //fetch services depends on payload
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
                filter: { ...filters, categoryId: selectedWorkCategory },
                authId: authUser?.profile?.id || 0,
                postedByAuthUser: false
            }
            const servicesData = await fetchServices('request', payload, signal);
            if (servicesData) {
                setServices(servicesData.content);
                setPagination(prev => ({
                    ...prev,
                    totalPages: servicesData.totalPages,
                    totalElements: servicesData.totalElements
                }));
            };
            setIsServicesFetching(false);
        })();
        return () => controller.abort();
    }, [filters, sorting, pagination.currentPage, pagination.itemsPerPage, selectedCategory]);
    //methods
    const handleOnFilterChange = (newFilters: object) => {
        setFilters(prev => {
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
        setPagination(prev => ({
            ...prev,
            currentPage: 1,
            itemsPerPage: newItemsPerPage
        }))
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
        }))
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
                        className="text-white absolute font-medium right-2.5 bottom-2.5 bg-[#0B2147] hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-800"
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
                        className="text-white py-2 font-medium px-4 rounded-lg inline-block hover:bg-[#D0693B] bg-[#0B2147]"
                    >
                        Personalise your service offer
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex flex-row space-x-4 mx-12 overflow-hidden">
                {/* Services list and filter buttons */}
                <div className="flex-1 flex flex-col pb-10 space-y-5">
                    {/* Filter buttons */}
                    <div className="flex justify-between sm:flex-col md:flex-row flex-row items-start lg:items-center md:items-center">
                        {/* Update to show filtered services count */}
                        <span className="font-bold text-xl mb-2">
                            Match Requests: {filteredServices.length} {/* Display filtered services count */}
                        </span>

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
                            {/* Search filter dropdown */}
                            <SearchFilterDropDown
                                minPricePerHour={filters.minPricePerHour}
                                maxPricePerHour={filters.maxPricePerHour}
                                deadlineDate={filters.deadlineDate}
                                onChange={handleOnFilterChange}
                            />

                            {/* Sorting dropdown */}
                            <SortingDropDown
                                selectedSorting={sorting}
                                sortings={sortings}
                                onChange={handleOnSortingChange}
                            />
                        </div>
                    </div>

                    {/* Service list */}
                    <div className="flex-grow overflow-auto pt-4 min-h-[350px]">
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                            {isServicesFetching ? (
                                skeletonCount.map(id => <ServiceMatchCardSkeleton key={id} />)
                            ) : (
                                filteredServices.map(service => (
                                    <ServiceRequestCard
                                        key={service.id}
                                        service={service} // TODO: remove
                                        serviceRequest={{
                                            title: service.title,
                                            work_category: service.categoryDTO?.name,
                                            company: service.profileDTO.firstName,
                                            location: service.location ?? 'a',
                                            employment_type: service.employmentType ?? 'a',
                                            description_1: service.description1 ?? '',
                                            description_2: service.description2 ?? '',
                                            description_3: service.description3 ?? '',
                                            examples_of_work: service.serviceRequestDTO?.workExample ?? 'a',
                                            submission_deadline: service.serviceRequestDTO?.submissionDeadline ?? '11/08',
                                            budget: service.price.toString() ?? '0',
                                            language: service.languageSpoken ?? 'English',
                                            days_left: '', // This would need calculation based on the current date and submission_deadline
                                        }}
                                        hasProfile={true}
                                        profilePic={'/jobonic.svg'}
                                        onClick={() => {
                                            setSelectedService(service);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                ))
                            )}
                        </div>

                    </div>

                    {pagination.totalElements !== 0 && (
                        <div className="flex justify-center p-4 border-t">
                            <PaginationButtons
                                {...pagination}
                                onItemsPerPageChange={handleOnItemsPerPageChange}
                                onClickNext={handleOnClickNextPage}
                                onClickPrevious={handleOnClickPreviousPage}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for service details */}
            {isModalOpen && (
                <ServiceModal
                    service={selectedService}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default OfferService;