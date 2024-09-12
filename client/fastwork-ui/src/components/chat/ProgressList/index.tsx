import React, { useState, useEffect } from 'react';
import { TrashIcon, PlusIcon, ArrowDownTrayIcon, DocumentArrowUpIcon, BookmarkSquareIcon } from "@heroicons/react/24/solid";
import httpClient from '@/client/httpClient';
import { useChat } from '@/contexts/chat';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ApproveAndPayModal from '@/components/ApproveAndPay';
import Button from '@/components/Button';
import Marquee from './Marquee/Marquee';
import Modal from '@/components/Modal';
import PaymentCard from '@/components/payment/PaymentCard';

interface Milestone {
    id: string;
    title: string;
    price: number;
    tasks: string[];
    isOpen: boolean;
    serviceId: string;
    uploadedFiles?: { name: string; size: number; status: boolean }[];
}

const ProgressList: React.FC = () => {
    const [openMilestones, setOpenMilestones] = useState<string[]>([]);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [submittedMilestones, setSubmittedMilestones] = useState<Set<string>>(new Set());
    const [isSubmitted, setIsSubmitted] = useState<string[]>([]);

    const [isPaymentCardOpen, setIsPaymentCardOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom } = useChat();
    const authUserType: 'freelancer' | 'employer' = activeChatRoom?.freelancer_id === authUser?.profile.id ? 'freelancer' : 'employer';

    useEffect(() => {
        if (activeChatRoom && activeChatRoom.messages.length !== 0) {
            const contractMessages = activeChatRoom.messages.filter(
                (message) => message.media_type === 'contract'
            );

            if (contractMessages.length !== 0) {
                const latestContractMessage = contractMessages.reduce((latest, message) => {
                    return message.id > latest.id ? message : latest;
                }, contractMessages[0]);

                const latestContractId = latestContractMessage.content;
                if (latestContractId) {
                    fetchMilestonesPerContract(latestContractId);
                }
            }
        }
    }, [activeChatRoom?.messages]);

    const fetchMilestonesPerContract = async (contractId: string | number) => {
        try {
            const serviceId = activeChatRoom?.service_id;
            if (!serviceId) return;

            // Fetch contract data to get milestones
            const contractResponse = await httpClient.get(`/contract/${contractId}`);
            const milestonesData: Milestone[] = contractResponse.data.milestones;

            const updatedMilestones = await Promise.all(
                milestonesData.map(async (milestone) => {
                    try {
                        const attachmentsResponse = await httpClient.get('/attachment/checkpoint', {
                            params: { checkPointId: milestone.id },
                        });
                        const milestoneAttachments = attachmentsResponse.data;

                        const files = milestoneAttachments.map((attachment: { name: string; fileSize: string; file: string; status: boolean }) => ({
                            name: attachment.name,
                            size: parseFloat(attachment.fileSize),
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

            setMilestones(updatedMilestones);
        } catch (error) {
            console.error('Cannot fetch contract data:', error);
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
                // Update milestones with new file
                setMilestones((prevMilestones) =>
                    prevMilestones.map((milestone) => {
                        if (milestone.id === milestoneId) {
                            return {
                                ...milestone,
                                uploadedFiles: [
                                    ...(milestone.uploadedFiles || []),
                                    {
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


    // Determine submitted milestones based on file status
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

            // Update state to reflect that a file is selected for this milestone
            setSubmittedMilestones((prev) => new Set(prev).add(milestoneId));
        }
    };

    const handleSubmit = async (milestoneId: string) => {
        if (selectedFile) {
            try {
                // Upload the file associated with the specific milestone
                await uploadFile(milestoneId, selectedFile);

                // Clear the selected file after a successful upload
                setSelectedFile(null);

                // Call determineSubmittedMilestones to refresh the submitted state
                determineSubmittedMilestones();

                // Automatically open the next milestone if it exists
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

    const handleApproveClick = () => {
        setIsModalOpen(true);
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

    const handlePaySelected = () => {
        // Calculate total amount for selected milestones
        const total = milestones
            .filter((milestone) => submittedMilestones.has(milestone.id))
            .reduce((acc, milestone) => acc + milestone.price, 0);
        // Set total amount and open PaymentCard modal
        setTotalAmount(total);
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

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
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

    return (
        <div className="bg-[#E0F7FA] p-4 shadow-md w-[300px] pt-16 max-h-screen overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-center text-cyan-950">Progress List</h2>
            <div className="w-full h-[2px] bg-[#E2EEEE] mb-4 mt-4"></div>
            <ul className="space-y-4">
                {milestones.length > 0 ? milestones.map((milestone, index) => (
                    <li key={milestone.id}>
                        <div
                            className={`flex items-center cursor-pointer ${isCurrentMilestone(index) ? 'bg-yellow-50' : 'bg-gray-100'
                                } p-4 rounded-lg`}
                            onClick={() => toggleMilestone(milestone.id)}
                        >
                            <span
                                className={`mr-2 text-black transition-transform duration-200 ${openMilestones.includes(milestone.id) ? 'rotate-90' : ''}`}
                            >
                                ▶
                            </span>
                            <span className={`font-semibold text-sm ${isCurrentMilestone(index) ? 'text-yellow-800' : 'text-gray-500'
                                } text-cyan-950`}>
                                {milestone.title}
                            </span>
                        </div>
                        {openMilestones.includes(milestone.id) && (
                            <div className="ml-4 mt-2">
                                <ul className="list-disc list-outside font-bold text-sm ml-6">
                                    {milestone.tasks.map(task =>
                                        <li key={task}>{task.name}</li>
                                    )}
                                    <li>{`Amount to pay: ${milestone.price}`}</li>
                                </ul>
                                {authUserType === 'freelancer' && milestone.title !== 'Review' && !isSubmitted.includes(milestone.id) && (
                                    <div className="mt-2 flex justify-around items-center">
                                        <label className="text-white bg-yellow-700 font-bold py-2 px-2 text-xs rounded-lg inline-flex items-center mr-2 cursor-pointer w-52 overflow-hidden">
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
                                            />
                                        </label>
                                        <Button
                                            title='Submit Work'
                                            icon={<BookmarkSquareIcon className="h-4 w-4" />}
                                            color="success"
                                            size="xs"
                                            onClick={() => handleSubmit(milestone.id)}
                                        />
                                    </div>
                                )}
                                {authUserType === 'employer' && (
                                    <div className="mt-2 justify-center border border-yellow-500 rounded-lg p-4">
                                        {milestone.uploadedFiles && milestone.uploadedFiles.length > 0 ? (
                                            milestone.uploadedFiles.map((file, index) => (

                                                <div key={index} className="flex items-center space-x-2 ml-4 mb-4">
                                                    <a
                                                        download
                                                        className="text-blue-500 underline text-xs cursor-pointer w-[50%]"
                                                    >
                                                        {file.name}
                                                    </a>
                                                    <span className="text-xs">{formatFileSize(file.size)}</span>
                                                    <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
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
                                            onClick={handleApproveClick}
                                            disabled={!milestone.uploadedFiles || milestone.uploadedFiles.length === 0}
                                        />
                                    </div>
                                )}
                                {authUserType === 'freelancer' && milestone.uploadedFiles && milestone.uploadedFiles.length > 0 && (
                                    <div className="mt-4">
                                        {milestone.uploadedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between space-x-2 ml-4">
                                                <a

                                                    download
                                                    className="text-blue-500 underline text-xs cursor-pointer w-[50%]"
                                                >
                                                    {file.name}
                                                </a>
                                                <span className="text-xs">{formatFileSize(file.size)}</span>
                                                <ArrowDownTrayIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        )}
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

export default ProgressList;
