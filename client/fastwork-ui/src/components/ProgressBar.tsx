import { memo } from "react";

interface ProgressBarProps {
    completedPercent: number;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
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

const ProgressBar = ({
    completedPercent, 
    color = 'success'
}: ProgressBarProps) => {
    return (
        <div className="relative overflow-hidden bg-gray-300 w-full rounded-full h-1">
            <div 
                className={`absolute top-0 bottom-0 rounded-full transition-width duration-200
                    bg-[${colorMap[color].main}]
                `}
                style={{
                    width: `${completedPercent}%`
                }}
            ></div>
        </div>
    );
};

export default memo(ProgressBar);
