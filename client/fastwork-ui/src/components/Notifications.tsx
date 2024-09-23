import { RootState } from "@/store";
import { closeNotification } from "@/store/reducers/uiReducer";
import { ChatBubbleBottomCenterTextIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const notiPropsMap = {
    success: {
        color: '#5A9E4A',
        icon: <CheckCircleIcon
            className="size-6"
            color="#5A9E4A"
        />
    },
    warning: {
        color: '#D0693B',
        icon: <ExclamationTriangleIcon
            className="size-6"
            color="#D0693B"
        />
    },
    danger: {
        color: '#DD4A4A',
        icon: <XCircleIcon
            className="size-6"
            color="#DD4A4A"
        />
    },
    info: {
        color: '#71BAC7',
        icon: <ExclamationCircleIcon
            className="size-6"
            color="#71BAC7"
        />
    },
    chat: {
        color: '#3b82f6',
        icon: <ChatBubbleBottomCenterTextIcon
            className="size-6"
            color="#3b82f6"
        />
    },
}

const Notifications = () => {
    const { notifications } = useSelector((state: RootState) => state.ui );
    const dispatch = useDispatch();

    const handleOnClose = (notificationId: string | undefined) => {
        if(notificationId) dispatch(closeNotification(notificationId));
    }

    return (
        <div className="absolute z-50 max-h-screen top-0 right-0 space-y-2 overflow-auto pt-2 mr-2 pb-7">
            <AnimatePresence>
                {notifications.map((noti, index) => (
                    <motion.div 
                        key={noti.id} 
                        initial={{ opacity: 1, y: -5 }}
                        animate={{ opacity: 1, y: 2 }}
                        exit={{ opacity: 0, y: -5 }}
                        style={{
                            backgroundColor: notiPropsMap[noti.status].color
                        }}
                        className="max-w-80 min-w-72 rounded-lg overflow-hidden shadow-lg"
                    >
                        <div className="flex flex-row bg-white px-3 py-4 ml-1 rounded-lg space-x-3 border border-gray-200">
                            <div className="flex items-center">
                                { notiPropsMap[noti.status].icon }
                            </div>
                            <div className="flex-1 flex flex-col space-y-1 overflow-hidden">
                                <span className="text-sm font-medium text-gray-900">
                                    { noti.title }
                                </span>
                                <span className="text-sm text-gray-500 truncate">
                                    { noti.content }
                                </span>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="rounded-full hover:bg-gray-200 p-1"
                                    onClick={() => handleOnClose(noti.id)}
                                >
                                    <XMarkIcon className="size-5 text-gray-400"/>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
