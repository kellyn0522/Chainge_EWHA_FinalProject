import { createContext, useState, useEffect, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const [notifications, setNotifications] = useState([]);

    // console.log("messages", messages);

    // console.log("onlineUsers", onlineUsers);

     console.log("notification", notifications);
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    //add onlineUsers

    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });
        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket]);

    // send Message
    useEffect(() => {
        if (socket === null) return;
        const recipientId = currentChat?.members?.find((id) => id !== user?._id);

        socket.emit("sendMessage", { ...newMessage, recipientId })

    }, [newMessage]);

    //  receive message and notification 
    useEffect(() => {
        if (socket === null) return;
        
        socket.on("getMessage", (res) => {
            if(currentChat?._id !== res.chatId ) return;

            setMessages((prev) => [...prev , res]);
        });

        socket.on("getNotification", (res) =>{
            const isChatOpen = currentChat?.members.some(id => id === res.senderId);
            if(isChatOpen) {
                setNotifications((prev) => [{...res, isRead: true}, ...prev]);
            }else{
                setNotifications((prev) => [res,...prev]);
            }
        } );

        return () => {
            socket.off("getMessage");
            socket.off("getNotification");
        };
    }, [socket, currentChat]);



    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response.error) {
                return console.log("Error fetching users", response);
            }

            console.log("response", response);


            const pChats = response.filter((u) => {
                let isChatCreated = false;

                if (user?._id === u._id) return false;
                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    });
                }
                return !isChatCreated;
            });

            setPotentialChats(pChats);
        };
        getUsers();
    }, [userChats]);

    useEffect(() => {
        const getUserChats = async () => {

            console.log('user:', user);
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
                setIsUserChatsLoading(false);
                //console.log('API response:', response);

                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        };
        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {

            setIsMessagesLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
            setIsMessagesLoading(false);

            if (response.error) {
                return setMessagesError(response);
            }
            setMessages(response);

        };
        getMessages();
    }, [currentChat]);

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {

        if (!textMessage) { return console.log("You must type something... "); }

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        })
        );
        if (response.error) {
            return setSendTextMessageError(response);
        }
        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage("");

    },
        []);



    const updateCurrentChat = useCallback((chat) => {
        //console.log('Chat clicked:', chat);
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`,
            JSON.stringify({
                firstId,
                secondId,
            }), {
            headers: { "Content-Type": "application/json" }
        }

        );
        if (response.error) {
            return console.log("Error creating chat", response);
        }
        setUserChats((prev) => [...prev, response]);
    }, []);

    return (<ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers,
        notifications,


    }}>
        {children}
    </ChatContext.Provider>
    );

};
