import { useChat } from "@/contexts/chat";

//freelancer
import ApplyButtons from "../action_buttons/ApplyButtons";
import WaitingStatus from "../action_buttons/WaitingStatus";
import AcceptInvitationButtons from "../action_buttons/AcceptInvitationButtons";

//employer
import InviteButtons from "../action_buttons/InviteButtons";
import PotentialHireButtons from "../action_buttons/PotentialHireButtons";
import ReviewButtons from "../action_buttons/ReviewButtons";

//shared
import ContractAndPaymentButtons from "../action_buttons/ContractAndPaymentButtons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ApproveButton from "../action_buttons/ApproveButton";

type ActionButtonMap = {
    [key: string]: JSX.Element | null;
};
const freelancerActionButtonsMap = {
    enquiring: <ApplyButtons/>,
    applied: <WaitingStatus status="Waiting For Confirmation"/>,
    invited: <AcceptInvitationButtons/>,
    signing_contract: <ContractAndPaymentButtons/>,
    payment_verification: <ContractAndPaymentButtons/>,
    to_submit: <ApproveButton/>,
    to_review: <ReviewButtons/>  
}

const employerActionButtonsMap = {
    enquiring: <InviteButtons/>,
    applied: <PotentialHireButtons/>,
    invited: <WaitingStatus status="Waiting For Confirmation"/>,
    signing_contract: <ContractAndPaymentButtons/>,
    payment_verification: <ContractAndPaymentButtons/>,
    to_submit: <ApproveButton/>,
    to_review: <ReviewButtons/>  
};

const actionButtonsMap: Record<'freelancer' | 'employer', ActionButtonMap> = {
    freelancer: freelancerActionButtonsMap,
    employer: employerActionButtonsMap,
};

const ActionButtonsByCollaborationStatus = () => {
    const { activeChatRoom } = useChat();
    const currentStatus = activeChatRoom ? activeChatRoom.status : '';
    const { authUser } = useSelector((state: RootState) => state.auth);
    const authUserType: 'freelancer' | 'employer' = activeChatRoom?.freelancer_id === authUser?.profile.id ? 'freelancer' : 'employer';

    let ActionButtonComponent = null;

    if(activeChatRoom && authUserType){
        ActionButtonComponent = actionButtonsMap[authUserType][currentStatus];
    }

    return <>{ActionButtonComponent}</>;
};

export default ActionButtonsByCollaborationStatus;
