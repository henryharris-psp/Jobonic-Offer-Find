import React, { useState } from 'react';
import Button from '@/components/Button';
import HireAgainContractModal from '@/components/contract/HireAgainContractModal';

const HireAgainButton = () => {
    const [showContractModal, setShowContractModal] = useState(false);

    return (
        <>
            <div className="flex flex-row items-center">
                <Button
                    title="Hire Again" 
                    onClick={()=> setShowContractModal(true)}               
                />
            </div>

            <HireAgainContractModal
                isOpen={showContractModal}
                onClose={()=> setShowContractModal(false)}
            />

        </>
    );
}

export default HireAgainButton