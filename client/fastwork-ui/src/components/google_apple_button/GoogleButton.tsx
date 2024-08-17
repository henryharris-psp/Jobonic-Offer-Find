import React from 'react';

interface GoogleButtonProps {
    onClick: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-[#0B2147] rounded-xl shadow-lg hover:bg-[#D0693B] transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#0C2348]/50"

        >
            {/*<img*/}
            {/*    src="/icons/google-icon.svg"*/}
            {/*    alt="Google"*/}
            {/*    className="w-6 h-6 mr-3"*/}
            {/*/>*/}
            <span className="font-medium">Sign in with Google</span>
        </button>
    );
};

export default GoogleButton;
