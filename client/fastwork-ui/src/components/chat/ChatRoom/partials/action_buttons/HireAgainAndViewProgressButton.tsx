import Button from '@/components/Button';
import { useChat } from '@/contexts/chat';
import httpClient from '@/client/httpClient';
import { ArrowPathRoundedSquareIcon, Bars3BottomRightIcon } from '@heroicons/react/24/solid';

const HireAgainAndViewProgressButton = () => {
    const { 
        activeChatRoom,
        showProgressList,
        changeChatRoom, 
        createNewChatRoom, 
        updateChatRoom,
        sendMessage,
        setShowProgressList
    } = useChat();

    const handleOnClickHireAgain = async () => {
        if(activeChatRoom){
            if(confirm("Do you want to hire again?")){

                //create match on main db
                const matchRes = await httpClient.post('matches', {
                    serviceId: activeChatRoom.service_id,
                    profileId: activeChatRoom.freelancer_id,
                    employeeId: activeChatRoom.employer_id,
                    status: "ENQUIRING",

                    //not_required
                    deliverable: "not_required",
                    paymentTotal: 0,
                    paymentMode: "MILESTONE",
                    numberOfCheckPoint: 0
                });
                const { id: matchId } = matchRes.data;

                const newChatRoom = await createNewChatRoom(
                    activeChatRoom.service_id, 
                    matchId, 
                    activeChatRoom.freelancer_id, 
                    activeChatRoom.employer_id
                );
                changeChatRoom(newChatRoom);

                const newlySentMessage = await sendMessage('text', "I am happy to work with you. Let's sign another contract again.");
                if(newlySentMessage){
                    await updateChatRoom(newChatRoom.id, {
                        status: 'signing_contract'
                    });
                }
            }
        }
    }

    const handleOnClickViewProgress = () => {
        setShowProgressList(true);
    }

    return (
        <div className="flex flex-row items-center gap-1">
            <Button
                size="sm"
                title="Hire Again"
                icon={<ArrowPathRoundedSquareIcon className="size-5 text-white"/>} 
                onClick={handleOnClickHireAgain}               
            />
            <Button
                size="sm"
                title="View Progress"
                disabled={showProgressList}
                icon={<Bars3BottomRightIcon className="size-5 text-white"/>} 
                onClick={handleOnClickViewProgress}               
            />
        </div>
    );
}

export default HireAgainAndViewProgressButton