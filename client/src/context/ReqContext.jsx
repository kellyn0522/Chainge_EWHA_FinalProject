import { createContext, useCallback, useEffect, useContext, useState } from "react";
import { baseUrl, postRequest, deleteRequest, getRequest } from "../utils/services";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const ReqContext = createContext();
export const ReqContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { 
        user
    } = useContext(AuthContext);
    const [reqInfo, setReqInfo] = useState(
        {
            senderId: '', 
            itemId:'', 
            ownerId:'',
            start:'',
            end:'',
            period:'',
        }
    );
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReqError, setIsReqError] = useState(null);
    const [isReqLoading, setIsReqLoading] = useState(false);

    const updateReqInfo = useCallback((info) => {
        setReqInfo((prevInfo) => ({ ...prevInfo, ...info }));
    }, []);

    const createReq = useCallback(async(e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const response = await postRequest(
                `${baseUrl}/itemReq`,
                JSON.stringify(reqInfo));

            console.log("Request response ", response);
        

            if (response.error) {
                return setIsError(response.error);
            }

            navigate("/");
    }catch(error){
        console.log("ERRORRRRRRRRRR");
        setIsError(error,message);
    }
    }, [reqInfo, navigate]);

    const getReq = async (url) => {
        if (user?._id) {
            setIsReqLoading(true);
            setIsReqError(null);

            try{
                const response = await getRequest(url);
                setIsReqLoading(false);

                if (response.error) {
                    setIsReqError(response);
                    return null;
                }
                console.log("!!!!!!!!!!!!!!!!!!", response);
                return response;
            }catch(error){
                console.log("ERRORRRRRRR");
                setIsReqError(error.message);
                setIsReqLoading(false);
                return null;
            }
        }
    };


    const getUserReceiveReq = async() => {
        if (user?._id) {
            return await getReq(`${baseUrl}/itemReq/r/${user?._id}`);
        }
        return null;
    };

    const getUserSendReq = async() => {
        if (user?._id) {
            return await getReq(`${baseUrl}/itemReq/s/${user?._id}`);
        }
        return null;
    };

    const findingReq = async(reqID) => {
        return await getReq(`${baseUrl}/itemReq/find/${reqID}`);
    };

    return (<ReqContext.Provider value={{
        createReq,
        getUserReceiveReq,
        getUserSendReq,
        findingReq,
        
        isLoading,
        isError,
        isReqLoading,
        isReqError,

        updateReqInfo
    }}>
        {children}
    </ReqContext.Provider>
    );
}
