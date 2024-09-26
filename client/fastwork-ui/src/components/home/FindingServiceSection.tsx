import Link from "next/link";
import React from "react";

const FindingServiceSection: React.FC = (): React.ReactNode => {
    return (
        <section className="py-16 flex justify-start items-center">
            <div className="text-left">
                <h2
                    className="text-3xl md:text-5xl font-bold mb-1"
                    style={{ color: "#E1824F" }}
                >
                    Looking for a service?
                </h2>
                <p className="mb-4" style={{ color: "#828282" }}>
                    Meet your service needs with Jobonic
                </p>
                <div className="flex space-x-4">
                    <Link href="/findServices">
                        <button className="bg-[#71BAC7] font-semibold text-md text-white py-3 px-4 rounded-xl">
                            Find a service
                        </button>
                    </Link>
                    <Link href="/serviceList">
                        <button className="bg-[#71BAC7] font-semibold text-md text-white py-3 px-4 rounded-xl">
                            View service offers
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FindingServiceSection;
