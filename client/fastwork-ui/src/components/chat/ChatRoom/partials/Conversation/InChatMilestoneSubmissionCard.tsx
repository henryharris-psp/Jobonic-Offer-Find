import React, { useEffect, useMemo, useState } from "react";
import MediaSkeleton from "./MediaSkeleton";
import { Milestone } from "@/types/general";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { ArrowPathIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import httpClient from "@/client/httpClient";
import { fetchUploadedFiles, updateMilestoneStatus } from "@/functions/helperFunctions";
import MilestonePaymentConfirmationDialog from "@/components/payment/MilestonePaymentConfirmationDialog";

interface InChatMilestoneSubmissionCardProps {
    milestoneId: string;
    isSentByAuthUser: boolean;
}

const InChatMilestoneSubmissionCard = ({
    milestoneId,
    isSentByAuthUser,
}: InChatMilestoneSubmissionCardProps) => {
    const { 
        activeChatRoom, 
        authUserType,
        latestContract,
        sendMessage,
        setShowProgressList
    } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [milestone, setMilestone] = useState<Milestone | null>(null);
    const [showMilestonePaymentConfirmationDialog, setShowMilestonePaymentConfirmationDialog] = useState(false);

    //on mounted
        useEffect(() => {
            fetchMilestone();
        }, []);

    //computed
        const total = useMemo( () => {
            const uploadedFiles = milestone?.uploadedFiles || [];
            return uploadedFiles?.reduce((acc, current) => {
                const size = parseFloat(current.size);
                return {
                    count: acc.count + 1,
                    size: acc.size + size
                }
            }, {
                count: 0,
                size: 0
            })
        }, [milestone?.uploadedFiles]);

        const firstThreeFiles = useMemo( () => {
            return milestone?.uploadedFiles ? milestone.uploadedFiles.slice(0, 3) : [];
        }, [milestone?.uploadedFiles]);

    //methods
        const fetchMilestone = async () => {
            const controller = new AbortController();
            const signal = controller.signal;

            setIsLoading(true);
            try {
                //get_milestone
                const milestoneRes = await httpClient.get(
                    `checkpoint?id=${milestoneId}`,
                    { signal }
                );
                const files = await fetchUploadedFiles(milestoneRes.data.id);

                setMilestone({
                    ...milestoneRes.data,
                    uploadedFiles: files ?? []
                });
            } catch (error) {
                console.log("error fetching milestone", error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleOnReject = async () => {
            if(confirm("Are you sure to accept?")){
                try{
                    const targetMilestone = latestContract?.milestones.find( e => e.id === milestoneId );
                    if(targetMilestone){
                        await updateMilestoneStatus(targetMilestone, 'waiting_for_submission');
                        await sendMessage('text', `Unfortunately, your submission for ${milestone?.title} has been rejected.`);
                    }
                } catch (error) {
                    console.log('error on reject', error);
                }
            }
        }
        
        const handleOnApproveAndPay = async () => {
            setShowMilestonePaymentConfirmationDialog(true);
        }

        const handleOnDownload = () => {
            console.log('fdfdd')
        }

    return (
        <>
            { isLoading ? (
                <MediaSkeleton />
            ) : !milestone ? (
                <div className="relative">
                    <MediaSkeleton />
                    <div className="flex items-center justify-center absolute top-0 right-0 left-0 bottom-0">
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300"
                            onClick={fetchMilestone}
                        >
                            <span className="">
                                <ArrowPathIcon
                                    className={`size-5 font-bold text-gray-600 ${
                                        isLoading ? "animate-spin" : ""
                                    }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="min-w-72 pt-3 px-4 pb-4 bg-white shadow-md rounded-lg border border-gray-200 space-y-4">                        
                    {/* title */}
                    <div className="flex flex-col space-y-2">
                        <span className="font-semibold text-sm text-green-500">
                            {isSentByAuthUser
                                ? "You"
                                : activeChatRoom?.sender.lastName
                            } submitted a work
                        </span>

                        <div className="flex flex-col">
                            <span className="text-gray-400 text-sm italic">
                                For milestone
                            </span>
                            <span className="font-semibold text-gray-800">
                                {milestone.title}
                            </span>
                        </div>
                        <hr className="my-2 border-gray-300" />
                    </div>

                    { total.count === 0 ? (
                        <div className="flex flex-col text-sm space-y-1">
                            <span className="text-gray-400">
                                No attachment uploaded
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col text-sm space-y-2">
                            <span className="text-gray-600">
                                Total: { total.count } files
                            </span>
                            <span className="text-gray-600">
                                Total Size: { total.size } MB
                            </span>

                            <div className="flex flex-col space-y-1">
                                { firstThreeFiles.map( file => 
                                    <button 
                                        key={file.id}
                                        onClick={handleOnDownload}
                                    >
                                        <span className="text-blue-500 underline">
                                            { file.name }
                                        </span>
                                    </button>
                                )}
                                { total.count > 3 ? (
                                    <div>
                                        <button 
                                            className="text-blue-700 mt-1"
                                            onClick={() => setShowProgressList(true)}
                                        >
                                            and { total.count - 3 } more...
                                        </button>
                                    </div>
                                ) : ''}
                            </div>
                            
                        </div>
                    )}
                    
                    { authUserType === 'employer' ? (
                        <div className="flex flex-row gap-1">
                            <Button
                                title="Reject"
                                color="danger"
                                size="xs"
                                icon={<XMarkIcon className="size-5 text-white"/>}
                                onClick={handleOnReject}
                            />
                            <Button
                                title="Approve & Pay"
                                size="xs"
                                color="success"
                                icon={<CheckIcon className="size-5 text-white"/>}
                                onClick={handleOnApproveAndPay}
                            />
                        </div>
                    ) : ''}
                </div>
            )}

            <MilestonePaymentConfirmationDialog
                isOpen={showMilestonePaymentConfirmationDialog}
                onClose={() => setShowMilestonePaymentConfirmationDialog(false)}
                milestoneId={milestoneId}
                leftAmount={600}
                amountToPay={123}
            />
        </>
    );
};

export default InChatMilestoneSubmissionCard;
