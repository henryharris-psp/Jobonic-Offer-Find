import { downloadFile } from "@/functions/helperFunctions";
import { AttachmentStatus } from "@/types/general";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon, CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";

const statusIconMap = {
    uploaded: <CheckIcon className="size-4 text-green-500" />,
    pending: <CloudArrowUpIcon className="size-4 text-yellow-400" />,
    failed: <XMarkIcon className="size-4 text-red-500" />
}

interface FileItemProps {
    id: string;
    name: string;
    fileSize: string;
    status: AttachmentStatus;
    isUploading?: boolean;
    isDeletable?: boolean;
    isDownloadable?: boolean;
    onDelete: (fileId: string, status: AttachmentStatus) => void;
}

const FileItem = ({
    id,
    name,
    fileSize,
    status,
    isUploading = false,
    isDownloadable = true,
    isDeletable = true,
    onDelete
}: FileItemProps) => {
    
    //methods
        const handleOnDownloadFile = () => {
            if(isDownloadable){
                if(confirm("Do you want to download this file?")){
                    downloadFile(id, name);
                }
            }
        }

        const handleOnDeleteFile = () => {
            if(isDeletable){
                onDelete(id, status);
            }
        }

    return (
        <div className="flex text-xs flex-row overflow-hidden space-x-2 items-center">
            <div className="flex flex-row flex-1 space-x-1 items-center">
                <div>
                    { isUploading ? (
                        <ArrowPathIcon className="size-3 text-yellow-500 animate-spin" />
                    ) : (
                        statusIconMap[status]
                    )}
                </div>
                <button
                    className={`break-all text-start ${
                        isDownloadable ? 'text-blue-500 underline' : 'cursor-default'
                    }`}
                    onClick={handleOnDownloadFile}
                >
                    { name }
                </button>
            </div>
            <span className="text-xs">
                { fileSize }
            </span>
            { isDeletable && !isUploading ? (
                <button onClick={handleOnDeleteFile}>
                    <TrashIcon className="size-4 text-red-500" />
                </button>
            ) : ''}
        </div>
    );
};

export default FileItem;
