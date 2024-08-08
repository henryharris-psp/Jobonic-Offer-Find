import { RootState } from "@/store";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";

interface SideDrawerProps {
    show: boolean;
    width?: number;
    animate?: boolean;
    children: ReactNode;
    position?: 'left' | 'right';
    fullScreen?: boolean;
    zStack?: number; //max 9997
    onClose: () => void;
  }

const SideDrawer = ({ 
    show, 
    width = 250,
    animate = true,
    position = 'left',
    fullScreen = false,
    zStack = 10,
    onClose,
    children
}: SideDrawerProps) => {

    if (zStack !== undefined && zStack > 10) {
        throw new Error('zStack must be between only 1 to 10');
    }

    const { isMobile } = useSelector((state: RootState) => state.ui);
    
    const isFloat = useMemo( () => {
        return isMobile;
    }, [isMobile]);

    return (
        <>
            <div
                className={`top-0 bottom-0 flex shadow bg-white overflow-hidden ${
                    fullScreen ? 'fixed' : 'absolute'
                }`}
                style={{
                    zIndex: zStack,
                    width: width,
                    left: position === 'left' ? (show ? 0 : (-1 * width)) : '',
                    right: position === 'right' ? (show ? 0 : (-1 * width)) : '',
                    transition: animate ? `${position} 300ms` : 'none'
                }}
            >
                { children }

                <button
                    className={`flex items-center absolute top-2 rounded-full p-2 bg-[#0B2147] ${
                        position === 'left' ? 'right-2' : 'left-2'
                    }`}
                    onClick={onClose}
                >
                    { position === 'left' ? (
                        <ChevronLeftIcon className="text-white size-4"/>
                    ) : (
                        <ChevronRightIcon className="text-white size-4"/>
                    )}
                </button>
            </div>

            { isFloat && show ? (
                <div 
                    className={`fixed bg-none top-0 bottom-0
                        ${ position === 'left' ? 'left-0' : 'right-0' }
                    `}
                    style={{
                        zIndex: zStack - 1
                    }}
                    onClick={onClose}
                />
            ) : ''}
            
            {/* nav spacer */}
            { !isFloat ? (
                <div
                    className="bg-red-500"
                    style={{
                        minWidth: show ? width : 0,
                        transition: animate ? 'min-width 300ms' : 'none'
                    }}
                />
            ) : ''}
        </>
    );
};

export default SideDrawer;
