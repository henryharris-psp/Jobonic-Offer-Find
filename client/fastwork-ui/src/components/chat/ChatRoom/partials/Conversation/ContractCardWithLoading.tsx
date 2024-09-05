import httpClient from '@/client/httpClient';
import ServiceOfferCard from '@/components/service_card/ServiceOfferCard';
import { Service } from '@/types/service';
import React, { useEffect, useState } from 'react'
import Applied from '../DetailsHeader/ActionButtons/employerActionButtonsMap/Applied';
import { useChat } from '@/contexts/chat';
import MediaSkeleton from './MediaSkeleton';
import NewContractCard from '@/components/NewContractCard';
import Button from '@/components/Button';
import { ArrowPathIcon, CheckIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

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
    const { sendMessage, updateChatRoom } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [contract, setContract] = useState(null);

    const fetchContract = async () => {
        setIsLoading(true);
        try{
            const res = await axios.get(`http://localhost:8000/api/contracts/${contractId}`);
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
    const handleOnClickAccept = async () => {
        const newlySentMessage = await sendMessage('text', acceptContractMsg);
        if(newlySentMessage){
            await updateChatRoom(newlySentMessage.room_id, {
                status: 'waiting_for_payment'
            });
        }
    }

    return (
        isLoading ? (
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
                    <NewContractCard
                        contract={contract}
                    />
                    { !isSentByAuthUser && showActionButtons ? (
                        <div className="flex flex-row justify-between mb-4 mx-5 gap-1">
                            <Button
                                title="Edit"
                                size="sm"
                                icon={<PencilSquareIcon className="size-4"/>}
                                onClick={() => console.log('reject')}
                            />
                            <div className="flex justify-end gap-1">
                                <Button
                                    color="danger"
                                    title="Reject"
                                    size="sm"
                                    icon={<XMarkIcon className="size-4"/>}
                                    onClick={() => console.log('reject')}
                                />
                                <Button
                                    color="success"
                                    title="Accept"
                                    size="sm"
                                    icon={<CheckIcon className="size-4"/>}
                                    onClick={handleOnClickAccept}
                                />
                            </div>
                        </div>
                    ) : ''}
                </div>
            )
        )
    )
}

export default ContractCardWithLoading