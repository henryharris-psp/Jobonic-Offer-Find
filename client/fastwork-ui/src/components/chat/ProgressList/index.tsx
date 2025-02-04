import React, { useMemo, useState } from "react";
import { useChat } from "@/contexts/chat";
import ContractProgressSection from "./ContractProgressSection";
import ReviewProgressSection from "./ReviewProgressSection";
import CompleteWorkProgressSection from "./CompleteWorkProgressSection";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { supabase } from "@/config/supabaseClient";
import { Milestone } from "@/types/general";
import { NumberedListIcon } from "@heroicons/react/24/solid";
import MilestoneProgressSection from "./MilestoneProgressSection";

const ProgressList = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom, createNewChatRoom, changeChatRoom, loadChatRoomData, latestContract } = useChat();
    const [isLoading, setIsLoading] = useState(false);

    const milestones = useMemo(() => {
        return latestContract ? latestContract.milestones : [];
    }, [latestContract]);

    //computed
        const allMilestonesCompleted = useMemo( () => {
            const allMilestones = latestContract?.milestones ?? [];
            return allMilestones.every( e => e.status === 'paid' );
        }, [latestContract]);

    //methods
        const handleOnClickHelp = async () => {
            if (activeChatRoom && authUser) {
                setIsLoading(true);
                const freelancerId = authUser.profile.id;
                const employerId = 1; //admin profileId
                const { data: chatRooms, error } = await supabase
                    .from('chat_rooms')
                    .select(`*, messages (*)`)
                    .eq('freelancer_id', freelancerId)
                    .eq('employer_id', employerId)
                    .order('id', { ascending: false });
                if (error) {
                    console.log('Supabase fetching error', error);
                    return;
                }

                if (chatRooms.length !== 0) {
                    const existedChatRooms = await loadChatRoomData(chatRooms);
                    if (existedChatRooms.length !== 0) changeChatRoom(existedChatRooms[0]);
                } else {
                    const newChatRoom = await createNewChatRoom(
                        activeChatRoom.service_id,
                        activeChatRoom.match_id,
                        freelancerId,
                        employerId
                    );
                    changeChatRoom(newChatRoom);
                }

                setIsLoading(false);
            }
        }
        
    return (
        <div className="flex-1 flex overflow-hidden bg-[#E0F7FA]">
            <div className="flex-1 flex flex-col overflow-hidden space-y-3 mt-14 px-5">
                <div className="flex justify-center">
                    <span className="font-bold text-xl">Progress List</span>
                </div>
                
                { !activeChatRoom ? (
                    <div className="flex flex-1 justify-center items-center">
                        <div className="flex flex-col items-center space-y-4">
                            <NumberedListIcon className="size-14 text-gray-400"/>
                            <span className="text-gray-500 text-xs">
                                Please choose a chat to see progress
                            </span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-auto">
                            <div className="flex flex-col space-y-4 my-3">
                                
                                { latestContract ? (
                                    <ContractProgressSection 
                                        isDisabled={false}
                                        isCurrent={false}
                                    />
                                ) : ''}

                                {/* milestone section */}
                                { milestones.length === 0 ? (
                                    <div className="flex items-center justify-center h-16">
                                        <span className="text-gray-400 text-sm">
                                            No Milestones Assigned
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-4 my-3">
                                        { milestones.map((milestone: Milestone) => 
                                            <MilestoneProgressSection
                                                key={milestone.id}
                                                isDisabled={['not_started'].includes(milestone.status)}
                                                isCurrent={milestone.id === latestContract?.currentMilestone?.id}
                                                {...milestone}
                                            />
                                        )}
                                        <ReviewProgressSection
                                            isDisabled={!allMilestonesCompleted}
                                            isCurrent={activeChatRoom.status === 'to_review'}
                                            //TODO: check condition for already reviewed or not
                                        />
                                        <CompleteWorkProgressSection 
                                            isOpen={activeChatRoom.status === 'completed'}
                                            isDone={activeChatRoom.status === 'completed'}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* customer support section */}
                        {activeChatRoom ? (
                            <div className="flex items-center justify-center pb-4">
                                <button
                                    className="flex items-center justify-center w-full border border-gray-100 py-2 bg-white shadow-bold rounded-lg active:shadow disabled:opacity-50"
                                    onClick={handleOnClickHelp}
                                    disabled={isLoading}
                                >
                                    <span className="text-[#71BAC7] ">
                                        {isLoading ? 'Connecting...' : 'Request for admin help'}
                                    </span>
                                </button>
                            </div>
                        ) : ''}
                    </>
                )}
                
            </div>
        </div>
    );
};

export default ProgressList;
