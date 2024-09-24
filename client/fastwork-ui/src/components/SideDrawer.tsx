import { RootState } from "@/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

// inspired from react native navigation
// front: Traditional drawer which covers the screen with a overlay behind it.
// back: The drawer is revealed behind the screen on swipe.
// slide: Both the screen and the drawer slide on swipe to reveal the drawer.

export type DrawerType = 'front' | 'slide'; // 'back' is not supported currenly

interface SideDrawerProps {
    show: boolean;
    width?: number;
    animate?: boolean;
    children: ReactNode;
    position?: 'left' | 'right';
    fullScreen?: boolean;
    zStack?: number;
    onClose: () => void;
    type?: DrawerType
  }

const SideDrawer = ({ 
    show, 
    width = 250,
    animate = true,
    position = 'left',
    fullScreen = false,
    zStack = 10,
    onClose,
    type = 'front',
    children
}: SideDrawerProps) => {

    if (zStack !== undefined && zStack > 10) {
        throw new Error('zStack must be between only 1 to 10');
    }

    return (
        <>
            <div
                className={`flex top-0 bottom-0 bg-none shadow overflow-hidden ${
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

            {/* clickable backdrop to close */}
            { type === 'front' && show ? (
                <div 
                    className="fixed bg-none top-0 bottom-0 left-0 right-0"
                    style={{
                        zIndex: zStack - 1 //must always be under drawer
                    }}
                    onClick={onClose}
                />
            ) : ''}
            
            {/* nav spacer */}
            { type === 'slide' ? (
                <div
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
