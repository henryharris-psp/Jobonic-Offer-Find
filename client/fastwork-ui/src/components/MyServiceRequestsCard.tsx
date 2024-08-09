"use client";

import React, { useState } from "react";
import Modal from "./Modal"; // Import the Modal component, adjust the path as necessary
import ApplicationPopupCard from "./ApplicationPopupCard"; // Import the ApplicationPopupCard component, adjust the path as necessary

// Define the props interface for the MyServiceRequestsCard component
interface MyServiceRequestsCardProps {
  title: string; // Title of the service request
  description: string[]; // Array of descriptions related to the service request
}

// Functional component for the MyServiceRequestsCard
const MyServiceRequestsCard: React.FC<MyServiceRequestsCardProps> = ({
                                                                       title,
                                                                       description,
                                                                     }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the visibility of the modal

  // Function to handle the "View Applications" button click
  const handleViewApplications = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Sample applications array - this data would typically be fetched from a server
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
        {/* Title of the service request */}
        <h3 className="font-bold text-lg text-black mb-4">{title}</h3>

        {/* Description list */}
        <ul className="text-gray-700 mb-4">
          {description.map((desc, index) => (
              <li key={index} className="mb-2 flex items-start">
                <span className="mr-2">•</span>
                <span>{desc}</span>
              </li>
          ))}
        </ul>

        {/* Button to view applications */}
        <div className="flex items-center justify-center">
          <button
              className="mt-4 px-4 py-2 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B]"
              onClick={handleViewApplications}>
            View Applications
          </button>
        </div>

        {/* Modal component to display the applications */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="max-w-full max-h-full mx-auto p-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Math tutor</h1> {/* Static title, could be dynamic based on the service */}
              <button
                  className="text-black bg-gray-200 rounded-md px-3 py-1 hover:bg-gray-300"
                  onClick={handleCloseModal}
              >
                &times; {/* Close button */}
              </button>
            </div>

            {/* Section title */}
            <h2 className="text-2xl font-bold mb-4">Applications</h2>

            {/* Container for displaying the application cards */}
            <div className="overflow-x-auto">
              <div className="flex space-x-4">
                {applications.map((app, index) => (
                    <ApplicationPopupCard
                        key={index} // Unique key for each application card
                        image={app.image} // Application's image
                        name={app.name} // Applicant's name
                        jobTitle={app.jobTitle} // Job title of the applicant
                        rating={app.rating} // Applicant's rating
                        description={app.description} // Description array for the applicant
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
