import { useChat } from "@/contexts/chat";
import { RootState } from "@/store";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ActionButtons from "./ActionButtons";
import StringParser from "@/functions/stringParsers";

const DetailsHeader = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom } = useChat();
    const stringParser = new StringParser();

    return (
        <div className="flex flex-col bg-white shadow-lg">
            <div className="flex flex-row flex-wrap gap-5 items-center border-b border-b-gray-200 py-4 px-6">
                {/* receiver details */}
                <div className="flex flex-1 flex-row mb-1 min-w-48 space-x-3 overflow-hidden">
                    <Image
                        src="/avatar.svg"
                        alt="avatar"
                        height={60}
                        width={60}
                        className="rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                        <span className="text-3xl font-bold capitalize">
                            {activeChatRoom?.receiver?.firstName}
                        </span>
                        <span className="text-xs text-gray-500 font-semibold">
                            Last seen yesterday, 23:88
                        </span>
                    </div>
                </div>

                {/* service status and MileStone */}
                <div className="flex flex-1 flex-row items-center justify-between space-x-5">
                    <div className="flex flex-col space-y-2">
                        <span className="text-xs text-gray-500 font-semibold whitespace-nowrap text-start">
                            {authUser?.profile.id === activeChatRoom?.freelancer_id
                                ? "is finding service"
                                : "is offering service"}
                        </span>
                        <span className="text-xl font-bold">
                            App Designer
                        </span>
                    </div>
                    <div className="bg-[#82BDC5] px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap text-start">
                        <span className="capitalize text-sm">
                            {stringParser.replaceUnderscoreWithSpace(activeChatRoom?.status ?? '')}
                        </span>
                    </div>
                </div>

                {/* action buttons */}
                <div className="flex flex-1 justify-center items-center">
                    <ActionButtons />
                </div>
            </div>
            <div className="flex items-center justify-center p-3">
                <span className="text-xs text-red-500 text-center ">
                    Freelancer Aems have requested for another cancellation
                    payout amount. Do you agree or wish to appeal payout
                    terms?
                </span>
            </div>
        </div>
    );
};

export default DetailsHeader;
