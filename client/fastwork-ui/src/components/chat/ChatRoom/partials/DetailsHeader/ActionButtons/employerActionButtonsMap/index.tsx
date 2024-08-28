import Enquiring from "./Enquiring";
import Applicant from "./Applicant";
import WaitingForSubmission from "./WaitingForSubmission";
import ToApprove from "./ToApprove";
import ToReview from "./ToReview";
import Completed from "./Completed";
import Cancelled from "./Cancelled";

const employerActionButtonsMap = {
    enquiring: <Enquiring />,
    applicant: <Applicant />,
    waiting_for_submission: <WaitingForSubmission />,
    to_approve: <ToApprove />,
    to_review: <ToReview />,
    completed: <Completed />,
    cancelled: <Cancelled />
};


export default employerActionButtonsMap;