import { Category } from "@/types/general";
import Link from "next/link";
import React from "react";

const CategoryItem = ({
    id,
    name
}: Category) => {
    return (
        <Link 
            className="m-2"
            href={`/serviceList?categoryId=${encodeURIComponent(name)}`} // Use categoryId here
        >
            <div className="bg-[#0B2147] text-white rounded-lg text-sm font-medium px-4 py-3 shadow-md hover:cursor-pointer hover:bg-[#D0693B]">
                {name}
            </div>
        </Link>
    );
};

export default CategoryItem;
