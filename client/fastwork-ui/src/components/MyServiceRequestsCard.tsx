"use client";

import React, { useState } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import ApplicationPopupCard from "./ApplicationPopupCard"; // Adjust the import path as needed

interface MyServiceRequestsCardProps {
  title: string;
  description: string[];
}

const MyServiceRequestsCard: React.FC<MyServiceRequestsCardProps> = ({
  title,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewApplications = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Sample applications array
  const applications = [
    {
      image: "/group-image.jpg",
      name: "Jeremy",
      jobTitle: "Plumber",
      rating: 5,
      description: [
        "10 years of experience in plumbing",
        "Solve your water problems efficiently and effectively",
        "Top-quality service and reliable results.",
      ],
    },
    {
      image: "/group-image.jpg",
      name: "Jane",
      jobTitle: "Electrician",
      rating: 4,
      description: [
        "5 years of experience in electrical work",
        "Reliable and professional service",
        "Affordable rates and top-notch work quality.",
      ],
    },
    {
      image: "/group-image.jpg",
      name: "John",
      jobTitle: "Carpenter",
      rating: 4.5,
      description: [
        "8 years of experience in carpentry",
        "High-quality craftsmanship",
        "Affordable and reliable service.",
      ],
    },
  ];

  return (
    <div className="py-4 px-6 rounded-lg shadow-md flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
      <h3 className="font-bold text-lg text-black mb-4">{title}</h3>
      <ul className="text-gray-700 mb-4">
        {description.map((desc, index) => (
          <li key={index} className="mb-2 flex items-start">
            <span className="mr-2">•</span>
            <span>{desc}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        <button
          className="mt-4 px-4 py-2 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B]"
          onClick={handleViewApplications}>
          View Applications
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="max-w-full max-h-full mx-auto p-4 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Math tutor</h1>
            <button
              className="text-black bg-gray-200 rounded-md px-3 py-1 hover:bg-gray-300"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Applications</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {applications.map((app, index) => (
                <ApplicationPopupCard
                  key={index}
                  image={app.image}
                  name={app.name}
                  jobTitle={app.jobTitle}
                  rating={app.rating}
                  description={app.description}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyServiceRequestsCard;


