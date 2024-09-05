import { ReactNode,MouseEventHandler } from "react";

interface ButtonProps {
    title: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    fullWidth?: boolean;
    size?: "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
    icon?: ReactNode;
    iconPositon?: "start" | "end";
    disabled?: boolean,
    onClick: MouseEventHandler<HTMLButtonElement>;
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
    title,
    color = 'warning',
    fullWidth = false, 
    size,
    icon,
    iconPositon = "start",
    disabled = false,
    onClick
}: ButtonProps) => {
    return (
        <button
            className={`flex items-center justify-center space-x-1 whitespace-nowrap text-center shadow px-3 py-2 rounded-lg text-white 
                ${size ? `text-${size}` : ''}
                ${fullWidth ? "flex-1" : ''}    
                ${disabled ? "opacity-60 active:opacity-60 cursor-not-allowed" : "hover:opacity-90 active:opacity-80"}
                bg-[${colorMap[color].main}]
            `}
            onClick={onClick}
            disabled={disabled}
        >
            { icon && iconPositon === 'start' ? (
                icon
            ) : ''}
            <span>
                {title}
            </span>
            { icon && iconPositon === 'end' ? (
                icon
            ) : ''}
        </button>
    );
};

export default Button;
