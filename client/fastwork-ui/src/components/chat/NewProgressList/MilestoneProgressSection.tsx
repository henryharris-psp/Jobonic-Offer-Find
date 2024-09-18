import React, { useState } from "react";
import Button from "../../Button";
import Collapsible from "../../Collapsible";
import { CheckIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";
import { Milestone } from "@/types/general";

interface MilestoneProgressSectionProps extends Milestone {
    isCompleted?: boolean;
    isDisabled?: boolean;
}

const MilestoneProgressSection = ({
    id,
    title,
    tasks,
    isDisabled = false,
    isCompleted = false
}: MilestoneProgressSectionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnToggle = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="flex flex-col">
            <div
                className="flex flex-row items-center space-x-4 cursor-pointer"
                onClick={handleOnToggle}
            >
                <span className={`text-cyan-900 transition-transform duration-200 
                    ${ isOpen ? "rotate-90" : "" }
                `}>
                    ▶
                </span>
                <span className="text-cyan-900 font-semibold text-sm">
                    {title}
                </span>
            </div>

            <div>
                <Collapsible
                    isOpen={isOpen}
                >
                    <div className="flex flex-row space-x-6 mt-1">
                        {/* bar */}
                        <div
                            className="bg-cyan-900"
                            style={{
                                marginLeft: 6,
                                padding: 1.5,
                            }}
                        ></div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-col ml-1">
                                { tasks.map( task =>
                                    <div key={task.id} className="flex flex-row items-center space-x-2">
                                        <span className="text-cyan-900">•</span>
                                        <span className="text-cyan-900 text-xs">
                                            { task.name }
                                        </span>
                                    </div> 
                                )}
                            </div>
                            <div className="flex flex-row gap-1">
                                <Button
                                    size="2xs"
                                    title="Submit Work"
                                    icon={<DocumentPlusIcon className="size-4 text-white" />}
                                    onClick={() => console.log("submit")}
                                />
                                <Button
                                    size="2xs"
                                    title="Complete"
                                    icon={<CheckIcon className="size-4 text-white" />}
                                    onClick={() => console.log("submit")}
                                />
                            </div>
                        </div>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
};

export default MilestoneProgressSection;
