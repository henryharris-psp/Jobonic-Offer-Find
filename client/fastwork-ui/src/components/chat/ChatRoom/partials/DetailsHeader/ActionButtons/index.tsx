import { useChat } from "@/contexts/chat";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import freelancerActionButtonsMap from "./freelancerActionButtonsMap";
import employerActionButtonsMap from "./employerActionButtonsMap";

type ActionButtonMap = {
    [key: string]: JSX.Element | null;
};

const actionButtonsMap: Record<'freelancer' | 'employer', ActionButtonMap> = {
    freelancer: freelancerActionButtonsMap,
    employer: employerActionButtonsMap,
};

const ActionButtons = () => {
    const { activeChatRoom } = useChat();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const authUserType: 'freelancer' | 'employer' = activeChatRoom?.freelancer_id === authUser?.profile.id ? 'freelancer' : 'employer';
    const currentStatus = activeChatRoom ? activeChatRoom.status : '';
    const ActionButtonComponent = actionButtonsMap[authUserType][currentStatus] || null;

    return <>{ActionButtonComponent}</>;
};

export default ActionButtons;
