import ContractCard from "@/components/ContractCard";
import Image from "next/image";
import React, { useState } from "react";

const Details = () => {

    //modal handler
        const [isOpenModal, setIsOpenModal] = useState(false);

        const handleViewContractDetails = () => {
            setIsOpenModal(true);
        };

        const handleCloseModal = () => {
            setIsOpenModal(false);
        }

    return (
        <>
            <div className="flex flex-col bg-white shadow-lg">
                <div className="flex flex-row flex-wrap gap-3 items-center border-b border-b-gray-200 py-4 px-6">
                    
                    <div className="flex flex-1 flex-wrap gap-3 flex-row justify-between items-center">
                        <div className="flex flex-row mb-1 space-x-3 overflow-hidden">
                            <Image
                                src="/avatar.svg"
                                alt="avatar"
                                height={60}
                                width={60}
                                className="rounded-full"
                            />
                            <div className="flex flex-col space-y-1">
                                <span className="text-3xl font-bold">fdffdfddgg</span>
                                <span className="text-xs text-gray-500 font-semibold">
                                    Last seen yesterday, 23:88
                                </span>                   
                            </div>
                        </div>

                        <div className="flex flex-1 flex-row items-center justify-evenly space-x-3">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-semibold whitespace-nowrap text-start">is finding service</span>
                                <span className="text-2xl font-bold">Pluming</span>                   
                            </div>
                            <button className="bg-[#82BDC5] px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap text-start">
                                MileStone 1
                            </button>
                        </div>

                    </div>

                    <div className="flex min-w-72 flex-1 flex-row flex-wrap gap-1 w-80">
                        <button className="flex-1 whitespace-nowrap text-center bg-[#D0693B] px-3 py-2 rounded-lg text-sm text-white">
                            Submit File
                        </button>
                        <button className="flex-1 whitespace-nowrap text-center bg-[#D0693B] px-3 py-2 rounded-lg text-sm text-white">
                            Done
                        </button>
                        <button 
                            className="flex-1 whitespace-nowrap text-center bg-[#D0693B] px-3 py-2 rounded-lg text-sm text-white"
                            onClick={handleViewContractDetails}    
                        >
                            View Contract
                        </button>
                        <button className="flex-1 whitespace-nowrap text-center bg-[#D0693B] px-3 py-2 rounded-lg text-sm text-white">
                            View payout terms
                        </button>
                        <button className="flex-1 whitespace-nowrap text-center bg-[#D0693B] px-3 py-2 rounded-lg text-sm text-white">
                            Do not end contract
                        </button>
                    </div>

                </div>
                <div className="flex items-center justify-center p-3">
                    <span className="text-xs text-red-500 text-center ">
                        Freelancer Aems have requested for another cancellation payout amount. Do you agree or wish to appeal payout terms?
                    </span>
                </div>
            </div>
            {isOpenModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="bg-white w-[60%] p-2 rounded-lg ml-8 sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[60%]">
                        <button
                            className="bg-[#E1824F] text-white p-2 rounded-3xl mb-2"
                            onClick={handleCloseModal}
                        >
                            ❌
                        </button>
                        <ContractCard 
                            handleCloseModal={handleCloseModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Details;
