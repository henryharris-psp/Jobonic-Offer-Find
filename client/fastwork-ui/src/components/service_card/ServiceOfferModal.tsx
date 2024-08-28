import React, { useState } from "react";
import ServiceOfferCard  from "@/components/service_card/ServiceOfferCard";

const ServiceOfferModal : React.FC = () => {

    const [setCloseModal, isSetCloseModal] =useState(false);
    const [serviceOfferOpen, SetServiceOfferOpen] =useState(false);
    const handleCloseModal = () => {
        isSetCloseModal(false);
    };

    const handleServiceOfferOpen = () => {
        SetServiceOfferOpen(true);
    };

    const Services = [
        {
            title: "CS Goat",
            description: [
                "Finds bugs and destroys them",
                "Runs faster than your grandmother",
                "Is a GOAT",
            ],
            rating: "★★★★★",
            image: "",
        },

        {
            title: "Plumber",
            description: [
                "10 years of experience in plumbing",
                "Solve your water problems efficiently and effectively",
                "Top-quality service and reliable results.",
            ],
            rating: "★★★★★",
            image: "https://via.placeholder.com/50",
        },

        {
            title: "Accountant",
            description: [
                "20 years of counting money",
                "Personalize your accounts with expert guidance from me",
                "Yolo",
            ],
            rating: "★★★★★",
            image: "https://via.placeholder.com/50",
        },

    ];

    return(
        <div className="">
            <h1 className="text-3xl font-bold mb-6 mt-8 text-center">
                Select your service offer that <br/> matches this request
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
                {Services.map((service, index) => (
                    <ServiceOfferCard
                        key={index}
                        title={service.title}
                        description={service.description}
                        rating={service.rating}
                        image={service.image}
                    />
                ))}
            </div>
            <div className="mt-12 mb-4 flex justify-center items-center">
                <button className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 mr-6 "
                onClick={handleServiceOfferOpen}>
                    Create new service offer
                </button>
                <button className="bg-gray-500 text-white py-2 px-12 rounded-lg hover:bg-gray-600"
                        onClick={handleCloseModal}>
                    Skip
                </button>
            </div>

        </div>
    );

};

export default ServiceOfferModal;