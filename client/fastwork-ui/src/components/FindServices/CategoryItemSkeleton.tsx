import React from "react";

const CategorySkeleton = () => {
    const randomWidth = Math.floor(Math.random() * 130) + 120;

    return (
        <div 
            className="bg-gray-300 animate-pulse h-10 rounded-lg shadow-md m-2"
            style={{
                width: randomWidth
            }}  
        />
    );
};

export default CategorySkeleton;
