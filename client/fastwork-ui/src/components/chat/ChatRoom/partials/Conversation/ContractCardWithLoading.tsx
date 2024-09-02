import httpClient from '@/client/httpClient';
import ServiceOfferCard from '@/components/service_card/ServiceOfferCard';
import { Service } from '@/types/service';
import React, { useEffect, useState } from 'react'
import Applied from '../DetailsHeader/ActionButtons/employerActionButtonsMap/Applied';
import { useChat } from '@/contexts/chat';
import MediaSkeleton from './MediaSkeleton';
import NewContractCard from '@/components/NewContractCard';
import Button from '@/components/Button';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface ContractCardWithLoadingProps {
    contractId: string | number,
    isSentByAuthUser: boolean
}

const ContractCardWithLoading = ({
    contractId,
    isSentByAuthUser
}: ContractCardWithLoadingProps) => {
    const { activeChatRoom } = useChat();
    const contracts = activeChatRoom ? activeChatRoom.contracts : [];
    const contract = contracts.find( e => e.id === contractId);

    return (
        !contract ? (
            <MediaSkeleton/>
        ) : (
            <div className="flex flex-col mx-2 bg-white rounded-xl border border-gray-200 shadow">
                <NewContractCard
                    contract={contract}
                />
                { !isSentByAuthUser ? (
                    <div className="flex justify-end mb-4 mx-5 gap-1">
                        <Button
                            title="Reject"
                            size="sm"
                            icon={<XMarkIcon className="size-4"/>}
                            onClick={() => console.log('reject')}
                        />
                        <Button
                            title="Accept"
                            size="sm"
                            icon={<CheckIcon className="size-4"/>}
                            onClick={() => console.log('accept')}
                        />
                    </div>
                ) : ''}
            </div>
        )
    )
}

export default ContractCardWithLoading