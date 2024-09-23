import React, { useMemo, useState } from "react";
import { useChat } from "@/contexts/chat";
import MilestoneProgressSection from "./MilestoneProgressSection";
import ContractProgressSection from "./ContractProgressSection";
import ReviewProgressSection from "./ReviewProgressSection";
import CompleteWorkSection from "./CompleteWorkSection";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { supabase } from "@/config/supabaseClient";

const NewProgressList = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom, createNewChatRoom, changeChatRoom, loadChatRoomData } = useChat();
    const [isLoading, setIsLoading] = useState(false);

    const milestones = useMemo(() => {
        const allMilestones = activeChatRoom?.latestContract?.milestones || [];
        console.log("Loaded Milestones:", allMilestones);
        return allMilestones;
    }, [activeChatRoom]);
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
        <div className="flex-1 flex bg-[#E0F7FA]">
            <div className="flex-1 flex flex-col space-y-5 mt-14 mx-5">
                <div className="flex justify-center">
                    <span className="font-bold text-xl">Progress List</span>
                </div>
                <div className="flex-1 overflow-auto">
                    <div className="flex flex-col space-y-4 my-3">
                        <ContractProgressSection />

                        {/* milestone section */}
                        {milestones.length > 0 ? (

                            <MilestoneProgressSection
                            />

                        ) : (
                            <div className="flex justify-center">
                                <span className="text-gray-400 text-sm">
                                    No Milestones
                                </span>
                            </div>
                        )}
                        <ReviewProgressSection />
                        <CompleteWorkSection />
                    </div>
                </div>
                {activeChatRoom ? (
                    <div className="flex items-center justify-center h-20">
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
            </div>
        </div>
    );
};

export default NewProgressList;
