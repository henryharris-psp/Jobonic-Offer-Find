import { useChat } from "@/contexts/chat";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

interface ContractAcceptStatusProps {
    isSenderAccepted: boolean,
    isReceiverAccepted: boolean,
    size?: 'sm' | 'xs'
}

const ContractAcceptStatus = ({
    isSenderAccepted,
    isReceiverAccepted,
    size = 'xs'
}: ContractAcceptStatusProps) => {
    const { activeChatRoom, latestContract, authUserType } = useChat();

    return (
        <div className="flex flex-col space-y-1 m-1">
            {/* for auth user */}
            { isSenderAccepted ? (
                <div className="flex flex-row items-center space-x-1">
                    <CheckCircleIcon className={`text-green-500 ${
                        size === 'sm' ? 'size-5' : 'size-4'
                    }`} />
                    <span className={`text-${size} text-gray-900`}>
                        You have accepted the contract.
                    </span>
                </div>
            ) : (
                <div className="flex flex-row items-center space-x-1">
                    <ClockIcon className={`text-yellow-500 ${
                        size === 'sm' ? 'size-5' : 'size-4'
                    }`} />
                    <span className={`text-${size} text-gray-500`}>
                        {activeChatRoom?.receiver.firstName} is waiting for your approval
                    </span>
                </div>
            )}

            {/* for reciver */}
            { isReceiverAccepted ? (
                <div className="flex flex-row items-center space-x-1">
                    <CheckCircleIcon className={`text-green-500 ${
                        size === 'sm' ? 'size-5' : 'size-4'
                    }`} />
                    <span className={`text-${size} text-gray-900`}>
                        {activeChatRoom?.receiver.firstName} has accepted the
                        contract.
                    </span>
                </div>
            ) : (
                <div className="flex flex-row items-center space-x-1">
                    <ClockIcon className={`text-yellow-500 ${
                        size === 'sm' ? 'size-5' : 'size-4'
                    }`} />
                    <span className={`text-${size} text-gray-500`}>
                        Waiting for another member approval
                    </span>
                </div>
            )}

            { isSenderAccepted && isReceiverAccepted ? (
                authUserType === 'freelancer' ? (
                    <div className="flex flex-row items-center space-x-1">
                        <ClockIcon className={`text-yellow-500 ${
                            size === 'sm' ? 'size-5' : 'size-4'
                        }`} />
                        <span className={`text-${size} text-gray-500`}>
                            Waiting for employer&apos;s payment
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-row items-center space-x-1">
                        <ClockIcon className={`text-yellow-500 ${
                            size === 'sm' ? 'size-5' : 'size-4'
                        }`} />
                        <span className={`text-${size} text-gray-500`}>
                            Waiting for your payment. Total ${ latestContract ? latestContract.price : 0 }
                        </span>
                    </div>
                )
            ) : ''}
        </div>
    );
};

export default ContractAcceptStatus;
