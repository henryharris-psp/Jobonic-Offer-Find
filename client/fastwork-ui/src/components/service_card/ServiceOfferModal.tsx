import React, { useEffect, useState } from "react";
import ServiceOfferCard from "@/components/service_card/ServiceOfferCard";
import httpClient from "@/client/httpClient";
import { fetchServices } from "@/functions/helperFunctions";
import { Service } from "@/types/service";

interface ServiceOfferModalProps {
    onClick: (serviceId: string) => void;
}

const ServiceOfferModal = ({ 
    onClick 
}: ServiceOfferModalProps) => {
    const [setCloseModal, isSetCloseModal] = useState(false);
    const [serviceOfferOpen, SetServiceOfferOpen] = useState(false);
    const handleCloseModal = () => {
        isSetCloseModal(false);
    };

    const handleServiceOfferOpen = () => {
        SetServiceOfferOpen(true);
    };

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            try {
                const res = await fetchServices("request", signal, {
                    pageNumber: 1,
                    pageSize: 100,
                    sortBy: "price",
                    sortOrder: "DESC",
                    filter: {
                        searchKeyword: "",
                        minPricePerHour: "",
                        maxPricePerHour: "",
                        deadlineDate: "",
                        categoryId: "",
                    },
                });

                setServices(res?.content ?? []);
            } catch (error) {
                console.log(error);
            }
        })();

        return () => controller.abort();
    }, []);

    const handleOnServiceCardClick = (serviceId: string) => {
        onClick(serviceId);
    }

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-6 mt-8 text-center">
                Select your service offer that <br /> matches this request
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
                {services.length !== 0 ? services.map((service, index) => (
                    <ServiceOfferCard
                        key={index}
                        id={service.id}
                        title={service.title}
                        description={[
                            service.description1,
                            service.description2,
                            service.description3
                        ]}
                        rating={service.rating}
                        image={service.profileDTO.image}
                        onClick={handleOnServiceCardClick}
                    />
                )): ''}
            </div>
            <div className="mt-12 mb-4 flex justify-center items-center">
                <button
                    className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 mr-6 "
                    onClick={handleServiceOfferOpen}
                >
                    Create new service offer
                </button>
                <button
                    className="bg-gray-500 text-white py-2 px-12 rounded-lg hover:bg-gray-600"
                    onClick={handleCloseModal}
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default ServiceOfferModal;
