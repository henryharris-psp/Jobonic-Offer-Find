import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const ShareImageButton = () => {
    const [showPopup, setShowPopup] = useState(false);
    const handleOnToggle = () => {

    };

    return (
        <button
            className="hover:opacity-80 active:opacity-60"
            onClick={handleOnToggle}
        >
            <PhotoIcon className="size-8 text-[#0C2348]" />
        </button>
    );
};

export default ShareImageButton;
