import React, { useState } from 'react';
import Button from '@/components/Button';
import HireAgainContractModal from '@/components/contract/HireAgainContractModal';
import LatestContractModal from '@/components/contract/LatestContractModal';

const HireAgainButton = () => {
    const [showContractModal, setShowContractModal] = useState(false);

    return (
        <>
            <div className="flex flex-row items-center">
                <Button
                    size="sm"
                    title="Hire Again" 
                    onClick={()=> setShowContractModal(true)}               
                />
            </div>

            <LatestContractModal
                key={Math.random()}
                isOpen={showContractModal}
                defaultEditMode={true}
                onClose={()=> setShowContractModal(false)}
            />

        </>
    );
}

export default HireAgainButton