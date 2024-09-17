import React, { useEffect, useState } from 'react'
import { useChat } from '@/contexts/chat';
import MediaSkeleton from './MediaSkeleton';
import Button from '@/components/Button';
import { ArrowPathIcon, CheckCircleIcon, CheckIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import httpClient from '@/client/httpClient';
import { Contract } from '@/types/general';
import { fetchContract } from '@/functions/helperFunctions';
import ContractCard from '@/components/contract/ContractCard';
import DateParser from '@/functions/dateParser';

interface InChatContractCardProps {
    contractId: string | number;
    isSentByAuthUser: boolean;
    updatedAt: string;
}

const acceptContractMsg = `I satisfied with your updated contract and have signed.`;

const InChatContractCard = ({
    contractId,
    isSentByAuthUser,
    updatedAt
}: InChatContractCardProps) => {
    const dateParser = new DateParser();
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { activeChatRoom, sendMessage, updateChatRoom, latestContract } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [contract, setContract] = useState<Contract | null>(null);
    const [showContractModal, setShowContractModal] = useState(false);

    const isLatestContract: boolean = contractId === latestContract?.id;
    const isAccepted = isLatestContract && latestContract?.acceptBy.length === 2;

    //on mounted
    useEffect(() => {
        getContract();
    }, []);

    //methods
        const getContract = async () => {
            const controller = new AbortController();
            const signal = controller.signal;

            setIsLoading(true);
            try{
                //get_contract
                const contractRes = await fetchContract(contractId, signal);
                if(contractRes) setContract(contractRes);
            } catch (error) {
                console.log('error fetching contract', error);
            } finally {
                setIsLoading(false);
            }
        }

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
                        const newlySentMessage = await sendMessage('payment_request', activeChatRoom?.match_id.toString(), 'system');
                        if(newlySentMessage){
                            await updateChatRoom(newlySentMessage.room_id, {
                                status: 'payment_verification'
                            });
                        }
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
                                onClick={getContract}    
                            >
                                <span className="">
                                    <ArrowPathIcon className={`size-5 font-bold text-gray-600 ${isLoading ? 'animate-spin' : ''}`}/>
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`flex flex-col rounded-xl border border-gray-200 shadow-md ${
                        isAccepted ? 'bg-green-100' : 'bg-white'
                    }`}>
                        { isAccepted ? (
                            <div className="flex flex-row justify-between items-center px-2 pt-2">
                                <span className="text-green-400 font-semibold ml-1">
                                    Confirmed Contract
                                </span>
                                <CheckCircleIcon className="size-8 text-green-400"/>
                            </div>
                        ) : (
                            <div className="flex flex-row justify-between items-center px-3 pt-3 pb-1">
                                <span className="text-yellow-400 text-sm font-semibold">
                                    { isSentByAuthUser ? 'You' : activeChatRoom?.sender.firstName } just updated the contract
                                </span>
                                <div className="flex flex-row items-center space-x-1 min-w-16">
                                    <ClockIcon className="size-3 text-gray-400"/>
                                    <span className="text-xs text-gray-400">
                                        { dateParser.getTime(updatedAt) }
                                    </span>
                                </div>
                            </div>  
                        )}
                        <ContractCard
                            title={activeChatRoom?.service?.title ?? ''}
                            contract={contract}
                            isAccepted={isAccepted}
                            size="xs"
                        />
                        { !isSentByAuthUser && isLatestContract && !isAccepted ? (
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
                    title={activeChatRoom?.service?.title ?? ''}
                    contract={contract}
                    isEditMode={true}
                    onClose={handleOnCloseContract}
                />
            </Modal>
        </>
    )
}

export default InChatContractCard