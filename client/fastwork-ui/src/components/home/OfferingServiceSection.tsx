import { checkProfile, getProfileId } from "@/functions/helperFunctions";
import Link from "next/link";
import React from "react";

const OfferingServiceSection: React.FC = (): React.ReactNode => {

    const handleCreateServiceOffer = async (event: React.FormEvent) => {
        event.preventDefault();
        const profileId = await getProfileId();
        console.log(profileId);
        const profile = await checkProfile(profileId);
        console.log(profile);
        // if (profile) {
        //   router.push('/customiseService');
        // } else {
        //   router.push('/createProfile');
        // }
    };

    return (
        <section className="py-16 flex justify-end items-center px-12 md:px-20">
            <div className="text-right">
                <h2
                    className="text-3xl md:text-5xl font-bold mb-1"
                    style={{ color: "#E1824F" }}
                >
                    Have a service to offer?
                </h2>
                <p className="mb-4" style={{ color: "#828282" }}>
                    Offer your services at Jobonic at no cost!
                </p>
                <div className="flex space-x-4 justify-end">
                    <button
                        onClick={(e) => handleCreateServiceOffer(e)}
                        className="bg-[#71BAC7] text-white py-2 px-4 rounded-lg"
                    >
                        Offer a service
                    </button>
                    <Link href="/offerServices">
                        <button className="bg-[#71BAC7] text-white py-2 px-4 rounded-lg">
                            View service requests
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OfferingServiceSection;
