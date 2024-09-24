import React, { useEffect, useMemo, useState } from "react";
import MediaSkeleton from "./MediaSkeleton";
import { Milestone } from "@/types/general";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { ArrowPathIcon, BanknotesIcon, CheckIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import httpClient from "@/client/httpClient";
import { fetchUploadedFiles, updateMilestoneStatus } from "@/functions/helperFunctions";

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
        setShowProgressList, 
        sendMessage,
        updateChatRoom,
        latestContract
    } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [milestone, setMilestone] = useState<Milestone | null>(null);

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
            if(confirm("Are you sure to approve?")){
                try{
                    const targetMilestone = latestContract?.milestones.find( e => e.id === milestoneId );
                    if(targetMilestone){
                        await updateMilestoneStatus(targetMilestone, 'paid');
                        await sendMessage('text', `Great! Your submission for ${milestone?.title} has been approved.`);
                    }
                } catch (error) {
                    console.log('error on reject', error);
                }
            }
        }

    return (
        <>
            {isLoading ? (
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
                total.count !== 0 ? (
                    <div className="rounded-lg border border-gray-200 shadow-lg bg-white min-w-64 overflow-hidden">
                        <div className="flex flex-col space-y-2 p-4">
                            <div className="font-semibold text-sm text-green-500">
                                {isSentByAuthUser
                                    ? "You"
                                    : activeChatRoom?.sender.firstName
                                } submitted a work
                            </div>
                            <span className="text-gray-800 text-lg font-semibold">
                                For {milestone.title}
                            </span>
                            <hr className="my-2 border-gray-300" />

                            <div className="flex flex-col text-sm space-y-1">
                                <span className="text-gray-600">
                                    Total: { total.count } files
                                </span>
                                <span className="text-gray-600">
                                    Total Size: { total.size } MB
                                </span>
                            </div>
                            
                            <Button
                                title="View"
                                color="info"
                                size="sm"
                                onClick={() => setShowProgressList(true)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border border-gray-200 shadow-lg bg-white min-w-64 max-w-96 overflow-hidden">
                        <div className="flex flex-col space-y-2 p-4">
                            <span className="text-green-500 text-lg font-semibold space-x-1">
                                <span>
                                    {isSentByAuthUser
                                        ? "You"
                                        : activeChatRoom?.sender.firstName
                                    } submitted  
                                </span>
                                <span className="underline">
                                    {milestone.title}
                                </span>
                                <span>as completed.</span>
                            </span>
                            <span className="text-gray-600 text-sm">
                                { authUserType === 'freelancer'
                                    ? "Please wait for employer's approval."
                                    : "Do you want to approve?"
                                }
                            </span>
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
                    </div>
                )
            )}
        </>
    );
};

export default InChatMilestoneSubmissionCard;
