'use client';

import { baseURL } from '@/baseURL';
import httpClient from '@/client/httpClient';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const CategorySuggestions = (): React.ReactElement => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const fetchCategory = async () => {
    const response = await httpClient.get(`${baseURL}/api/v1/category/all`);
    setCategoryList(response.data);
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








/*'use client';
import Image from 'next/image';

interface Category {
  category: string;
  image: string;
  description: string;
}

interface CategoryCardProps {
  categories: Category[];
}

const CategorySuggestions = ({categories}: CategoryCardProps): React.ReactElement => {
    return (
      <section className="bg-gray-200 py-16 px-4 md:px-0">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-black">Job Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md h-full hover:cursor-pointer" onClick={() => window.location.href = '/jobList'}>
                <h3 className="text-lg font-bold mb-2 text-black">{category.category}</h3>
                <div className="ml-4">
                  <Image src={category.image} alt={category.category} priority className="lg:w-60 max-w-full h-56 hidden sm:block sm:w-20" />
                </div>
                <p className="text-sm text-gray-700 mt-2">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}

export default CategorySuggestions;
*/