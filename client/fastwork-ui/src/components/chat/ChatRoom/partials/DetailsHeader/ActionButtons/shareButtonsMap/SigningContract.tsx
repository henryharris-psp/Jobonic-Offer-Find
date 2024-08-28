import React, { useState } from "react";
import Button from "@/components/Button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const SigningContract = () => {
    const [showContract, setShowContract] = useState(false);

    //methods
        const handleOnCreateContract = () => {
            setShowContract(true);
        }

        const handleOnCloseContract = () => {
            setShowContract(false);
        }
    
    return (
        <>
            <div className="flex flex-row items-center gap-1">
                <Button 
                    title="Create Contract" 
                    icon={<PencilSquareIcon className="size-5 font-bold text-bold"/>}
                    iconPositon="start"
                    size="sm"
                    onClick={handleOnCreateContract} 
                />
            </div>
            { showContract ? (
                <div 
                    className="flex items-center justify-center fixed z-50 top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-50"
                    onClick={handleOnCloseContract}    
                >
                    Contract Creation
                </div>
            ): ''}
        </>
    );
};

export default SigningContract;
