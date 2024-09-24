import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import React from "react";

const SubmitWorkButton = () => {
    const { setShowProgressList  } = useChat();

    return (
        <div className="flex flex-row items-center gap-1">
            <Button
                size="sm"
                icon={<DocumentPlusIcon className="size-5 text-white"/>}
                title="Submit Work"
                onClick={() => setShowProgressList(true)}
            />
        </div>
    );
};

export default SubmitWorkButton;
