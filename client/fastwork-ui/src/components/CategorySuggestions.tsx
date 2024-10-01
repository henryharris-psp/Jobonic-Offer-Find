"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import httpClient from "@/client/httpClient";
// @ts-ignore
import CategoryItem from "./findServices/CategoryItem";
import { Category } from "@/types/general";
// @ts-ignore
import CategorySkeleton from "./findServices/CategoryItemSkeleton";

const skeletonCount = Array.from({ length: 15 }, (_, index) => index);

const CategorySuggestions = (): React.ReactElement => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setIsLoading(true);
        (async () => {
            try {
                const res = await httpClient.post('category/all', {
                    pageNumber: 1,
                    pageSize: 100,
                    sortBy: 'id',
                    sortOrder: 'DESC',
                    filter: {
                        searchKeyword: ''
                    }
                } ,{ signal });
                setCategoryList(res.data.content);
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
            <div className="flex flex-col w-full lg:max-w-72 mt-3 mb-10 mx-2">
                <h2 className="text-4xl md:text-4xl font-bold text-black mb-1">
                    No idea what you&apos;d like?
                </h2>
                <p className="text-gray-500 mb-4">
                    Here are some services available
                </p>
                <Link href="/serviceList">
                    <button className="bg-[#0B2147] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#D0693B]">
                        More
                    </button>
                </Link>
            </div>

            <div className="flex-1 flex flex-wrap items-center min-w-96">
                {isLoading
                    ? skeletonCount.map((id) => <CategorySkeleton key={id} />)
                    : categoryList.map((category) => (
                        <CategoryItem
                            key={category.id}
                            id={category.id}
                            name={category.name}
                        />
                    ))}
            </div>
        </div>

    );
};

export default CategorySuggestions;
