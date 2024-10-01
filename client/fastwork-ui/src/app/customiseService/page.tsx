'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import httpClient from '@/client/httpClient';
import { AxiosError } from 'axios';
import { getProfileId } from "@/functions/helperFunctions";
import { TrashIcon } from '@heroicons/react/24/solid';
import ServiceMatchCard from '@/components/ServiceMatchCard';
import { Service } from '@/types/service';
import ServiceOfferCard from '@/components/CreateServiceOfferCard';
type Category = {
    id: string;
    name: string;
};
type UserData = {
    id?: number;
    email?: string;
    phoneNumber?: string;
    address?: string;
};
type LinkEntry = {
    description: string;
    url: string;
};
const CustomiseService: React.FC = () => {
    // State variables for service form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [employmentType, setEmploymentType] = useState('PART_TIME');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [newLanguage, setNewLanguage] = useState('');
    const [location, setLocation] = useState('');
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [askingPrice, setAskingPrice] = useState<number | null>(null);
    const [priceUnit, setPriceUnit] = useState('HOUR');
    const [user, setUser] = useState<UserData>({});
    const [links, setLinks] = useState<LinkEntry[]>([]);
    const [newLinkDescription, setNewLinkDescription] = useState('');
    const [newLinkUrl, setNewLinkUrl] = useState('');
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [languageError, setLanguageError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [serviceDescriptionError, setServiceDescriptionError] = useState('');
    const [description1Error, setDescription1Error] = useState('');
    const [description2Error, setDescription2Error] = useState('');
    const [description3Error, setDescription3Error] = useState('');
    const [employmentTypeError, setEmploymentTypeError] = useState('');
    const [priceError, setPriceError] = useState('');
    // Fetch categories when the component mounts
    useEffect(() => {
        fetchCategory();
    }, []);
    // Set default selected category when category list is populated
    useEffect(() => {
        if (categoryList.length > 0) {
            setSelectedCategoryName(categoryList[0].name);
        }
    }, [categoryList]);
    //prevent negative value in price
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);

        // If value is valid, clear error and update state
        if (!isNaN(value) && value > 0) {
            setPriceError('');  // Clear the error message
            setAskingPrice(value);  // Update the asking price
        } else {
            setPriceError("Please enter a valid price greater than 0.");  // Show error message
            setAskingPrice(null);  // Reset asking price if invalid
        }
    };

    // Fetch category data from the API
    const fetchCategory = async () => {
        try {
            const res = await httpClient.post('category/all', {
                pageNumber: 1,
                pageSize: 100,
                sortBy: 'id',
                sortOrder: 'DESC',
                filter: {
                    searchKeyword: ''
                }
            });
            setCategoryList(res.data.content);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const handleAddLanguage = () => {
        const trimmedLanguage = newLanguage.trim();

        if (trimmedLanguage === '') {
            setLanguageError('Please enter a valid language.');
            return;
        }
        if (languages.includes(trimmedLanguage)) {
            setLanguageError('This language is already added.');
            return;
        }
        setLanguages([...languages, trimmedLanguage]);
        setNewLanguage('');
        setLanguageError(''); // Clear any previous error
    };
    // Handle removing a language from the list
    const handleRemoveLanguage = (languageToRemove: string) => {
        setLanguages(languages.filter(language => language !== languageToRemove));
    };
    const handleAddLink = () => {
        const trimmedDescription = newLinkDescription.trim();
        const trimmedUrl = newLinkUrl.trim();
        // Validate inputs
        if (trimmedDescription === '' || trimmedUrl === '') {
            alert("Both fields are required!"); // Alert if fields are empty
            return;
        }
        // Add the new link to the list
        setLinks([...links, { description: trimmedDescription, url: trimmedUrl }]);
        setNewLinkDescription(''); // Clear the input field
        setNewLinkUrl(''); // Clear the input field
    };

    // Handle removing a link from the list
    const handleRemoveLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };
    // Handle saving the service description and other details
    const handleSaveDescription = async (event: React.MouseEvent) => {
        event.preventDefault();
        // Validate the form first
        if (!isFormValid()) {
            return; // If the form is invalid, stop execution
        }
        const profileId = await getProfileId();
        const selectedCategory = categoryList.find(category => category.name === selectedCategoryName);
        const categoryId = selectedCategory ? selectedCategory.id : '';
        // Service data object to be sent to the API
        const serviceData = {
            profileId: profileId,
            title: title,
            employmentType: employmentType,
            description: description,
            description1: description1,
            description2: description2,
            description3: description3,
            languageSpoken: languages.join(', '),
            location: location,
            categoryId: categoryId,
            price: askingPrice,
            priceUnit: priceUnit,
            links: links,
        };
        try {
            const response = await httpClient.post('service', serviceData);
            console.log('Response Data:', response.data);
            router.push(`/aiServiceMatches`);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error posting service data:', error.response?.data || error.message);
            } else {
                console.error('Error posting service data:', error);
            }
        }
    };
    const isFormValid = () => {
        let isValid = true;

        if (!title.trim()) {
            setTitleError('Please provide the service title...');
            isValid = false;
        } else {
            setTitleError('');
        }

        if (!employmentType) {
            setEmploymentTypeError('Please provide an employment type...');
            isValid = false;
        } else {
            setEmploymentTypeError('');
        }

        if (!askingPrice) {
            setPriceError('Please provide the asking price...');
            isValid = false;
        } else {
            setPriceError('');
        }

        if (!description.trim()) {
            setServiceDescriptionError('Please provide the service description...');
            isValid = false;
        } else {
            setServiceDescriptionError('');
        }
        if (!description1.trim()) {
            setDescription1Error('Please provide the description...');
            isValid = false;
        } else {
            setDescription1Error('');
        }
        if (!description2.trim()) {
            setDescription2Error('Please provide the description...');
            isValid = false;
        } else {
            setDescription2Error('');
        }
        if (!description3.trim()) {
            setDescription3Error('Please provide the description...');
            isValid = false;
        } else {
            setDescription3Error('');
        }

        return isValid;
    };
    return (

        <div className="flex flex-col lg:flex-row justify-between sm:flex-wrap md:flex-wrap">
            <div className="flex flex-col justify-center items-center w-full lg:w-[80%] my-6 lg:my-12 md:my-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-cyan-900 text-center">
                    Create Service Offer
                </h2>
                <div className="w-full p-8 xs:p-8 xs:p-8 sm:p-16 lg:px-36 lg:py-10 flex flex-col gap-6 rounded-md">
                    {/* First Row */}
                    <div className="flex md:flex-row lg:flex-row flex-col gap-4">
                        {/* Service Title Input */}
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="service-title">
                                Service Title
                            </label>
                            <input
                                type="text"
                                id="service-title"
                                value={title}
                                placeholder="e.g. Web Developer"
                                className="block w-full p-4 text-cyan-900 border font-semibold border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (e.target.value.trim() !== '') {
                                        setTitleError(''); // Clear the error when valid input is provided
                                    }
                                }}
                            />
                            {titleError && <div className="text-red-500 font-semibold text-sm mt-1">{titleError}</div>}
                        </div>

                        {/* Employment Type Select */}
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="employment-type">
                                Employment Type
                            </label>
                            <select
                                id="employment-type"
                                value={employmentType}
                                className="block w-full p-4 text-cyan-900 border font-semibold border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => {
                                    setEmploymentType(e.target.value);
                                    if (e.target.value.trim() !== '') {
                                        setEmploymentTypeError(''); // Clear the error when valid input is provided
                                    }
                                }}
                            >
                                <option value="PART_TIME">Part-time</option>
                                <option value="FULL_TIME">Full-time</option>
                                <option value="CONTRACT">Contract</option>
                            </select>
                            {employmentTypeError && <div className="text-red-500 font-semibold text-sm mt-1">{employmentTypeError}</div>}
                        </div>
                    </div>
                    <div className="flex md:flex-row lg:flex-row flex-col gap-4">
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="description1">Job Description 1</label>
                            <input
                                type="text"
                                id="description1"
                                value={description1}
                                placeholder="Job Description 1"
                                className="block w-full text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => {
                                    setDescription1(e.target.value);
                                    if (e.target.value.trim() !== '') {
                                        setDescription1Error('');  // Clear the error when valid input is provided
                                    }
                                }}
                            />
                            {description1Error && (
                                <div className="text-red-500 font-semibold text-sm mt-1">
                                    {description1Error}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="description2">Job Description 2</label>
                            <input
                                type="text"
                                id="description2"
                                value={description2}
                                placeholder="Job Description 2"
                                className="block w-full text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => {
                                    setDescription2(e.target.value);
                                    if (e.target.value.trim() !== '') {
                                        setDescription2Error('');  // Clear the error when valid input is provided
                                    }
                                }}
                            />
                            {description2Error && (
                                <div className="text-red-500 font-semibold text-sm mt-1">
                                    {description2Error}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex md:flex-row lg:flex-row flex-col gap-4">
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="description3">Job Description 3</label>
                            <input
                                type="text"
                                id="description3"
                                value={description3}
                                placeholder="Job Description 3"
                                className="block w-full text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => {
                                    setDescription3(e.target.value);
                                    if (e.target.value.trim() !== '') {
                                        setDescription3Error('');  // Clear the error when valid input is provided
                                    }
                                }}
                            />
                            {description3Error && (
                                <div className="text-red-500 font-semibold text-sm mt-1">
                                    {description3Error}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="languages">Languages Spoken</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    id="new-language"
                                    placeholder="Add a language"
                                    value={newLanguage}
                                    onChange={(e) => {
                                        setNewLanguage(e.target.value);
                                        setLanguageError(''); // Clear the error when the user starts typing
                                    }}
                                    className="block w-[90%] text-sm font-semibold p-4 text-cyan-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    onClick={handleAddLanguage}
                                    className="bg-[#0B2147] ml-4 text-white rounded-xl px-4 hover:bg-[#D0693B] font-semibold text-sm "
                                >
                                    Add
                                </button>
                            </div>
                            {/* Error Message */}
                            {languageError && (
                                <div className="text-red-500 font-semibold text-sm mt-1">
                                    {languageError}
                                </div>
                            )}
                            <div className="mt-2 flex flex-wrap">
                                {languages.map((language, index) => (
                                    <span key={index} className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                        {language}
                                        <button
                                            className="ml-2 text-red-600 hover:text-red-800"
                                            onClick={() => handleRemoveLanguage(language)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row lg:flex-row flex-col  gap-4">
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="service-description">Service Description</label>
                            <input
                                type="text"
                                id="service-description"
                                placeholder="e.g. I can design websites..."
                                value={description}
                                className="block w-full text-sm font-semibold p-4 text-cyan-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (e.target.value.trim() !== '') {
                                        setServiceDescriptionError('');  // Clear the error when valid input is provided
                                    }
                                }}
                            />
                            {serviceDescriptionError && (
                                <div className="text-red-500 font-semibold text-sm mt-1">
                                    {serviceDescriptionError}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="block font-semibold ml-2 mb-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                placeholder="e.g. Phra Khanong"
                                className="block w-full text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row lg:flex-row flex-col gap-4">
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={selectedCategoryName}
                                className="block w-full text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setSelectedCategoryName(e.target.value)}
                            >
                                {categoryList.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="asking-price">Asking Price</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="number"
                                    id="asking-price"
                                    placeholder="Price"
                                    className="block w-[80%] text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={handlePriceChange}
                                />
                                <select
                                    className="block text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    value={priceUnit}
                                    onChange={(e) => setPriceUnit(e.target.value)}
                                >
                                    <option value="HOUR">Hour</option>
                                    <option value="WEEK">Week</option>
                                    <option value="MONTH">Month</option>
                                    <option value="PROJECT">Project</option>
                                </select>
                            </div>
                            {priceError && (
                                <div className="text-red-500 font-semibold text-sm mt-1">
                                    {priceError}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex md:flex-row lg:flex-row flex-col gap-4">
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="description">Offer Link Description</label>
                            <input
                                type="text"
                                id="new-link-description"
                                placeholder="Short description"
                                value={newLinkDescription}
                                onChange={(e) => {
                                    setNewLinkDescription(e.target.value);
                                }}
                                className="block w-full text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col w-full lg:w-1/2 mb-4">
                            <label className="block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="description">Website Link</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    id="new-link-url"
                                    placeholder="Link"
                                    value={newLinkUrl}
                                    onChange={(e) => setNewLinkUrl(e.target.value)}
                                    className="block w-[90%] text-cyan-900 border text-sm font-semibold p-4 border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500"

                                />
                                <button
                                    onClick={handleAddLink}
                                    className="bg-[#0B2147] ml-4 text-white font-semibold rounded-xl px-4 hover:bg-[#D0693B] text-sm "
                                >
                                    Add
                                </button>
                            </div>
                            <div className="mt-2 w-[100%]">
                                {links.map((link, index) => (
                                    <div key={index} className="flex w-full items-center bg-gray-100 rounded-xl p-3 mb-2">
                                        <div className="flex-grow">
                                            <p className="text-sm text-cyan-900 font-semibold">{link.description}</p>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline text-sm font-semibold"
                                            >
                                                {link.url}
                                            </a>
                                        </div>
                                        <TrashIcon
                                            className=" w-4 h-4 ml-4 text-red-600 hover:text-red-800 cursor-pointer"
                                            onClick={() => handleRemoveLink(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="col-span-2 text-center">
                        <button
                            onClick={handleSaveDescription}
                            className="bg-[#0B2147] hover:bg-[#D0693B] text-white font-semibold py-3 px-12 text-sm rounded-2xl"
                            disabled={!isFormValid}
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
            <div className="lg:fixed lg:-top-16 lg:-end-16 w-full lg:w-[30%] px-4 py-8 flex flex-col items-center lg:h-screen sm:h-auto justify-center">
                {/* Card should update as form is filled in */}
                <ServiceOfferCard
                    title={title}
                    price={askingPrice !== null ? askingPrice : 0} // Show price, default to 0
                    currency="USD"
                    description1={description1}
                    description2={description2}
                    description3={description3}
                    avatar="/profile.png"
                    rating={4}
                    reviews={20}
                    sold={10}
                />

                <h3 className="px-6 text-gray-500 text-justify text-xs mt-2 lg:mt-4">* how your service offer card will look like</h3>
            </div>
        </div>

    );
};

export default CustomiseService;

