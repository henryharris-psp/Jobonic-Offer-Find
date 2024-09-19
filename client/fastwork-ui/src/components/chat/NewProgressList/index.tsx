import React, { useMemo } from "react";
import { useChat } from "@/contexts/chat"; // Custom hook to get the active chat room
import MilestoneProgressSection from "./MilestoneProgressSection";
import ContractProgressSection from "./ContractProgressSection";
import ReviewProgressSection from "./ReviewProgressSection";
import CompleteWorkSection from "./CompleteWorkSection";

const NewProgressList = () => {
    const { activeChatRoom } = useChat(); // Retrieve the current chat room data

    const milestones = useMemo(() => {
        const allMilestones = activeChatRoom?.latestContract?.milestones || [];
        // Filter to remove duplicate milestones based on 'id' or 'title'
        const filteredMilestones = allMilestones.filter((milestone, index, self) =>
            index === self.findIndex((m) => m.id === milestone.id)
        );
        
        // Log the filtered milestones to check for duplicates
        console.log("Filtered Milestones:", filteredMilestones);
        return filteredMilestones;
    }, [activeChatRoom]);
    
    
    
    return (
        <div className="flex-1 flex bg-[#E0F7FA]"> {/* Main container with flex and background color */}
            <div className="flex-1 flex flex-col space-y-5 mt-14 mx-5">
                
                {/* Header for the progress list */}
                <div className="flex justify-center">
                    <span className="font-bold text-xl">Progress List</span> {/* Title */}
                </div>

                {/* Content section for milestones, progress, review, etc. */}
                <div className="flex-1 overflow-auto"> {/* Makes this section scrollable */}
                    <div className="flex flex-col space-y-4 my-3">

                        {/* Render the Contract Progress Section */}
                        <ContractProgressSection />

                        {/* Milestone section with conditional rendering */}
                        {milestones.length !== 0 ? (
                            // Map through milestones and render each MilestoneProgressSection
                            milestones.map(milestone => (
                                <MilestoneProgressSection
                                    key={milestone.id} // Ensure each milestone has a unique key
                                    {...milestone} // Spread milestone data as props
                                />
                            ))
                        ) : (
                            // If there are no milestones, display a message
                            <div className="flex justify-center">
                                <span className="text-gray-400 text-sm">
                                    No Milestones
                                </span>
                            </div>
                        )}
                        
                        {/* Render the Review and Complete Work sections */}
                        <ReviewProgressSection />
                        <CompleteWorkSection />
                    </div>
                </div>
                
                {/* Footer button for requesting admin help */}
                <div className="flex items-center justify-center h-20">
                    <button className="flex items-center justify-center w-full border border-gray-100 py-2 bg-white shadow-bold rounded-lg">
                        <span className="text-[#71BAC7]">
                            Request for admin help
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProgressList;
