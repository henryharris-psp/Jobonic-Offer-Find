import httpClient from '@/client/httpClient';
import ServiceOfferCard from '@/components/service_card/ServiceOfferCard';
import { Service } from '@/types/service';
import React, { useEffect, useState } from 'react'
import Applied from '../DetailsHeader/ActionButtons/employerActionButtonsMap/Applied';
import { useChat } from '@/contexts/chat';
import MediaSkeleton from './MediaSkeleton';
import Invited from '../DetailsHeader/ActionButtons/freelancerActionButtonsMap/Invited';

interface ServiceOfferCardWithLoadingProps {
    serviceId: string,
    isSentByAuthUser: boolean
}

const ServiceOfferCardWithLoading = ({
    serviceId,
    isSentByAuthUser
}: ServiceOfferCardWithLoadingProps) => {
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
            <div className="flex flex-col mx-2 bg-[#CFEDF4] rounded-xl">
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
                        <Applied/>
                    </div>
                ) : ''}

                { !isSentByAuthUser && activeChatRoom?.status === 'invited' ? (
                    <div className="flex justify-end mb-4 mx-5">
                        <Invited/>
                    </div>
                ) : ''}
            </div>
        )
    )
}

export default ServiceOfferCardWithLoading