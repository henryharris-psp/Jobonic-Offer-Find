import React from 'react';
import { Service } from '@/types/service';
import { CurrencyDollarIcon, MapPinIcon } from '@heroicons/react/24/solid';

interface ServiceModalProps {
    service: Service | null;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={onClose}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{service.title}</h2>

                <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-gray-600 flex items-center">
                            <strong className="mr-2">Category:</strong>
                            <span>{service.categoryDTO?.name || 'N/A'}</span>
                        </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-gray-600 flex items-center">
                            <strong className="mr-2">Company:</strong>
                            <span>{service.profileDTO.firstName || 'N/A'}</span>
                        </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm flex items-center">
                        <MapPinIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <strong className="mr-2">Location:</strong>
                        <span>{service.location || 'N/A'}</span>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-gray-600 flex items-center">
                            <strong className="mr-2">Employment Type:</strong>
                            <span>{service.employmentType || 'N/A'}</span>
                        </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-gray-600">
                            <strong>Description 1:</strong> {service.description1}
                        </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-gray-600">
                            <strong>Description 2:</strong> {service.description2}
                        </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-gray-600">
                            <strong>Description 3:</strong> {service.description3}
                        </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm flex items-center">
                        <CurrencyDollarIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <strong className="mr-2">Budget:</strong>
                        <span>{service.price}</span>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-gray-600">
                            <strong>Deadline:</strong> {service.serviceRequestDTO?.submissionDeadline || 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
