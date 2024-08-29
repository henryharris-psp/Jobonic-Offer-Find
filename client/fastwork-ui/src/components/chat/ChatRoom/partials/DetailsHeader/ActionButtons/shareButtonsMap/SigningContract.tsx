import React, { useState } from "react";
import Button from "@/components/Button";
import { DocumentTextIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ContractCard from "@/components/ContractCard";

const SigningContract = () => {
    const [showContractModal, setShowContractModal] = useState(false);

    //methods
        const handleOnCreateContract = () => {
            setShowContractModal(true);
        }

        const handleOnCloseContract = () => {
            setShowContractModal(false);
        }

        const handleOnClickViewContract = () => {
            setShowContractModal(true);
        }
    
    return (
        <div>
            <div className="flex flex-row items-center gap-1">
                <Button 
                    title="View Contract" 
                    icon={<DocumentTextIcon className="size-5 font-bold text-bold"/>}
                    iconPositon="start"
                    size="sm"
                    onClick={handleOnClickViewContract} 
                />
                <Button 
                    title="Create Contract" 
                    icon={<PencilSquareIcon className="size-5 font-bold text-bold"/>}
                    iconPositon="start"
                    size="sm"
                    onClick={handleOnCreateContract} 
                />
            </div>

            <span className="text-red-500 text-xs">
                // todo:  render conditionally
            </span>
            { showContractModal ? (
                <div className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-40 z-50">
                    <div className="relative">
                        <button 
                            className="absolute -top-3 -right-3 bg-gray-500 hover:bg-gray-400 p-1 rounded-full border border-white"
                            onClick={handleOnCloseContract}
                        >
                            <XMarkIcon className="size-5 text-white"/>
                        </button>
                        <ContractCard/>
                    </div>
                </div>
            ): ''}
        </div>
    );
};

export default SigningContract;
