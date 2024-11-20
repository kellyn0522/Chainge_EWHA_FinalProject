import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, deleteRequest } from "../utils/services";
import {useNavigate} from "react-router-dom";

export const ReqContext = createContext();
export const ReqContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [reqInfo, setReqInfo] = useState(
        {
            senderId: '', 
            itemId:'', 
            ownerId:'',
        }
    );
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const makeReq = useCallback(async(senderId, itemId, ownerId) => {
        e.preventDefault();

        const response = await postRequest(
            `${baseUrl}/itemReq`,
            JSON.stringify(reqInfo));

        console.log("Request response ", response);
        

        if (response.error) {
            return setIsError(response);
        }

        navigate("/");
    }, [reqInfo]);
/*
    useEffect(() => {
        const getUserReceiveReq = async () => {

            //console.log('user:', user);
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
    }, [user, notifications]);
}

    router.get("/s/:userId", findUserSendReq);
    router.get("/r/:userId", findUserReceivedReq);
    router.get("/find/:firstId/:secondId", findReq);



*/













}
