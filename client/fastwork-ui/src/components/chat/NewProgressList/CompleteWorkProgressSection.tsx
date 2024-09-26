import Collapsible from "@/components/Collapsible";

interface CompleteWorkProgressSectionProps {
    isOpen: boolean;
    isDone: boolean;
}

const CompleteWorkProgressSection = ({
    isOpen,
    isDone
}: CompleteWorkProgressSectionProps) => {
    return (
        <div 
            className={`flex flex-col 
                ${ isDone ? "text-green-500" : "text-cyan-900 opacity-60" }
            `}
        >
            {/* Milestone title */}
            <div className="flex flex-row items-center space-x-4 cursor-pointer">
                <span className={`transition-transform duration-200 
                    ${ isOpen ? "rotate-90" : "" }
                `}>
                    ▶
                </span>
                <span className="font-semibold text-sm">
                    Work Completed
                </span>
            </div>

            <Collapsible
                isOpen={isOpen}
                maxHeight="200vh"
            >
                <div className="flex flex-row space-x-5 mt-2">
                    {/* indicator bar */}
                    <div
                        className={ isDone ? "bg-green-500" : "bg-cyan-900" }
                        style={{
                            marginLeft: 6,
                            padding: 1.5,
                        }}
                    />

                    <div className="flex-1 flex overflow-hidden">
                        { isDone ? (
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
                    </div>
                </div>
            </Collapsible>

        </div>
    );
};

export default CompleteWorkProgressSection;
