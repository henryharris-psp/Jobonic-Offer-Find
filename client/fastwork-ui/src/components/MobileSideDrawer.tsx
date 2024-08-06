import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface MobileSideDrawerProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
  }

const MobileSideDrawer = ({ 
    show, 
    onClose,
    children
}: MobileSideDrawerProps) => {

    const width = 300;
    const isFloat = true;

    return (
        <>
            <div
                className="fixed top-16 bottom-0 right-0 flex shadow z-50 bg-white transition-all duration-300"
                style={{
                    width: width,
                    left: show ? 0 : (-1 * width),
                }}
            >
                { children }

                <button 
                    className="flex items-center absolute top-2 right-2 rounded-full p-2 bg-[#0B2147]"
                    onClick={onClose}
                >
                    <ChevronLeftIcon className="text-white size-4"/>
                </button>
            </div>

            { isFloat && show ? (
                <div 
                    className="fixed bg-none top-0 bottom-0 right-0 left-0 z-40"
                    onClick={onClose}
                />
            ) : ''}
            
            {/* nav spacer */}
            { !isFloat ? (
                <div
                    style={{
                        minWidth: show ? width : 0,
                        transition: "min-width 300ms",
                    }}
                />
            ) : ''}
        </>
    );
};

export default MobileSideDrawer;
