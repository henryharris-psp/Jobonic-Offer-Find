import { TailwindSizes } from "@/types/general";
import { ReactNode, MouseEvent } from "react";

export interface ButtonProps {
    variant?: 'contained' | 'outlined',
    title: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    fullWidth?: boolean;
    size?: TailwindSizes | '2xs';
    icon?: ReactNode;
    iconPositon?: 'start' | 'end';
    disabled?: boolean,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const colorMap = {
    primary: {
        main: '#0B2147'
    },
    danger: {
        main: '#DD4A4A'
    },
    secondary: {
        main: '#B0B0B0'
    },
    success: {
        main: '#5A9E4A'
    },
    warning: {
        main: '#D0693B',
    },
    info: {
        main: '#71BAC7'
    }
}

const Button = ({
    variant = 'contained',
    title,
    color = 'warning',
    fullWidth = false, 
    size,
    icon,
    iconPositon = 'start',
    disabled = false,
    onClick
}: ButtonProps) => {
    const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
        if(!disabled) {
            onClick?.(event);
        }
    };
    

    return (
        <button
            className={`flex items-center justify-center space-x-1 whitespace-nowrap text-center shadow rounded-lg text-white 
                ${size ? `text-${size}` : ''}
                ${size === '2xs' ? 'px-2 py-1' : 'px-3 py-2' }
                ${fullWidth ? 'flex-1 w-full' : ''}    
                ${disabled ? "opacity-60 active:opacity-60 cursor-not-allowed" : "hover:opacity-80 active:opacity-70"}
                ${variant === 'outlined' ? 'bg-opacity-20' : ''}
                bg-[${colorMap[color].main}]
            `}
            onClick={handleOnClick}
            disabled={disabled}
        >
            { icon && iconPositon === 'start' ? (
                icon
            ) : ''}
            <span className={ variant === 'outlined' ? `text-[${colorMap[color].main}]` : 'text-white'}>
                {title}
            </span>
            { icon && iconPositon === 'end' ? (
                icon
            ) : ''}
        </button>
    );
};

export default Button;
