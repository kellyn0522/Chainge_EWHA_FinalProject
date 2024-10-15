import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";
import {useNavigate} from "react-router-dom";

export const AuthItemContext = createContext();
export const AuthItemContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [createItemError, setCreateItemError] = useState(null);
    const [getItemError, setGetItemError] = useState(null);
    const [isCreateItemLoading, setIsCreateItemLoading] = useState(false);

    const [createItemInfo, setCreateItemInfo] = useState({
        itemID:"",
        ownerName:"", 
        zipCode:"", 
        houseAddress:"", 
        location:"", 
        area:"", 
        ownerId:"", 
        housePrice:"", 
        memo:"", 
        type:"", 
        isContract: false, 
        bedSize:"", 
        hasItems:{
            hasWasher : false,
            hasDryer : false, 
            hasTV : false, 
            hasAirConditioner : false, 
            hasHeater : false, 
            hasBlinds : false
        },
        hasAgent:false,
    });

    console.log("createItemInfo", createItemInfo);

    useEffect(() => {
        const storedItem = localStorage.getItem("item");
        if (storedItem) {
            setItem(JSON.parse(storedItem));
        }
    }, []);

    const updateCreateItemInfo = useCallback((info) => {
        setCreateItemInfo((prevInfo) => ({ ...prevInfo, ...info }));
    }, []);

    const createItem = useCallback(async(e) => {
        e.preventDefault();
        setIsCreateItemLoading(true);
        setCreateItemError(null);

        const response = await postRequest(
            `${baseUrl}/items/createItem`,
            JSON.stringify(createItemInfo));

            setIsCreateItemLoading(false);

        console.log("Create Item response ", response);
        

        if (response.error) {
            return setCreateItemError(response);
        }

        localStorage.setItem("item", JSON.stringify(response));

        setItem(response);
        navigate("/");
    }, [createItemInfo]);

    const getItem = useCallback(async(e) => {
        if(e) e.preventDefault();
        setGetItemError(null);
        try{
            const response = await getRequest(
                `${baseUrl}/items/`);

            console.log("Get Item response ", response);
        
            if (response.error) {
                return setGetItemError(response.error);
            }
            return response;
        } catch (error){
            setGetItemError(error.message)
        }
    }, []);

    return (<AuthItemContext.Provider
        value={{
            item,
            createItemInfo,
            updateCreateItemInfo,
            createItem,
            createItemError,
            isCreateItemLoading,
            getItem,
            getItemError,
        }}
        >
            {children}
        </AuthItemContext.Provider>
    );
};


