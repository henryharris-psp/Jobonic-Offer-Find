import Enquiring from "./Enquiring";
import Applied from "./Applied";
import Invited from "./Invited";
import ToSubmit from "./ToSubmit";
import WaitingForApproval from "./WaitingForApproval";
import WaitingForReview from "./WaitingForReview";
import Completed from "./Completed";
import Cancelled from "./Cancelled";
import SigningContract from "../shareButtonsMap/SigningContract";
import Payment from "./Payment";

// mapped by collaboration status
const employerActionButtonsMap = {
    enquiring: <Enquiring />,
    applied: <Applied />,
    invited: <Invited />,
    payment: <Payment/>,
    signing_contract: <SigningContract/>,
    to_submit: <ToSubmit />,
    waiting_for_approval: <WaitingForApproval />,
    waiting_for_review: <WaitingForReview />,
    completed: <Completed />,
    cancelled: <Cancelled />
};


export default employerActionButtonsMap;