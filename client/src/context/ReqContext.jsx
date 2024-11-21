import { createContext, useCallback, useEffect, useContext, useState } from "react";
import { baseUrl, postRequest, deleteRequest } from "../utils/services";
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
        }
    );
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReqError, setIsReqError] = useState(null);
    const [isReqLoading, setIsReqLoading] = useState(false);
    const [received, setReceived] = useState([]);
    const [ send, setSend] = useState([]);
    const [foundReq, setFoundReq] = useState([]);


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

    const getReq = async (url, setterFunction) => {
        if (user?._id) {
            setIsReqLoading(true);
            setIsReqError(null);

            try{
                const response = await getRequest(url);
                setIsReqLoading(false);

                if (response.error) {
                    return setIsReqError(response);
                }
                setterFunction(response);
            }catch(error){
                console.log("ERRORRRRRRR");
                setIsReqError(error.message);
                setIsReqLoading(false);
            }
        }
    };


    const getUserReceiveReq = () => {
        if (user?._id) {
            getReq(`${baseUrl}/itemReq/r/${user?._id}`, setReceived);
        }
    };

    const getUserSendReq = () => {
        if (user?._id) {
            getReq(`${baseUrl}/itemReq/s/${user?._id}`,setSend);
        }
    };

    const findReq = () => {
        getReq(`${baseUrl}/find/${reqInfo.senderId}/${reqInfo.itemId}/${reqInfo.ownerId}`, setFoundReq);
    };
    
    useEffect(()=>{
        if (reqInfo.senderId && reqInfo.itemId && reqInfo.ownerId){
            findReq();
        }
    }, [reqInfo]);

    return (<ReqContext.Provider value={{
        createReq,
        getUserReceiveReq,
        getUserSendReq,
        findReq,
        received,
        send,
        foundReq,
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
