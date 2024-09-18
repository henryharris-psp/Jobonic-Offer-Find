import React, { ReactNode, memo } from 'react'

interface CollapsibleProps {
    isOpen: boolean;
    mt?: number;
    onClick?: () => void;
    maxHeight: string;
    children: ReactNode;
}

const Collapsible = ({ 
    isOpen,
    mt = 0, 
    onClick,
    maxHeight = '200px',
    children, 
}: CollapsibleProps) => {
    const handleClick = () => {
        onClick?.();
    }

    return (
        <div 
            className={`overflow-hidden transition-all duration-300
                ${ onClick ? 'cursor-pointer' : '' }
            `}
            style={{
                maxHeight: isOpen ? maxHeight : '0vh',
                marginTop: isOpen ? mt : 0
            }}
            onClick={handleClick}
        >
            {children}
        </div>
    )
}

export default memo(Collapsible)