import Enquiring from "./Enquiring";
import Applied from "./Applied";
import ToSubmit from "./ToSubmit";
import WaitingForApproval from "./WaitingForApproval";
import WaitingForReview from "./WaitingForReview";
import Completed from "./Completed";
import Cancelled from "./Cancelled";

const freelancerActionButtonsMap = {
    enquiring: <Enquiring/>,
    applied: <Applied/>,
    to_submit: <ToSubmit/>,
    waiting_for_approval: <WaitingForApproval/>,
    waiting_for_review: <WaitingForReview/>,
    completed: <Completed/>,
    cancelled: <Cancelled/>
}

export default freelancerActionButtonsMap;