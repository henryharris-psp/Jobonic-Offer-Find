import ProgressSectionRoot from "./ProgressSectionRoot";

interface CompleteWorkProgressSectionProps {
    isCurrent: boolean;
    isDisabled: boolean;
}

const CompleteWorkProgressSection = ({
    isCurrent,
    isDisabled
}: CompleteWorkProgressSectionProps) => {
    return (
       <ProgressSectionRoot
            defaultOpened={isCurrent}
            isToggleable={!isCurrent}
            title="Work Completed"
            isCurrent={isCurrent}
            isDisabled={isDisabled}
       >
            { isCurrent ? (
                <div className="flex-1 flex flex-col space-y-2 text-xs text-green-500">
                    <span className="font-semibold">
                        Congratulation!
                    </span>
                    <span>
                        Collaboration is successfully completed and now contract is terminated.
                    </span>
                </div>
            ) : (
                <div className="flex-1 flex flex-col space-y-2 text-xs">
                    <span className="">
                        3 milestones left to be completed and approved to terminated a contract.
                    </span>
                </div>
            )}
            
       </ProgressSectionRoot>
    );
};

export default CompleteWorkProgressSection;
