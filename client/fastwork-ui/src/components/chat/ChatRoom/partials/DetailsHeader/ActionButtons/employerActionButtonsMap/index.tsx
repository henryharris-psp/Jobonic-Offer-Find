import Enquiring from "./Enquiring";
import Applied from "./Applied";
import Invited from "./Invited";
import ToSubmit from "./ToSubmit";
import WaitingForSubmission from "./WaitingForSubmission";
import WaitingForReview from "./WaitingForReview";
import Completed from "./Completed";
import Cancelled from "./Cancelled";
import SigningContract from "../shareButtonsMap/SigningContract";
import WaitingForPayment from "./WaitingForPayment";
import WaitingForContractConfirmation from "../shareButtonsMap/WaitingForContractConfirmation";

// mapped by collaboration status
const employerActionButtonsMap = {
    enquiring: <Enquiring />,
    applied: <Applied />,
    invited: <Invited />,
    signing_contract: <SigningContract/>,
    waiting_for_payment: <WaitingForPayment/>,
    to_submit: <ToSubmit />,
    waiting_for_submission: <WaitingForSubmission />,
    waiting_for_review: <WaitingForReview />,
    completed: <Completed />,
    cancelled: <Cancelled />
};


export default employerActionButtonsMap;