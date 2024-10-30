import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthItemContext = createContext();
export const AuthItemContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [createItemError, setCreateItemError] = useState(null);
    const [getItemError, setGetItemError] = useState(null);
    const [isCreateItemLoading, setIsCreateItemLoading] = useState(false);
    const [findItemError, setFindItemError] = useState(null);
    const [isFindItemLoading, setIsFindItemLoading] = useState(false);

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

        // FormData 생성
        const formData = new FormData();
        formData.append("itemID", createItemInfo.itemID);
        formData.append("ownerId", createItemInfo.ownerId);
        formData.append("ownerName", createItemInfo.ownerName);
        formData.append("zipCode", createItemInfo.zipCode);
        formData.append("houseAddress", createItemInfo.houseAddress);
        formData.append("location", createItemInfo.location);
        formData.append("area", createItemInfo.area);
        formData.append("housePrice", createItemInfo.housePrice);
        formData.append("memo", createItemInfo.memo);
        formData.append("type", createItemInfo.type);
        formData.append("bedSize", createItemInfo.bedSize);
        formData.append("hasItems", JSON.stringify(createItemInfo.hasItems));
        formData.append("isContract", createItemInfo.isContract);
        formData.append("imageFile", createItemInfo.imageFile); // 이미지 파일

        try{
            const response = await axios.post("http://localhost:5000/api/items/createItem", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setIsCreateItemLoading(false);

            console.log("Create Item response ", response);
        

            if (response.error) {
                return setCreateItemError(response);
            }

            localStorage.setItem("item", JSON.stringify(response));
            setItem(response);
            navigate("/");
        }catch(err){
            console.error("Error creatind item:", err);
            setCreateItemError("매물 등록에 실패했습니다. 다시 시도해주세요.");
            setIsCreateItemLoading(false)
        }
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

    const findItem = useCallback(async(itemID) => { 
        setFindItemError(null);
        setIsFindItemLoading(true)
        
        try{
            if(!itemID){
                setFindItemError("Invalid item ID");
                setIsFindItemLoading(false);
                throw new Error("Invalid item ID");
            }

            const response = await getRequest(
                `${baseUrl}/items/find/${itemID}`);

            console.log("Find Item response ", response);
        
            if (response.error) {
                return setFindItemError(response.error);
            }
            setIsFindItemLoading(false);
            return response;
        } catch (error){
            setFindItemError(error.message)
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
            findItem,
            findItemError,
            isFindItemLoading,
        }}
        >
            {children}
        </AuthItemContext.Provider>
    );
};


