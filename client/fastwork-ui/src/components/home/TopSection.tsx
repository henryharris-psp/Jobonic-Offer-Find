"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import httpClient from "@/client/httpClient";

interface CombinedSearchResults {
    offers: any[];
    requests: any[];
}

const TopSection: React.FC = (): React.ReactNode => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("Find Service");
    const [placeholder, setPlaceholder] = useState("e.g. I need a plumber");
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);

        setPlaceholder(category === "Find Service" ? "e.g. I need a plumber" : "e.g. I can be a plumber");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const searchKeyword = (inputRef.current as HTMLInputElement)?.value ?? "";
    
        if (!searchKeyword.trim()) {
            console.warn("Please provide a search keyword");
            return;
        }
    
        try {
            setLoading(true); // Set loading state
    
            // 1. Send the search query to the AI API to get refined keywords
            const aiResponse = await fetch(`http://127.0.0.1:5000/search?query=${encodeURIComponent(searchKeyword)}`);
            const aiData = await aiResponse.json();
    
            // 2. Retrieve the refined keyword from the AI response
            const refinedKeyword = aiData.results.map((result: { title: any; }) => result.title).join(', '); // Modify based on your AI response structure
    
            if (!refinedKeyword) {
                throw new Error("No refined keyword from AI");
            }
    
            // 3. Determine the API endpoint based on the selected category (Find Service / Offer)
            const apiEndpoint =
                selectedCategory === "Find Service"
                    ? "https://api-jobonic.laconic.co.th/api/v1/service/request/all"
                    : "https://api-jobonic.laconic.co.th/api/v1/service/offer/all";
    
            // 4. Pass the refined keywords to the correct API
            const databaseResponse = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    searchKeyword: refinedKeyword,
                    type: selectedCategory === "Find Service" ? "request" : "offer", // Use "offer" when searching for offers
                }),
            });
    
            const data = await databaseResponse.json();
    
            if (!data.ok) {
                throw new Error("Error fetching results from database");
            }
    
            // 5. Redirect to the appropriate page with the refined keyword
            if (selectedCategory === "Find Service") {
                router.push(`/serviceList?searchKeyword=${encodeURIComponent(refinedKeyword)}`);
            }
                router.push(`/offerList?searchKeyword=${encodeURIComponent(refinedKeyword)}`);
            
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false); // Stop loading
        }
        
        router.push(`/offerServices?searchKeyword=${searchKeyword}`);
    
    };
    

    return (
        <section className="flex flex-col items-center justify-center py-14 text-black">
            <Image
                src="/jobonic-black.svg"
                alt="Jobonic"
                width={600}
                height={600}
            />
            <p className="mt-3 text-lg md:text-xl mb-12">Where skills meet needs</p>

            <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col rounded-l-lg overflow-hidden sm:flex-row space-y-1 sm:space-y-0">
                <div className="flex-1 flex flex-row min-h-14">
                    <div className="flex-1">
                        <button
                            className={`p-3 w-full h-full bg-[#0B2147] font-medium text-sm border border-gray-300 rounded-l-lg
                                ${selectedCategory === "Find Service" ? "bg-[#0B2147] text-white" : "bg-white text-[#0B2147]"}`}
                            onClick={() => handleCategorySelect("Find Service")}
                        >
                            Find Service
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            className={`p-3 w-full h-full bg-[#0B2147] font-medium text-sm border border-gray-300 rounded-r-lg sm:rounded-none
                                ${selectedCategory === "Offer Service" ? "bg-[#0B2147] text-white" : "bg-white text-[#0B2147]"}`}
                            onClick={() => handleCategorySelect("Offer Service")}
                        >
                            Offer Service
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-row overflow-hidden min-h-14">
                    <div className="flex-1">
                        <input
                            ref={inputRef}
                            className="w-full h-full bg-white border border-gray-300 placeholder:text-sm rounded-l-lg sm:rounded-none"
                            type="text"
                            placeholder={placeholder}
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="px-4 w-full h-full border bg-[#D0693B] border-[#D0693B] text-white rounded-r-lg"
                        >
                            <MagnifyingGlassIcon className="size-6 font-bold text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Show loading spinner while fetching data */}
            {loading && (
                <div className="mt-8 w-full text-center">
                    <p>Loading...</p>
                </div>
            )}
        </section>
    );
};

export default TopSection;