import Button from "@/components/Button";
import React from "react";

const InChatPayoutNegotiationCard = () => {

    //methods
    const handleOnClickAccept = () => {
        console.log('accept');
    }

    const handleOnClickReject = () => {
        console.log('reject');
    }

    const handleOnClickNegotiate = () => {
        console.log('negotiate')
    }

    return (
        <div className="min-w-72 bg-white shadow-md rounded-lg border border-gray-200 space-y-4">                        
            <div className="flex flex-col p-5">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Employer Wants to End Contract
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Custom amount offered for in-progress milestone:{" "}
                        <span className="font-medium text-blue-600">$450</span>
                    </p>
                </div>

                <p className="text-gray-700 text-sm mb-4">
                    The employer has offered to end the contract blah blaa...
                </p>
                <div className="flex space-x-4">
                    <Button
                        title="Accept & End"
                        onClick={handleOnClickAccept}
                    />
                    <Button
                        title="Afdfdfdfd"
                        onClick={handleOnClickReject}
                    />
                    <Button
                        title="Negotiate"
                        onClick={handleOnClickNegotiate}
                    />
                </div>
            </div>
        </div>
    );
};

export default InChatPayoutNegotiationCard;
