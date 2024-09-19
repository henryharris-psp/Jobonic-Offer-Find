import React from "react";

interface WaitingStatusProps{
    status: string;
}

const WaitingStatus = ({ status }: WaitingStatusProps) => {
    return (
        <div className="flex justify-center items-center text-center">
            <span className="font-semibold text-sm text-yellow-400">
                { status }
            </span>
        </div>
    );
};

export default WaitingStatus;
