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
    const [acceptError, setAcceptError] = useState(null);
    const [isAcceptLoading, setIsAcceptLoading] = useState(false);
    const [deleteReqError, setDeleteReqError] = useState(null);
    const [isDeleteReqLoading, setIsDeleteReqLoading] = useState(false);
    const [signingError, setSigningError] = useState(null);
    const [isSigningLoading, setIsSigningLoading] = useState(false);

    const updateReqInfo = useCallback((info) => {
        setReqInfo((prevInfo) => ({ ...prevInfo, ...info }));
    }, []);

    const createReq = useCallback(async() => {
        setIsLoading(true);

        try{
            const response = await postRequest(
                `${baseUrl}/itemReq`,
                JSON.stringify(reqInfo));

            console.log("Request response ", response);
        

            if (response.error) {
                return setIsError(response.error);
            }
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

const updateAccept = useCallback(async(reqID) => {
    console.log("Update ACCEPT called");
    setAcceptError(null);
    setIsAcceptLoading(true);

    try{
        if(!reqID){
            setAcceptError("Invalid Req ID");
            setIsAcceptLoading(false);
            throw new Error("Invalid Req ID");
        }

        const response = await postRequest(
            `${baseUrl}/itemReq/update/${reqID}`,);

        console.log("updater response ", response);
        setIsAcceptLoading(false);
    
        if (response.error) {
            console.log("error in update request");
            return setAcceptError(response);
        }
        console.log(response);

    } catch (error){
        setAcceptError(error.message)
        console.log(error.message)
    } finally{
        setIsAcceptLoading(false);
    }
}, []);

const tenantSigned = useCallback(async(reqID) => {
    console.log("Tenant is signing the contract");
    setSigningError(null);
    setIsSigningLoading(true);

    try{
        if(!reqID){
            setSigningError("Invalid Req ID");
            setIsSigningLoading(false);
            throw new Error("Invalid Req ID");
        }

        const response = await postRequest(
            `${baseUrl}/itemReq/tSign/${reqID}`,);

        console.log("Sign response ", response);
        setIsSigningLoading(false);
    
        if (response.error) {
            console.log("error in Sign request");
            return setSigningError(response);
        }
        console.log(response);

    } catch (error){
        setSigningError(error.message)
        console.log(error.message)
    } finally{
        setIsSigningLoading(false);
    }
}, []);

const landlordSigned = useCallback(async(reqID) => {
    console.log("Landlord is signing the contract");
    setSigningError(null);
    setIsSigningLoading(true);

    try{
        if(!reqID){
            setSigningError("Invalid Req ID");
            setIsSigningLoading(false);
            throw new Error("Invalid Req ID");
        }

        const response = await postRequest(
            `${baseUrl}/itemReq/lSign/${reqID}`,);

        console.log("Sign response ", response);
        setIsSigningLoading(false);
    
        if (response.error) {
            console.log("error in Sign request");
            return setSigningError(response);
        }
        console.log(response);

    } catch (error){
        setSigningError(error.message)
        console.log(error.message)
    } finally{
        setIsSigningLoading(false);
    }
}, []);

const deleteR = useCallback(async(reqID) => { 
        console.log("delete request called");
        setIsDeleteReqLoading(true);
        setDeleteReqError(null);
        try{
            if(!reqID){
                setDeleteReqError("Invalid Request ID");
                setIsDeleteReqLoading(false);
                throw new Error("Invalid Request ID");
            }
            
            const response = await deleteRequest(
                `${baseUrl}/itemReq/delete/${reqID}`
            );

            console.log("deleter response ", response);

            setIsDeleteReqLoading(false);
        
            if (response.error) {
                setDeleteReqError(response.error);
                return;
            }

        }catch(error){
            console.error("Falied to delete:", error);
            setDeleteReqError({message: "Falied to delete Request"});
            setIsDeleteReqLoading(false);
        }
}, []);

    return (<ReqContext.Provider value={{
        createReq,
        getUserReceiveReq,
        getUserSendReq,
        findingReq,
        
        isLoading,
        isError,
        isReqLoading,
        isReqError,

        reqInfo,
        updateReqInfo,
        updateAccept,
        deleteR,

        signingError,
        isSigningLoading,
        tenantSigned,
        landlordSigned,

    }}>
        {children}
    </ReqContext.Provider>
    );
}
