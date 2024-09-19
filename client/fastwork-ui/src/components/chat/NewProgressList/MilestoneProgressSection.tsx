import React, { useState, useEffect } from 'react';
import { ArrowDownTrayIcon, DocumentArrowUpIcon, BookmarkSquareIcon, CheckIcon } from "@heroicons/react/24/solid";
import httpClient from '@/client/httpClient';
import { useChat } from '@/contexts/chat';
import ApproveAndPayModal from '@/components/ApproveAndPay';
import Button from '@/components/Button';
import Marquee from '../ProgressList/Marquee/Marquee';
import Modal from '@/components/Modal';
import PaymentCard from '../ProgressList/PyamentForMilestone/PaymentCardMilestone';
import FileSizeAlertModal from '../ProgressList/AlertMessage/FileAlertMessage';
import { Milestone } from '@/types/general';
import Collapsible from '@/components/Collapsible';
interface MilestoneProgressSectionProps extends Milestone {
    isCompleted?: boolean;
    isDisabled?: boolean;
}
const MilestoneProgressSection = ({
    id,
    title,
    tasks,
    isDisabled = false,
    isCompleted = false
}: MilestoneProgressSectionProps) => {
    const { activeChatRoom, authUserType, latestContract } = useChat();
    const [openMilestones, setOpenMilestones] = useState<string[]>([]);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [submittedMilestones, setSubmittedMilestones] = useState<Set<string>>(new Set());
    const [isSubmitted, setIsSubmitted] = useState<string[]>([]);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
    const [isPaymentCardOpen, setIsPaymentCardOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isApproveAndPay, setIsApproveAndPay] = useState<boolean>(false);
    const [approvedMilestone, setApprovedMilestone] = useState<Record<string, boolean>>({});
    const [milestonesState, setMilestonesState] = useState(milestones);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    useEffect(() => {
        if (!hasFetched && latestContract) {
            console.log('Fetching milestones for contract ID:', latestContract.id);

            fetchMilestonesPerContract(latestContract.id)
                .then(() => setHasFetched(true));
        }
    }, [latestContract, hasFetched]);
    const fetchMilestonesPerContract = async (contractId: string | number) => {
        try {
            const serviceId = activeChatRoom?.service_id;
            if (!serviceId) return;

            const contractResponse = await httpClient.get(`/contract/${contractId}`);
            const milestonesData: Milestone[] = contractResponse.data.milestones;

            const updatedMilestones = await Promise.all(
                milestonesData.map(async (milestone) => {
                    try {
                        const attachmentsResponse = await httpClient.get('/attachment/checkpoint', {
                            params: { checkPointId: milestone.id },
                        });
                        const milestoneAttachments = attachmentsResponse.data;

                        const files = milestoneAttachments.map((attachment: { id: string; name: string; fileSize: string; file: string; status: boolean; }) => ({
                            id: attachment.id,
                            name: attachment.name,
                            size: attachment.fileSize,
                            file: attachment.file,
                            status: attachment.status
                        }));

                        const isSubmitted = files.some((file: { status: any; }) => file.status);
                        return { ...milestone, uploadedFiles: files, isSubmitted };
                    } catch (attachmentError) {
                        console.error(`Cannot fetch attachments for milestone ${milestone.id}:`, attachmentError);
                        return { ...milestone, uploadedFiles: [], isSubmitted: false };
                    }
                })
            );

            // Ensure uniqueness
            const uniqueMilestonesMap = new Map();
            updatedMilestones.forEach((milestone) => {
                if (!uniqueMilestonesMap.has(milestone.title)) {
                    uniqueMilestonesMap.set(milestone.title, milestone);
                }
            });

            const uniqueMilestones = Array.from(uniqueMilestonesMap.values());
            console.log('Unique Milestones:', uniqueMilestones);
            setMilestones(uniqueMilestones);
        } catch (error) {
            console.error('Cannot fetch contract data:', error);
        }
    };


    const downloadFile = async (fileId: string, fileName: string) => {
        try {
            // Make a GET request to the endpoint with file ID
            const response = await httpClient.get(`/attachment/download`, {
                params: { id: fileId },
                responseType: 'blob', // Set response type to 'blob' for binary data
            });

            // Check if the request was successful
            if (response.status === 200) {
                // Convert response to Blob
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                // Create a URL for the Blob
                const url = window.URL.createObjectURL(blob);
                // Create a link element
                const link = document.createElement('a');
                // Set the link's href to the Blob URL
                link.href = url;
                // Set the download attribute with the file name
                link.download = fileName;
                // Append the link to the document body
                document.body.appendChild(link);
                // Trigger the download
                link.click();
                // Clean up by removing the link
                document.body.removeChild(link);
                // Revoke the Blob URL
                window.URL.revokeObjectURL(url);
            } else {
                console.error('File download failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const uploadFile = async (milestoneId: string, file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('documentType', 'CHECKPOINT');
            formData.append('checkPointId', milestoneId);

            const response = await httpClient.post('/attachment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const fileId = response.data.fileId;

                setMilestones((prevMilestones) =>
                    prevMilestones.map((milestone) => {
                        if (milestone.id === milestoneId) {
                            return {
                                ...milestone,
                                uploadedFiles: [
                                    ...(milestone.uploadedFiles || []),
                                    {
                                        id: fileId,
                                        name: file.name,
                                        size: file.size,
                                        status: true,
                                    },
                                ],
                            };
                        }
                        return milestone;
                    })
                );

                // Save the milestone submission status
                saveUploadedMilestone(milestoneId);

                // Hide the submit button
                setMilestones((prevMilestones) =>
                    prevMilestones.map((milestone) => {
                        if (milestone.id === milestoneId) {
                            return {
                                ...milestone,
                                isOpen: false,
                            };
                        }
                        return milestone;
                    })
                );
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const determineSubmittedMilestones = () => {
        const submittedMilestones = milestones
            .filter(milestone =>
                milestone.uploadedFiles?.some(file => file.status === true)
            )
            .map(milestone => milestone.id);
        setIsSubmitted(submittedMilestones);
    };
    useEffect(() => {
        determineSubmittedMilestones();
    }, [milestones]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, milestoneId: string) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            // Ensure the milestone ID is correctly added to the set
            setSubmittedMilestones((prev) => {
                const newSet = new Set(prev);
                newSet.add(milestoneId);
                console.log('Added milestone ID to submittedMilestones:', milestoneId);
                console.log('Current submittedMilestones Set:', newSet);
                return newSet;
            });
            const file = e.target.files[0];
            const fileSizeInMB = file.size / (1024 * 1024);

            if (fileSizeInMB > 10) {
                setIsAlertModalOpen(true);
                setSelectedFile(null);
                e.target.value = '';
            } else {
                setSelectedFile(file);
                setSubmittedMilestones((prev) => new Set(prev).add(milestoneId));
            }
        }
    };
    const handleSubmit = async (milestoneId: string) => {
        if (selectedFile) {
            try {
                await uploadFile(milestoneId, selectedFile);
                setSelectedFile(null);
                determineSubmittedMilestones();
                const currentIndex = milestones.findIndex((milestone) => milestone.id === milestoneId);
                if (currentIndex >= 0 && currentIndex < milestones.length - 1) {
                    const nextMilestoneId = milestones[currentIndex + 1].id;
                    setOpenMilestones((prev) => [...prev, nextMilestoneId]);
                }
            } catch (error) {
                console.error('Error submitting milestone:', error);
            }
        }
    };
    const saveUploadedMilestone = async (checkPointId: string) => {
        try {
            // Fetch all attachments for the checkpoint
            const attachmentsResponse = await httpClient.get('/attachment/checkpoint', {
                params: { checkPointId },
            });
            const attachments = attachmentsResponse.data;
            //status to be set for attachments
            const allAttachmentsSubmitted = attachments.every((attachment: { status: boolean }) => attachment.status);
            console.log('Attachment Status : ', allAttachmentsSubmitted);
            if (!allAttachmentsSubmitted) {
                await httpClient.put('/attachment/check-point/status', null, {
                    params: {
                        checkPointId,
                        status: true,
                    },
                });
            }

        } catch (error) {
            console.error(`Failed to save status for attachments of checkpoint ${checkPointId}:`, error);
        }
    };
    const handleApproveClick = (milestoneId: string) => {
        setIsApproveAndPay(true);
        setIsModalOpen(true);
        const updatedMilestones = milestonesState.map((milestone) =>
            milestone.id === milestoneId ? { ...milestone, isPaid: true } : milestone
        );
        setMilestonesState(updatedMilestones);
        setSelectedMilestone(null);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handlePayAll = () => {
        // Calculate total amount to be paid
        const total = milestones
            .filter((milestone) => isSubmitted.includes(milestone.id))
            .reduce((acc, milestone) => acc + milestone.price, 0);

        // Set total amount and open PaymentCard modal
        setTotalAmount(total);
        setIsPaymentCardOpen(true);
    };
    const handlePaySelected = (selectedMilestones: Milestone[], totalAmount: number) => {
        console.log('Selected Milestones for Pay:', selectedMilestones);
        console.log('Total Amount for Pay Selected:', totalAmount);
        setTotalAmount(totalAmount);
        setIsPaymentCardOpen(true);
    };
    const toggleMilestone = (id: string) => {
        setOpenMilestones((prev) =>
            prev.includes(id) ? prev.filter((milestoneId) => milestoneId !== id) : [...prev, id]
        );
    };
    const formatFileSize = (sizeInBytes: number): string => {
        const units: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let size: number = sizeInBytes;
        let unitIndex: number = 0;
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }
    //index of the current milestone
    const currentMilestoneIndex = milestones.findIndex(
        (milestone) => !isSubmitted.includes(milestone.id)
    );
    // Function to check if a milestone is the current one
    const isCurrentMilestone = (index: number) =>
        currentMilestoneIndex === -1 ? index === milestones.length - 1 : index === currentMilestoneIndex;
    const closePaymentCard = () => {
        setIsPaymentCardOpen(false);
    };
    const handleCloseAlertModal = () => {
        setIsAlertModalOpen(false);
    };

    const uniqueMilestones = milestones.filter(
        (milestone, index, self) =>
            index === self.findIndex((m) => m.title === milestone.title)
    );

    return (
        <div className="relative">
            <ul className="space-y-4">
                {uniqueMilestones.length > 0 ? uniqueMilestones.map((milestone, index) => (
                    <li key={milestone.id} className="relative">
                        {index !== uniqueMilestones.length - 1 && (  // This condition ensures the line doesn't extend past the last item
                            <div
                                className="absolute left-3 top-0 h-full bg-cyan-900"
                                style={{
                                    width: '2px',
                                }}
                            ></div>
                        )}
                        <div
                            className={`flex items-center cursor-pointer relative
                                }`}
                            onClick={() => toggleMilestone(milestone.id)}
                        >
                            <span
                                className={`mr-4 text-black transition-transform duration-200 ${openMilestones.includes(milestone.id) ? 'rotate-90' : ''}`}
                            >
                                ▶
                            </span>
                            <span className={`font-semibold text-sm ${isCurrentMilestone(index) ? 'text-yellow-600' : 'text-gray-400'
                                } text-cyan-950`}>
                                {milestone.title}
                            </span>
                            <div
                                className="bg-cyan-900 absolute"
                                style={{
                                    width: '2px',
                                    marginLeft: 6,
                                    padding: 1.5,
                                }}
                            ></div>
                        </div>
                        <Collapsible isOpen={openMilestones.includes(milestone.id)}>
                            <div className="ml-4 mt-2">
                                <ul className={`list-disc list-outside font-semibold text-xs ml-6 ${isCurrentMilestone(index) ? 'text-yellow-600' : 'text-gray-400'}`}>
                                    {milestone.tasks.map(task => <li key={task.id}>{task.name}</li>
                                    )}
                                    <li>{`Amount to pay: ${milestone.price}`}</li>
                                </ul>
                                {authUserType === 'freelancer' && milestone.title !== 'Review' ? (
                                    <div className="mt-2 flex flex-col justify-center items-center">
                                        <label className="text-white bg-yellow-500 py-1 px-2 text-2xs rounded-lg inline-flex items-center cursor-pointer w-48 overflow-hidden">
                                            <DocumentArrowUpIcon className="h-4 w-4 mr-1 flex-shrink-0" />

                                            {selectedFile ? (
                                                <Marquee text={selectedFile.name} />
                                            ) : (
                                                'Upload'
                                            )}
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e, milestone.id)}
                                                disabled={approvedMilestone[milestone.id]} />
                                        </label>
                                        <FileSizeAlertModal
                                            isOpen={isAlertModalOpen}
                                            onClose={handleCloseAlertModal} />
                                        <div className="flex flex-row gap-3 mt-2 ">

                                            <Button
                                                title='Submit Work'
                                                icon={<BookmarkSquareIcon className="h-4 w-4" />}
                                                size="2xs"
                                                onClick={() => handleSubmit(milestone.id)}
                                                disabled={(approvedMilestone[milestone.id])} />
                                            <Button
                                                size="2xs"
                                                title="Complete"
                                                icon={<CheckIcon className="h-4 w-4 text-white" />}
                                                onClick={() => console.log("complete")} />
                                        </div>

                                    </div>
                                ) : ''}
                                {authUserType === 'employer' && (
                                    <div className="mt-2 justify-center border border-yellow-500 rounded-lg p-4">
                                        {milestone.uploadedFiles && milestone.uploadedFiles.length > 0 ? (
                                            milestone.uploadedFiles.map((file, index) => (

                                                <div key={index} className="flex items-center space-x-2 ml-4 mb-4">
                                                    <a
                                                        download
                                                        className="text-blue-500 underline text-xs cursor-pointer w-[50%]"
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Prevent default link behavior
                                                            downloadFile(file.id, file.name);
                                                        }}
                                                    >
                                                        {file.name}
                                                    </a>
                                                    <span className="text-xs">{file.size}</span>
                                                    {milestone.uploadedFiles?.map((file) => (
                                                        <div key={file.name} className="flex">
                                                            <ArrowDownTrayIcon onClick={() => downloadFile(file.id, file.name)} className="w-4 h-4 cursor-pointer" />
                                                        </div>
                                                    ))}

                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-cyan-950 text-sm font-bold mb-2">No files submitted yet.</p>
                                        )}
                                        <Button
                                            icon={<DocumentArrowUpIcon className="w-4 h-4 mr-2" />}
                                            title="Approve&Pay"
                                            color='warning'
                                            size='xs'
                                            onClick={() => handleApproveClick(milestone.id)}
                                            disabled={isApproveAndPay || !milestone.uploadedFiles || milestone.uploadedFiles.length === 0} />
                                    </div>
                                )}
                                {authUserType === 'freelancer' && milestone.uploadedFiles && milestone.uploadedFiles.length > 0 && (
                                    <div className="mt-4 ml-7">
                                        {milestone.uploadedFiles.map((file, index) => (
                                            <div key={index} className="flex flex-row gap-3 space-x-3">
                                                <a

                                                    download
                                                    className="text-blue-500 underline text-xs cursor-pointer w-[50%]"
                                                >
                                                    {file.name}
                                                </a>
                                                <span className="text-xs">{file.size}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div></Collapsible>
                    </li>
                )) : (
                    <li>No milestones available</li>
                )}
            </ul>

            {isModalOpen && (
                <ApproveAndPayModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    milestoneArr={milestones}
                    onPayAll={handlePayAll}
                    onPaySelected={handlePaySelected}
                />
            )}

            <Modal
                isOpen={isPaymentCardOpen}
                onClose={() => setIsPaymentCardOpen(false)}
            >
                <PaymentCard
                    totalAmount={totalAmount}
                    onPaid={closePaymentCard}
                />

            </Modal>


        </div>
    );
};

export default MilestoneProgressSection;
