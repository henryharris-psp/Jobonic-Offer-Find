'use client';
import SearchFilterDropDown from "@/components/SearchFilterDropDown";
import { fetchServices } from "@/functions/helperFunctions";
import { Category } from "@/types/general";
import { Service, ServiceFilter, ServicePayload } from "@/types/service";
import Link from "next/link";
import SortingDropDown from "@/components/SortingDropDown";
import { Sorting, SortingValue } from "@/types/Sorting";
import PaginationButtons from "@/components/PaginationButtons";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import ServiceMatchCardSkeleton from "@/components/ServiceMatchCardSkeleton";
import ServiceModal from "@/components/ServiceModal";
import httpClient from "@/client/httpClient";
import axios from "axios";
import SearchInput from "@/components/SearchInput";

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
    },
    {
        label: 'Best Match',
        value: {
            sortBy: '',
            sortOrder: 'DESC'
        }
    }
]

const defaultFilters = {
    searchKeyword: [],
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
                searchKeyword: searchKeyword ? [searchKeyword] : [],
                categoryId: category ?? ''
            }))
        }
        const controller = new AbortController();
        const signal = controller.signal;
        setIsCategoriesFetching(true);
        (async () => {
            try{
                const res = await httpClient.post('category/all', {
                    pageNumber: 1,
                    pageSize: 100,
                    sortBy: 'id',
                    sortOrder: 'DESC',
                    filter: {
                        searchKeyword: ''
                    }
                }, { signal });
                setCategories(res.data.content);
                setIsCategoriesFetching(false);
            } catch (error) {
                console.log('error fetching category', error);
            }
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
                filter: { 
                    ...filters, 
                    categoryId: selectedWorkCategory
                },
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

        const handleOnSortingChange = (newSorting: SortingValue) => {
            setSorting(newSorting);
        }

        const setSearchKeywords = (searchKeywords: string[]) => {
            setFilters(() => {
                setPagination(defaultPagination);
                return {
                    ...defaultFilters,
                    searchKeyword: searchKeywords
                }
            });
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

        const handleOnNormalSearch = (keyword: string) => {
            setSearchKeywords([keyword]);
        }

        const mockApiCall = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        data: {
                            keywords: ['nurse', 'content']
                        },
                    });
                }, 2000);
            });
        };

        const handleOnAiSearch = async (keyword: string) => {
            setIsServicesFetching(true);
            setServices([]);

            try {
                const aiServerUrl = process.env.NEXT_PUBLIC_AI_SERVER_URL;
                if(!aiServerUrl) throw new Error("Cannot find AI server URL");
                
                const aiRes = await axios.post(aiServerUrl, {
                    prompt: keyword
                });

                const searchKeywords = aiRes.data.keywords ?? [];
                setSearchKeywords(searchKeywords);
            } catch (error) {
                console.log('error on AI Search', error);
            } finally { 
                setIsServicesFetching(false);
            }
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
    
    return (
        <div className="flex flex-col min-h-screen mx-auto">

            {/* top section */}
            <div className="flex flex-col items-center space-y-8 my-10">
                <h1 className="text-5xl font-bold text-black">
                    Services Requests
                </h1>

                <SearchInput
                    isSearching={isServicesFetching}
                    onAiSearch={handleOnAiSearch}
                    onNormalSearch={handleOnNormalSearch}
                />

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
                        className="text-white py-2 font-semibold px-4 rounded-lg inline-block hover:bg-[#D0693B] bg-[#0B2147]"
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
                                    className="border-gray-300 bg-gray-100 font-semibold text-sm rounded p-2"
                                    value={selectedWorkCategory}
                                    onChange={handleOnCategoryChange} // Handle category selection
                                >
                                    <option value="" className="font-semibold text-sm">All Categories</option>
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