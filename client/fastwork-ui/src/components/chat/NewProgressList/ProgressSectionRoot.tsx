import Collapsible from "@/components/Collapsible";
import GiveReviewModal from "@/components/GiveReviewModal";
import { ReactNode, useState } from "react";

interface ProgressSectionRootProps {
    title: string;
    defaultOpened?: boolean;
    isToggleable?: boolean;
    isCurrent: boolean;
    isDisabled: boolean;
    children: ReactNode;
}

const ProgressSectionRoot = ({
    title,
    defaultOpened = false,
    isToggleable = true,
    isCurrent,
    isDisabled,
    children
}: ProgressSectionRootProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpened);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const handleOnToggle = () => {
        if(isToggleable){
            setIsOpen((prev) => !prev);
        }
    };

    return (
        <>
            <div 
                className={`flex flex-col 
                    ${ isDisabled ? "opacity-60" : "" }
                    ${ isCurrent ? "text-[#D0693B]" : "text-cyan-900" }
                `}
            >
                {/* Milestone title */}
                <div
                    className="flex flex-row items-center space-x-4 cursor-pointer"
                    onClick={handleOnToggle}
                >
                    <span className={`transition-transform duration-200 
                        ${ isOpen ? "rotate-90" : "" }
                    `}>
                        ▶
                    </span>
                    <span className="font-semibold text-sm">
                        { title }
                    </span>
                </div>

                <Collapsible
                    isOpen={isOpen}
                    maxHeight="200vh"
                >
                    <div className="flex flex-row space-x-5 mt-2">
                        {/* indicator bar */}
                        <div
                            className={ isCurrent ? "bg-[#D0693B]" : "bg-cyan-900" }
                            style={{
                                marginLeft: 6,
                                padding: 1.5,
                            }}
                        />

                        <div className="flex-1 flex overflow-hidden">
                            { children }
                        </div>
                    </div>
                </Collapsible>

            </div>

            <GiveReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
            />
        </>
    );
};

export default ProgressSectionRoot;
