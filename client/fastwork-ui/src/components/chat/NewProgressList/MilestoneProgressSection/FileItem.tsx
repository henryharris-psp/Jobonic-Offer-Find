import httpClient from "@/client/httpClient";
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
    size: string;
    status: AttachmentStatus;
    isUploading?: boolean;
    isDeletable?: boolean;
    isDownloadable?: boolean;
    onDelete: (fileId: string, status: AttachmentStatus) => void;
}

const FileItem = ({
    id,
    name,
    size,
    status,
    isUploading = false,
    isDownloadable = true,
    isDeletable = true,
    onDelete
}: FileItemProps) => {
    
    //methods
        const handleOnDownloadFile = () => {
            if(isDownloadable){
                // if(confirm("Do you want to download this file?")){
                //     const downloadFile = async (fileId: string, fileName: string) => {
                //         try {
                //             // Make a GET request to the endpoint with file ID
                //             const response = await httpClient.get(`/attachment/download`, {
                //                 params: { id: fileId },
                //                 responseType: 'blob', // Set response type to 'blob' for binary data
                //             });
                //             // Check if the request was successful
                //             if (response.status === 200) {
                //                 // Convert response to Blob
                //                 const blob = new Blob([response.data], { type: response.headers['content-type'] });
                //                 // Create a URL for the Blob
                //                 const url = window.URL.createObjectURL(blob);
                //                 // Create a link element
                //                 const link = document.createElement('a');
                //                 // Set the link's href to the Blob URL
                //                 link.href = url;
                //                 // Set the download attribute with the file name
                //                 link.download = fileName;
                //                 // Append the link to the document body
                //                 document.body.appendChild(link);
                //                 // Trigger the download
                //                 link.click();
                //                 // Clean up by removing the link
                //                 document.body.removeChild(link);
                //                 // Revoke the Blob URL
                //                 window.URL.revokeObjectURL(url);
                //             } else {
                //                 console.error('File download failed:', response.statusText);
                //             }
                //         } catch (error) {
                //             console.error('Error downloading file:', error);
                //         }
                //     };
                //     downloadFile(id, name);
                // }
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
                    {name}
                </button>
            </div>
            <span className="text-xs">
                { size }
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
