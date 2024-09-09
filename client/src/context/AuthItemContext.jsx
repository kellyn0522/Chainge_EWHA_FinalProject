import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import {useNavigate} from "react-router-dom";

export const AuthItemContext = createContext();
export const AuthItemContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [createItemError, setCreateItemError] = useState(null);
    const [isCreateItemLoading, setIsCreateItemLoading] = useState(false);

    const [createItemInfo, setCreateItemInfo] = useState({
        ownerName:"", 
        zipCode:"", 
        houseAddress:"", 
        location:"", 
        area:"", 
        ownerId:"", 
        housePrice:"", 
        memo:"", 
        type:"", 
        isContract:"", 
        bedSize:"", 
        hasItems:"",
    });

    console.log("createItemInfo", createItemInfo);

    useEffect(() => {
        const storedItem = localStorage.getItem("item");
        setItem(JSON.parse(storedItem));
    }, []);

    const updateCreateItemInfo = useCallback((info) => {
        setCreateItemInfo((prevInfo) => ({ ...prevInfo, ...info }));
    }, []);

    const createItem = useCallback(async(e) => {
        e.preventDefault();
        setIsCreateItemLoading(true);
        setCreateItemError(null);

        const response = await postRequest(
            `${baseUrl}/users/createItem`, ///////
            JSON.stringify(createItemInfo));

            setIsCreateItemLoading(false);

        console.log("Create Item response ", response);
        

        if (response.error) {
            return setCreateItemError(response);
        }

        localStorage.setItem("Item", JSON.stringify(response));

        setItem(response);
        navigate("/");
    }, [createItemInfo]);

    return (<AuthItemContext.Provider
        value={{
            item,
            createItemInfo,
            updateCreateItemInfo,
            createItem,
            createItemError,
            isCreateItemLoading,
        }}
        >
            {children}
        </AuthItemContext.Provider>
    );
};


