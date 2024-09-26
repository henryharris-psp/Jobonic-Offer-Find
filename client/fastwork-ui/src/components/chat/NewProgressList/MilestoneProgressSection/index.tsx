import React, { useEffect, useMemo, useState } from "react";
import Button from "../../../Button";
import { CheckIcon, CloudArrowUpIcon, DocumentPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Attachment, AttachmentStatus, Milestone } from "@/types/general";
import FilePicker from "@/components/FilePicker";
import httpClient from "@/client/httpClient";
import FileItem from "./FileItem";
import { updateMilestoneStatus } from "@/functions/helperFunctions";
import { useChat } from "@/contexts/chat";
import ProgressBar from "@/components/ProgressBar";
import MilestonePaymentConfirmationDialog from "@/components/payment/MilestonePaymentConfirmationDialog";
import ProgressSectionRoot from "../ProgressSectionRoot";

interface MilestoneProgressSectionProps extends Milestone {
    isCurrent: boolean;
    isDisabled: boolean;
}

const MilestoneProgressSection = ({
    id,
    title,
    tasks = [],
    uploadedFiles: oldFiles,
    description: status,
    isCurrent = false,
    isDisabled = false
}: MilestoneProgressSectionProps) => {
    const { 
        latestContract, 
        authUserType, 
        sendMessage
    } = useChat();

    //file upload
    const [pendingFiles, setPendingFiles] = useState<Attachment[]>([]);
    const [pendingFilesCount, setPendingFilesCount] = useState<number>(0); // just for completed percent calculation
    const [uploadedFiles, setUploadedFiles] = useState<Attachment[]>(oldFiles ?? []);
    const [failedFiles, setFailedFiles] = useState<Attachment[]>([]);
    const [filePickErrorMessages, setFilePickErrorMessages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [currentUploadingFileId, setCurrentUploadingFileId] = useState<string | null>(null);
    
    const [showMilestonePaymentConfirmationDialog, setShowMilestonePaymentConfirmationDialog] = useState(false);

    //update updatedFiles when freelancer upload new file
    useEffect( () => {
        if(oldFiles){
            setUploadedFiles(oldFiles);
        }
    }, [oldFiles]);

    //methods
        //freelancer actions
            const submit = async () => {
                const targetMilestone = latestContract?.milestones.find( e => e.id === id );
                if(targetMilestone){
                    await updateMilestoneStatus(targetMilestone, 'submitted');
                    await sendMessage('milestone', id);
                }
            }

            const handleOnClickDone = async () => {
                if(confirm("Are you sure you want to submit this milestone without uploading any files?")){
                    submit();
                }
            }

        // employer actions
            const handleOnApproveAndPay = async () => {
                setShowMilestonePaymentConfirmationDialog(true);
            }

            const handleOnReject = async () => {
                if(confirm("Are you sure to reject?")){
                    try{
                        const targetMilestone = latestContract?.milestones.find( e => e.id === id );
                        if(targetMilestone){
                            await updateMilestoneStatus(targetMilestone, 'waiting_for_submission');
                            await sendMessage('text', `Unfortunately, your submission for ${title} has been rejected.`);
                        }
                    } catch (error) {
                        console.log('error on reject', error);
                    }
                }
            }

        //file upload handlers
            const handleOnPickFile = (pickedFile: Attachment) => {
                setPendingFiles(prev => ([...prev, pickedFile]));
                setPendingFilesCount(prev => prev + 1);
                setFilePickErrorMessages([]);
            }

            const handleOnPickFileError = (filePickErrorMessages: string[]) => {
                setFilePickErrorMessages(filePickErrorMessages);
            }

            const handleOnDeleteFile = async (fileId: string, status: AttachmentStatus) => {
                const deleteWarningMessage = status === 'uploaded'
                    ? `This file is already submitted to employer. \nAre you sure you want to delete this file?`
                    : "Are you sure you want to remove this file?";
            
                if(confirm(deleteWarningMessage)){
                    try{
                        if(status === 'uploaded'){
                            await httpClient.delete(`attachment?id=${fileId}`);
                        }

                        const setFiles = {
                            uploaded: setUploadedFiles,
                            pending: setPendingFiles,
                            failed: setFailedFiles
                        }[status];
                
                        setFiles(prev => prev.filter(file => file.id !== fileId));
                        if(status === 'pending') setPendingFilesCount(prev => prev - 1);
                        
                    } catch (error) {
                        console.log('error on delete file', error);
                    }
                }
            };

            const handleOnClickSubmitUpload = () => {
                setIsUploading(true);
            }

    //completed
        const allFiles = useMemo( () => {
            return [...uploadedFiles, ...failedFiles, ...pendingFiles];
        }, [uploadedFiles, pendingFiles, failedFiles]);

        const completedPercent = useMemo(() => {
            const completedCount = pendingFilesCount - pendingFiles.length;
            return (completedCount / pendingFilesCount) * 100;
        }, [pendingFilesCount, pendingFiles.length]);
        
    //sequential uploader
        useEffect( () => {
            const targetFile = pendingFiles[0];

            //fire on sequential upload finished
            if(isUploading && !targetFile){
                setPendingFilesCount(() => {
                    setIsUploading(false);
                    return 0;
                });
                if(uploadedFiles.length !== 0) {
                    submit();
                }
            };

            if(isUploading && targetFile){
                setCurrentUploadingFileId(targetFile.id);

                const formData = new FormData();

                formData.append('checkPointId', id);  
                formData.append('documentType', 'CHECKPOINT');  
                
                if(targetFile.source) {
                    formData.append('file', targetFile.source)
                }

                ( async () => {
                    try {
                        const res = await httpClient.post('/attachment', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                        const { id, originalName, fileSize } = res.data;

                        const newlyUploadedFile: Attachment = {
                            id: id,
                            name: originalName,
                            size: fileSize,
                            status: 'uploaded'
                        }
                        setUploadedFiles( prev => ([...prev, newlyUploadedFile]));
                    } catch (error) {
                        setFailedFiles( prev => {
                            const failedFile: Attachment = {
                                ...targetFile,
                                status: 'failed'
                            }
                            return [ ...prev, failedFile];
                        });
                    } finally {
                        setPendingFiles( prev => prev.filter( e => e.id !== targetFile.id ));
                    }
                })();
            }
        }, [isUploading, pendingFiles]);

    return (
        <>
            <ProgressSectionRoot
                title={title}
                isCurrent={isCurrent}
                isDisabled={isDisabled}
            >
                <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
                    {/* tasks list */}
                    <div className="flex flex-col space-y-1">
                        { tasks.length === 0 ? (
                            <div className="flex flex-row items-center space-x-2">
                                <span className="text-gray-400 text-xs">
                                    No Tasks
                                </span>
                            </div> 
                        ) : (
                            tasks.map( task =>
                                <div key={task.id} className="flex flex-row space-x-1">
                                    <span className="-mt-1">•</span>
                                    <span className="text-xs break-all">
                                        { task.name }
                                    </span>
                                </div> 
                            )
                        )}
                    </div>

                    {/* selected files list to upload */}
                    { !isDisabled ? (
                        <div className={`border rounded-lg ${
                            isCurrent ? "border-[#D0693B]" : "border-cyan-900"
                        }`}>
                            <div className="flex flex-col space-y-3 px-2 pt-2 pb-3">
                                <div className="flex justify-center">
                                    <span className="text-sm font-bold">
                                        File List
                                    </span>
                                </div>
                                { allFiles.length === 0 ? (
                                    <div className="flex justify-center">
                                        <span className="opacity-60 text-xs">
                                            No files uploaded
                                        </span>
                                    </div>
                                ) : (
                                    allFiles.map( (file) => 
                                        <FileItem
                                            key={file.id}
                                            isUploading={currentUploadingFileId === file.id}
                                            isDownloadable={ file.status === 'uploaded' }
                                            isDeletable={authUserType === 'freelancer' && (
                                                status === 'waiting_for_submission' || file.status === 'pending'
                                            )}
                                            onDelete={handleOnDeleteFile}
                                            {...file}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ) : ''}

                    {/* action buttons by use type and milestone status */}
                    { authUserType === 'freelancer' ? (
                        <>
                            { ['waiting_for_submission', 'submitted'].includes(status) ? (
                                <div className="flex flex-col space-y-2">
                                    { status === 'submitted' ? (
                                        <div className="flex flex-col text-green-500">
                                            <div className="flex flex-row space-x-1">
                                                <span className="text-sm">*</span>
                                                <span className="text-xs">
                                                    Your files are successfully submitted.
                                                </span>
                                            </div>
                                            <div className="flex flex-row space-x-1">
                                                <span className="text-sm">*</span>
                                                <span className="text-xs">
                                                    Please wait for employer&apos;s approval.
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex flex-row space-x-1">
                                                <span className="text-xs">
                                                    Employer is waiting for your submission.
                                                </span>
                                            </div>
                                            <div className="flex flex-row space-x-1 text-gray-500">
                                                <span className="text-xs">*</span>
                                                <span className="text-2xs">
                                                    Caution: You will not be able to delete your files after submitted unless the employer rejects them.
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    { isUploading ? (
                                        <ProgressBar
                                            completedPercent={completedPercent}
                                            color="success"
                                        />
                                    ) : ''}

                                    <div className="flex flex-row gap-1">
                                        <FilePicker
                                            size="2xs"
                                            title="Submit Work"
                                            icon={<DocumentPlusIcon className="size-4 text-white" />}
                                            onPick={handleOnPickFile}
                                            onError={handleOnPickFileError}
                                            disabled={isDisabled}
                                        />
                                        { allFiles.length !== 0 ? (
                                            <Button
                                                size="2xs"
                                                color="success"
                                                title={ isUploading ? 'Uploading...' : ( pendingFiles.length === 0 ? 'All files are submitted' : 'Upload & Submit') }
                                                icon={ pendingFiles.length === 0 ? <CheckIcon className="size-4 text-white" /> : <CloudArrowUpIcon className="size-4 text-white" />}
                                                onClick={handleOnClickSubmitUpload}
                                                disabled={isDisabled || isUploading || pendingFiles.length === 0}
                                            />
                                        ) : (
                                            <Button
                                                size="2xs"
                                                color="success"
                                                title="Mark as Done"
                                                icon={<CheckIcon className="size-4 text-white" />}
                                                onClick={handleOnClickDone}
                                                disabled={isDisabled || status !== 'waiting_for_submission'}
                                            />
                                        )}
                                    </div>

                                    {/* error messages */}
                                    { filePickErrorMessages.length > 0 ? (
                                        <div className="flex flex-col">
                                            {filePickErrorMessages.map( (filePickErrorMessage, index) =>
                                                <div 
                                                    key={index} 
                                                    className="flex flex-row items-center text-red-500 space-x-1"
                                                >
                                                    <span className="text-xs">*</span>
                                                    <span className="text-2xs break-all">
                                                        { filePickErrorMessage }
                                                    </span>
                                                </div>    
                                            )}
                                        </div>
                                    ) : ''}
                                </div>
                            ) : '' }
                        </>
                    ) : (
                        <>
                            { status === 'waiting_for_submission' ? (
                                <div className="flex flex-row items-center space-x-1">
                                    <span className="text-xs">
                                        Please wait for service provider&apos;s work submission.
                                    </span>
                                </div>
                            ) : ''}
                            
                            { status === 'submitted' ? (
                                <>
                                    <div className="flex flex-col text-green-500 space-y-1">
                                        <div className="flex flex-row items-cente space-x-1">
                                            <span className="text-sm">*</span>
                                            <span className="text-xs">
                                                Your service provider submitted this milestone as done without any attachment.
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-center space-x-1">
                                            <span className="text-sm">*</span>
                                            <span className="text-xs">
                                                Do you want to approve?
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-1 w-full">
                                        <Button
                                            fullWidth
                                            size="2xs"
                                            color="danger"
                                            title="Reject"
                                            icon={<XMarkIcon className="size-4 text-white" />}
                                            onClick={handleOnReject}
                                            disabled={isDisabled}
                                        />
                                        <Button
                                            fullWidth
                                            size="2xs"
                                            color="success"
                                            title="Approve & Pay"
                                            icon={<CheckIcon className="size-4 text-white" />}
                                            onClick={handleOnApproveAndPay}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                </>
                            ) : '' }
                        </>
                    )}

                    {/* for both users */}
                    { status === 'paid' ? (
                        <div className="flex flex-row space-x-1">
                            <span className="text-xs text-green-500">
                                This milestone is approved and paid.
                            </span>
                        </div>
                    ) : '' }

                </div>
            </ProgressSectionRoot>

            <MilestonePaymentConfirmationDialog
                isOpen={showMilestonePaymentConfirmationDialog}
                onClose={() => setShowMilestonePaymentConfirmationDialog(false)}
                milestoneId={id}
                leftAmount={600}
                amountToPay={123}
            />
        </>
    );
};

export default MilestoneProgressSection;
