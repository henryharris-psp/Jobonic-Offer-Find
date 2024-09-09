import React, { useEffect, useState } from 'react'
import { useChat } from '@/contexts/chat';
import MediaSkeleton from './MediaSkeleton';
import ContractCard from '@/components/contract/ContractCard';
import Button from '@/components/Button';
import { ArrowPathIcon, CheckIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Modal from '@/components/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import httpClient from '@/client/httpClient';
import { Contract } from '@/types/general';

interface ContractCardWithLoadingProps {
    contractId: string | number,
    isSentByAuthUser: boolean,
    showActionButtons?: boolean
}

const acceptContractMsg = `Contract is signed by both users. Let's get started`;

const ContractCardWithLoading = ({
    contractId,
    isSentByAuthUser,
    showActionButtons = true
}: ContractCardWithLoadingProps) => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { sendMessage } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [contract, setContract] = useState<Contract | null>(null);
    const [showContractModal, setShowContractModal] = useState(false);

    //TODO: move to RTK client
    const fetchContract = async () => {
        setIsLoading(true);
        try{
            //get_contract
            const res = await httpClient.get(`contract/${contractId}`);
            setContract(res.data);
        } catch (error) {
            console.log('error fetching contract', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchContract();
    }, []);

    //methods
        //accept_contract
        const handleOnClickAccept = async () => {
            if(contract){
                if(confirm("Are you sure to accept contract?")){
                    try{
                        //on_accept_contract
                        await httpClient.put(`contract/${contractId}`, {
                            matchesId: contract.matchesId,
                            price: contract.price,
                            deliverable: contract.deliverable,
                            profileId: contract.profileId,
                            acceptBy: [...contract.acceptBy, authUser?.profile?.id],
                        });
                        await sendMessage('text', acceptContractMsg);
                    } catch (error) {
                        console.log('error', error);
                    }
                }
            }
        }

        const handleOnClickEdit = () => {
            setShowContractModal(true);
        }

        const handleOnCloseContract = () => {
            setShowContractModal(false)
        }

    return (
        <>
            { isLoading ? (
                <MediaSkeleton/>
            ) : (
                !contract ? (
                    <div className="relative">
                        <MediaSkeleton/>
                        <div className="flex items-center justify-center absolute top-0 right-0 left-0 bottom-0">
                            <button 
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300"
                                onClick={fetchContract}    
                            >
                                <span className="">
                                    <ArrowPathIcon className={`size-5 font-bold text-gray-600 ${isLoading ? 'animate-spin' : ''}`}/>
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col mx-2 bg-white rounded-xl border border-gray-200 shadow">
                        <ContractCard
                            contract={contract}
                        />
                        { !isSentByAuthUser && showActionButtons ? (
                            <div className="flex flex-row justify-between mb-4 mx-5 gap-1">
                                <Button
                                    title="Edit"
                                    size="sm"
                                    icon={<PencilSquareIcon className="size-4"/>}
                                    onClick={handleOnClickEdit}
                                />
                                <Button
                                    color="success"
                                    title="Accept"
                                    size="sm"
                                    icon={<CheckIcon className="size-4"/>}
                                    onClick={handleOnClickAccept}
                                />
                            </div>
                        ) : ''}
                    </div>
                )
            )}

            <Modal
                isOpen={showContractModal}
                onClose={handleOnCloseContract}
            >
                <ContractCard
                    contract={contract}
                    isEditMode={true}
                    onClose={handleOnCloseContract}
                />
            </Modal>
        </>
    )
}

export default ContractCardWithLoading