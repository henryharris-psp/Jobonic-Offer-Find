'use client'
import ApplicantCard from "@/components/ApplicantCard";
import ApplicationPopupCard from "@/components/ApplicationPopupCard";
import AppliedCard from "@/components/AppliedCard";
import CancelledServiceCard from "@/components/CancelledServiceCard";
import CategoryCard from "@/components/CategoryCard";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";
import StarRating from "@/components/StarRating";
import ToReviewCard from "@/components/ToReviewCard";
import InChatPaymentReceiptCard from "@/components/chat/ChatRoom/partials/Conversation/InChatPaymentReceiptCard";
import React, { useState } from "react";

//TODO: only for testing purpose
const ComponentGallery = () => {

    const [value, setValue] = useState('');

    const handleOnInputChange = (e: SafeInputChangeEvent) => {
        setValue(e.currentTarget.value);
    }
    
    //start component
    const [star, setStar] = useState(0);

    const generateRandomTransitionId = () => {
        const randomNum = Math.floor(100000000 + Math.random() * 900000000);
        return `#TRX${randomNum}`;
    }
    const transitionId = generateRandomTransitionId();

    return (
        <div className="flex flex-col space-y-5 m-5">
            <ApplicantCard
                title="ApplicantCard"
                description={["desc1", "desc2"]}
                avatar="avatar"
                username="usename"
            />

            <ApplicationPopupCard
                image="image"
                name="ApplicationPopupCard"
                jobTitle="job title"
                rating={4}
                description={["desc1", "desc2"]}
            />

            <AppliedCard
                title="AppliedCard"
                description={["desc1", "desc2"]}
                avatar="avatar"
                username="usename"
            />

            <CancelledServiceCard
                title="CancelledServiceCard"
                earned="100"
                description={[
                    {
                        avatar: 'avatar',
                        username: 'username',
                        review: 'review'
                    }
                ]}
                details={["desc1", "desc2"]}
            />

            <CategoryCard
                categories={[
                    {
                        category: "category",
                        image: "image",
                        description: "desc1"
                    }
                ]}
            />

            <StarRating
                size="6xl"
                value={star}
                totalStars={5}
                onChange={(value) => setStar(value)}
            />

            <SafeInput
                type="decimal"
                value={value}
                onChange={handleOnInputChange}
                placeholder="Custom Number Input"
                disabled
                warningMessages={[
                    'fdfdf',
                    'fxxxxx'
                ]}
            />

            <InChatPaymentReceiptCard
                paidAmount={2333.33}
                paidDate="12/01/2024"
                transitionId={transitionId}
                billedTo="Jobonic"
                paymentMethod="Payni"
            />

            {/* <DealCard
                image="image"
                title="title"
                rating={3}
                description={["desc1", "desc2"]}
                price="100"
                onAccept={() => console.log('on accept')}
                onEditOffer={() => console.log('on edit offer')}
                onDeclineAndSendMessage={() => console.log('onDeclineAndSendMessage')}
            /> */}

            <ToReviewCard
                title="review"
                earned="33"
                description={[
                    {
                        avatar: 'logo.svg',
                        username: 'lynn',
                        review: 'Review  123'
                    }
                ]}
            />

            <span>Dev version - 1.0.2</span>
        </div>
    );
};

export default ComponentGallery;
