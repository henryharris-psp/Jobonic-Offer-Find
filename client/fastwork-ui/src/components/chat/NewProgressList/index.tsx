import React, { useMemo } from "react";
import { useChat } from "@/contexts/chat";
import MilestoneProgressSection from "./MilestoneProgressSection";
import ContractProgressSection from "./ContractProgressSection";

interface NewProgressListProps {
    
}

const NewProgressList = ({

}: NewProgressListProps) => {
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

                <ContractProgressSection/>

                {/* milestone section */}
                { milestones.length !== 0 ? (
                    <div className="flex flex-col space-y-3">
                        { milestones.map( milestone => 
                            <MilestoneProgressSection
                                key={milestone.id}    
                                {...milestone}
                            />
                        )}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <span className="text-gray-400 text-sm">
                            No Milestones
                        </span>
                    </div>
                )}

            </div>
        </div>
    );
};

export default NewProgressList;
