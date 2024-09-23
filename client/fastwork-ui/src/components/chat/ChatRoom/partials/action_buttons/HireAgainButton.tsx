import Button from '@/components/Button';
import { useChat } from '@/contexts/chat';
import httpClient from '@/client/httpClient';

const HireAgainButton = () => {
    const { 
        activeChatRoom, 
        changeChatRoom, 
        createNewChatRoom, 
        updateChatRoom,
        sendMessage
    } = useChat();

    const handleOnClickHireAgain = async () => {
        if(activeChatRoom){
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

    return (
        <div className="flex flex-row items-center">
            <Button
                size="sm"
                title="Hire Again" 
                onClick={handleOnClickHireAgain}               
            />
        </div>
    );
}

export default HireAgainButton