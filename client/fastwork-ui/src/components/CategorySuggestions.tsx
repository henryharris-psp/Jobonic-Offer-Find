'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import initialiseCategories from "@/utils/initialiseCategories";


const CategorySuggestions = (): React.ReactElement => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const fetchCategory = async () => {
    try {
      const res = await initialiseCategories();
      setCategoryList(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  
  return (
    <section className="py-16 px-4 md:px-0">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start">
        <div className="text-left mb-8 md:mb-0 md:mr-8">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-1">No idea what you’d like?</h2>
          <p className="text-gray-500 mb-4">Here are some services available</p>
          <Link href="/serviceList">
            <button className="bg-[#0B2147] text-white py-2 px-4 rounded-lg hover:bg-[#D0693B]">More</button>
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-6">
          {categoryList.map((category, index) => (
            <Link key={index} href={`/serviceList?category=${encodeURIComponent(category.name)}`}>
              <div className="bg-[#0B2147] text-white rounded-lg px-4 py-2 shadow-md hover:cursor-pointer hover:bg-[#D0693B]">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySuggestions;