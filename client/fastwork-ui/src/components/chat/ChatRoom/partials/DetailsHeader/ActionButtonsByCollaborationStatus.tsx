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
import TerminationContractButton from "../action_buttons/TerminationContractButton";
import SubmitWorkButton from "../action_buttons/SubmitWorkButton";
import HireAgainAndViewProgressButton from "../action_buttons/HireAgainAndViewProgressButton";

type ActionButtonMap = { [key: string]: JSX.Element | null };

const freelancerActionButtonsMap = {
    enquiring: <ApplyButtons/>,
    applied: <WaitingStatus status="Waiting For Confirmation"/>,
    invited: <AcceptInvitationButtons/>,
    signing_contract: <ContractAndPaymentButtons/>,
    payment_verification: <ContractAndPaymentButtons/>,
    to_submit: <SubmitWorkButton/>,
    to_review: <ReviewButtons/>,
    contract_termination: <TerminationContractButton role="freelancer"/>,
    completed: 
        <div className="flex flex-col space-y-4 items-center">
            <span className="text-sm font-semibold text-green-400">
                This collaboration is successfully terminated.
            </span>
        </div>,
    cancelled: 
        <div className="flex flex-col space-y-4 items-center">
            <span className="text-sm font-semibold text-green-400">
                This collaboration is cancelled with agreed payout.
            </span>
        </div>,
}

const employerActionButtonsMap = {
    enquiring: <InviteButtons/>,
    applied: <PotentialHireButtons/>,
    invited: <WaitingStatus status="Waiting For Confirmation"/>,
    signing_contract: <ContractAndPaymentButtons/>,
    payment_verification: <ContractAndPaymentButtons/>,
    to_submit: <HireAgainAndViewProgressButton/>,
    to_review: <ReviewButtons/>,
    contract_termination: <TerminationContractButton role="employer"/>,
    completed: 
        <div className="flex flex-col space-y-4 items-center">
            <HireAgainAndViewProgressButton/>
            <span className="text-sm font-semibold text-green-400">
                This collaboration is successfully terminated.
            </span>
        </div>,
    cancelled: 
        <div className="flex flex-col space-y-4 items-center">
            <HireAgainAndViewProgressButton/>
            <span className="text-sm font-semibold text-green-400">
                This collaboration is cancelled with agreed payout.
            </span>
        </div>
};

const actionButtonsMap: Record<'freelancer' | 'employer', ActionButtonMap> = {
    freelancer: freelancerActionButtonsMap,
    employer: employerActionButtonsMap,
};

const ActionButtonsByCollaborationStatus = () => {
    const { activeChatRoom, authUserType } = useChat();
    const currentStatus = activeChatRoom ? activeChatRoom.status : '';

    let ActionButtonComponent = null;

    if(activeChatRoom && authUserType){
        ActionButtonComponent = actionButtonsMap[authUserType][currentStatus];
    }

    return <>{ActionButtonComponent}</>;
};

export default ActionButtonsByCollaborationStatus;
