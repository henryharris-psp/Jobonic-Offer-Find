import styles from './Notifications.module.css';
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useApp } from "@src/lib/contexts/app";
import { AnimatePresence, motion } from "framer-motion";

const colors = [
    {
        status: 'success',
        color: '#16a34a'
    },
    {
        status: 'info',
        color: '#0284c7'
    },
    {
        status: 'error',
        color: '#dc2626'
    },
    {
        status: 'warning',
        color: '#ca8a04'
    }
]

const Notifications = () => {
    const { notifications, closeNotification } = useApp();
    const location = useLocation();

    //toast notifications are disabled at Login Screen
    if(location.pathname === '/'){
        return null;
    }

    return (
        <div className={styles.container}>
            <AnimatePresence>
                {notifications.map((noti, index) => (
                    <motion.div 
                        key={noti + index} 
                        className={styles.toast}
                        initial={{ opacity: 1, y: -5 }}
                        animate={{ opacity: 1, y: 2 }}
                        exit={{ opacity: 0, y: -5 }}
                        style={{
                            backgroundColor: colors.find( e => e.status === noti.status ).color
                        }}
                    >
                        <div className={styles.msgContainer}>
                            <span>{noti.msg}</span>
                        </div>
                        <IconButton onClick={() => closeNotification(noti.id)}>
                            <Close fontSize="small" sx={{ color: 'white'}}/>
                        </IconButton>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
