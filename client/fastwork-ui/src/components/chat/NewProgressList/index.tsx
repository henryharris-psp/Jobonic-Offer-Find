import React, { useMemo } from "react";
import { useChat } from "@/contexts/chat";
import MilestoneProgressSection from "./MilestoneProgressSection";
import ContractProgressSection from "./ContractProgressSection";

const NewProgressList = () => {
    const { activeChatRoom } = useChat();

    const milestones = useMemo(() => {
        return activeChatRoom?.latestContract?.milestones || [];
    }, [activeChatRoom]);
    
    return (
        <div className="flex-1 flex bg-[#E0F7FA]">
            <div className="flex-1 flex flex-col space-y-5 mt-14 mx-5">
                <div className="flex justify-center">
                    <span className="font-bold text-xl">Progress List</span>
                </div>

                <div className="flex-1 overflow-auto">
                    <div className="flex flex-col space-y-4 my-3">
                        <ContractProgressSection/>

                        {/* milestone section */}
                        { milestones.length !== 0 ? (
                            milestones.map( milestone => 
                                <MilestoneProgressSection
                                    key={milestone.id}    
                                    {...milestone}
                                />
                            )
                        ) : (
                            <div className="flex justify-center">
                                <span className="text-gray-400 text-sm mt-5">
                                    No Milestones
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center justify-center h-20">
                    <button className="flex items-center justify-center w-full border border-gray-100 py-2 bg-white shadow-bold rounded-lg">
                        <span className="text-[#71BAC7] ">
                            Request for admin help
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProgressList;
