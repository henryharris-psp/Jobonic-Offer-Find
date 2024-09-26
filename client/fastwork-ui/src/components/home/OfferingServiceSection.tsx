import { checkProfile, getProfileId } from "@/functions/helperFunctions";
import { RootState } from "@/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const OfferingServiceSection: React.FC = (): React.ReactNode => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    const handleCreateServiceOffer = async (event: React.FormEvent) => {
        event.preventDefault();
        const profileId = await getProfileId();
        console.log(profileId);
        const profile = await checkProfile(profileId);
        console.log(profile);

        if (!authUser?.profile) {
            // If the user is not logged in, redirect to the registration page
            window.location.href = '/register';
            return;
        }
    };



    return (
        <section className="py-16 flex justify-end items-center">
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
                    <Link href="/offerServices">
                        <button
                            onClick={() => handleCreateServiceOffer}
                            className="bg-[#71BAC7] font-semibold text-md text-white py-3 px-4 rounded-xl"
                        >
                            Offer a service
                        </button>
                    </Link>

                    <Link href="/offerServices">
                        <button className="bg-[#71BAC7] font-semibold text-md text-white py-3 px-4 rounded-xl">
                            View service requests
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OfferingServiceSection;
