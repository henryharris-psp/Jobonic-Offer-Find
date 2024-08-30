import { ReactNode,MouseEventHandler } from "react";

interface ButtonProps {
    title: string;
    fullWidth?: boolean;
    size?: "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
    icon?: ReactNode;
    iconPositon?: "start" | "end";
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
    title, 
    fullWidth = false, 
    size,
    icon,
    iconPositon = "start",
    onClick
}: ButtonProps) => {
    return (
        <button
            className={`flex items-center space-x-1 whitespace-nowrap text-center bg-[#D0693B] active:opacity-80 shadow px-3 py-2 rounded-lg text-white 
                ${size ? `text-${size}` : ''}
                ${fullWidth ? "flex-1" : ''}    
            `}
            onClick={onClick}
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
