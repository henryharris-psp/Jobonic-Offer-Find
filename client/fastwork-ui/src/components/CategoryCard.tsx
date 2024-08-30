'use client';
import Image from 'next/image';

interface Category {
  category: string;
  image: string;
  description: string;
}

interface CategoryCardProps {
  categories: Category[];
}

const CategoryCard = ({categories}: CategoryCardProps): React.ReactElement => {
    return (
      <section className="bg-gray-200 py-16 px-4 md:px-0">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-black">Job Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md h-full hover:cursor-pointer" onClick={() => window.location.href = '/jobList'}>
                <h3 className="text-lg font-bold mb-2 text-black">{category.category}</h3>
                <div className="ml-4">
                  <Image height={300} width={300} src={`/${category.image}`} alt={category.category} priority className="lg:w-60 max-w-full h-56 hidden sm:block sm:w-20" />
                </div>
                <p className="text-sm text-gray-700 mt-2">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}

export default CategoryCard;
