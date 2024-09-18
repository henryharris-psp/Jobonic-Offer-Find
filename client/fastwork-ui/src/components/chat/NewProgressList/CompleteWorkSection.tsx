import { useState } from "react";

const CompleteWorkSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnToggle = () => {
        setIsOpen((prev) => !prev);
    };
    
    return (
        <div className="flex flex-col">
            <div
                className="flex flex-row items-center space-x-4 cursor-pointer"
                onClick={handleOnToggle}
            >
                <span className={`text-cyan-900 transition-transform duration-200 
                    ${isOpen ? "rotate-90" : ""}
                `}>
                    ▶
                </span>
                <span className="text-cyan-900 font-semibold text-sm">
                    Work Completed
                </span>
            </div>
        </div>
    );
};

export default CompleteWorkSection;
