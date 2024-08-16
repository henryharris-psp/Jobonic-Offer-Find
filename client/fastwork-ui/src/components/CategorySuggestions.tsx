"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import httpClient from "@/client/httpClient";

const CategorySuggestions = (): React.ReactElement => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setIsLoading(true);
        (async () => {
            try{
                const res = await httpClient.get('category/all', { signal });
                setCategoryList(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
        
        return () => controller.abort();
    }, []);

    return (
        <div className="flex flex-row flex-wrap p-10 md:p-20">

            <div className="flex flex-col w-52 m-2">
                <h2 className="text-2xl md:text-4xl font-bold text-black mb-1">
                    No idea what you’d like?
                </h2>
                <p className="text-gray-500 mb-4">
                    Here are some services available
                </p>
                <Link href="/serviceList">
                    <button className="bg-[#0B2147] text-white py-2 px-4 rounded-lg hover:bg-[#D0693B]">
                        More
                    </button>
                </Link>
            </div>

            <div className="flex-1 flex flex-wrap items-center m-2 min-w-96">
                {categoryList.map((category, index) => (
                    <Link
                        key={index}
                        href={`/serviceList?category=${encodeURIComponent(
                            category.name
                        )}`}
                        className="m-2"
                    >
                        <div className="bg-[#0B2147] text-white rounded-lg px-4 py-2 shadow-md hover:cursor-pointer hover:bg-[#D0693B]">
                            {category.name}
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default CategorySuggestions;
