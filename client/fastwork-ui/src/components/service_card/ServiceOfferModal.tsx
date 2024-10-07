import React, { useEffect, useState } from "react";
import ServiceOfferCard from "@/components/service_card/ServiceOfferCard";
import httpClient from "@/client/httpClient";
import { fetchServices } from "@/functions/helperFunctions";
import { Service } from "@/types/service";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface ServiceOfferModalProps {
    onClick: (serviceId: string) => void;
    type: 'offer' | 'request';
}

const ServiceOfferModal = ({ 
    onClick,
    type,
}: ServiceOfferModalProps) => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const [setCloseModal, isSetCloseModal] = useState(false);
    const handleCloseModal = () => {
        isSetCloseModal(false);
    };

    const handleNewServiceOffer = () => {
        window.location.href = "/customiseService";
    };

    const handleNewServiceRequest = () => {
        window.location.href = "/customiseJobRequestForm";
    };

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            try {
                const res = await fetchServices(type, {
                    pageNumber: 1,
                    pageSize: 100,
                    sortBy: "",
                    sortOrder: "DESC",
                    filter: {
                        searchKeyword: [],
                        minPricePerHour: "",
                        maxPricePerHour: "",
                        deadlineDate: "",
                        categoryId: "",
                    },
                    authId: authUser?.profile.id || 0,
                    postedByAuthUser: true,
                }, signal);

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
        <div className="bg-white rounded-xl">
            <div className="flex flex-col space-y-8 p-10">
                <h1 className="text-3xl font-bold text-center">
                    Select your service offer that <br /> matches this request
                </h1>
                <div className="overflow-auto max-h-96">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto">
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
                </div>
                <div className="mt-12 mb-4 flex justify-center items-center">
                    {type == 'offer' ? (
                        <button
                            className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 mr-6 "
                            onClick={handleNewServiceOffer}
                        >
                            Create new service offer
                        </button>
                    ) : (
                        <button
                            className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 mr-6 "
                            onClick={handleNewServiceRequest}
                        >
                            Create new service request
                        </button>
                    )}
                    <button
                        className="bg-gray-500 text-white py-2 px-12 rounded-lg hover:bg-gray-600"
                        onClick={handleCloseModal}
                    >
                        Skip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceOfferModal;
