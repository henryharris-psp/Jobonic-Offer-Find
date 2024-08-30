import ApplicantCard from "@/components/ApplicantCard";
import ApplicationPopupCard from "@/components/ApplicationPopupCard";
import AppliedCard from "@/components/AppliedCard";
import CancelledServiceCard from "@/components/CancelledServiceCard";
import CategoryCard from "@/components/CategoryCard";
import CategorySuggestions from "@/components/CategorySuggestions";
import DealCard from "@/components/DealCard";
import React from "react";

//TODO: only for testing purpose
const ComponentGallery = () => {
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
        </div>
    );
};

export default ComponentGallery;
