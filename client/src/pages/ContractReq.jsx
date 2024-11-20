import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications"; // (경로는 상황에 맞게 수정)
import moment from "moment";

const ContractReq = () => {/*
    const markAllNotificationAsRead = useCallback(() => {
        const mNotifications = notifications.map(n => ({...n, isRead: true}));
        setNotifications(mNotifications);
    }, [notifications]);

    const markNotificationAsRead = useCallback((notificationId) => {
        const mNotifications = notifications.map(n => 
            n.id === notificationId? {...n, isRead: true}: n
        );
        setNotifications(mNotifications);
    }, [notifications]);
    */
    return( 
        <div>
            {notifications.map((notification) => (
                <div key = {notification.id} style = {{backgroundColor: notification.isRead? 'lightgray': 'lightyellow'}}>
                    <strong>{notification.senderId}</strong>
                    <p>{notification.message}</p>
                </div>
            ))}
        </div>
    );
};

export default ContractReq;
