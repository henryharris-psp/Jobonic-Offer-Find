import { useChat } from "@/contexts/chat";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import StringParser from "@/functions/stringParser";
import ActionButtonsByCollaborationStatus from "./ActionButtonsByCollaborationStatus";

const DetailsHeader = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom, latestContract } = useChat();
    const stringParser = new StringParser();

    return (
        //if receiver is a Jobonic Admin (Customer Support)
        activeChatRoom && activeChatRoom?.receiver?.id === 1 ? (
            <div className="flex flex-col bg-white">
                <div className="flex flex-row flex-wrap gap-5 items-center border-b border-b-gray-200 py-4 px-6">
                    {/* receiver details */}
                    <div className="flex flex-1 flex-row items-center mb-1 min-w-48 space-x-3 overflow-hidden">
                        <Image
                            src="/avatar.svg"
                            alt="avatar"
                            height={60}
                            width={60}
                            className="rounded-full"
                        />
                        <div className="flex flex-col space-y-1">
                            <span className="text-3xl font-bold capitalize">
                                Jobonic Customer Support
                            </span>
                            <span className="text-xs text-gray-400 capitalize">
                                Typically replies within an hour
                            </span>
                            <div className="flex flex-row items-center space-x-1">
                                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-500">
                                    Online
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex items-center justify-center px-3 py-2 shadow-lg"
                    style={{
                        zIndex: 2
                    }}
                >
                    <span className="text-xs text-[#71BAC7] text-center">
                        Good morning! How can I help you?
                    </span>
                </div>
            </div>
        ) : (
            <div className="flex flex-col bg-white">
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
                                {activeChatRoom?.receiver?.lastName}
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
                                    ? "is looking for"
                                    : "is offering service"}
                            </span>
                            <span className="text-xl font-bold">
                                { activeChatRoom?.service?.title }
                            </span>
                        </div>
                        <div className="bg-[#82BDC5] px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap text-start">
                            <span className="capitalize text-sm">
                                { activeChatRoom?.status === "to_submit" 
                                    ? latestContract?.currentMilestone?.title
                                    : stringParser.replaceUnderscoreWithSpace(activeChatRoom?.status ?? '')
                                }
                            </span>
                        </div>
                    </div>

                    {/* action buttons */}
                    <div className="flex flex-1 justify-center items-center">
                        <ActionButtonsByCollaborationStatus />
                    </div>
                </div>
                <div
                className="flex items-center justify-center px-3 py-2 shadow-lg"
                style={{
                    zIndex: 2
                }}
            >
                <span className="text-2xs text-red-500 text-center">
                    Freelancer Aems have requested for another cancellation
                    payout amount. Do you agree or wish to appeal payout
                    terms?
                </span>
                </div>
            </div>
        )
    )
};

export default DetailsHeader;
