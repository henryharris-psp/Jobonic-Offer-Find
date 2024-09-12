import httpClient from '@/client/httpClient';
import ServiceOfferCard from '@/components/service_card/ServiceOfferCard';
import { Service } from '@/types/service';
import React, { useEffect, useState } from 'react'
import { useChat } from '@/contexts/chat';
import MediaSkeleton from './MediaSkeleton';
import PotentialHireButtons from '../action_buttons/PotentialHireButtons';
import AcceptInvitationButtons from '../action_buttons/AcceptInvitationButtons';

interface InChatServiceOfferCardProps {
    serviceId: string,
    isSentByAuthUser: boolean
}

const InChatServiceOfferCard = ({
    serviceId,
    isSentByAuthUser
}: InChatServiceOfferCardProps) => {
    const { activeChatRoom } = useChat();
    const [service, setService] = useState<Service | null>(null);

    useEffect( () => {
        const controller = new AbortController();
        const signal = controller.signal;
        ( async () => {
            try{
                const res = await httpClient.get(`/service/get?serviceId=${serviceId}`, { signal })
                setService(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
        return () => controller.abort();
    }, []);

    return (
        !service ? (
            <MediaSkeleton/>
        ) : (
            <div className="flex flex-col bg-[#CFEDF4] rounded-xl">
                <ServiceOfferCard
                    size="sm"
                    id={service.id}
                    title={service.title}
                    description={[
                        service.description,
                        service.description1,
                        service.description2,
                        service.description3
                    ]}
                    rating={2} //TODO: bind with actual data
                    image={service.profileDTO.image}
                />
                { !isSentByAuthUser && activeChatRoom?.status === 'applied' ? (
                    <div className="flex justify-end mb-4 mx-5">
                        <PotentialHireButtons/>
                    </div>
                ) : ''}

                { !isSentByAuthUser && activeChatRoom?.status === 'invited' ? (
                    <div className="flex justify-end mb-4 mx-5">
                        <AcceptInvitationButtons/>
                    </div>
                ) : ''}
            </div>
        )
    )
}

export default InChatServiceOfferCard