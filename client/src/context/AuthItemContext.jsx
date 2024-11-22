import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl, postRequest, getRequest, deleteRequest } from "../utils/services";

export const AuthItemContext = createContext();

export const AuthItemContextProvider = ({ children }) => {
    const navigate = useNavigate();
    //const [item, setItem] = useState(null);
    const [getItemError, setGetItemError] = useState(null);
    const [findItemError, setFindItemError] = useState(null);
    const [isFindItemLoading, setIsFindItemLoading] = useState(false);

    const [createItemInfo, setCreateItemInfo] = useState({
        itemID: '',
        zipCode: '',
        houseAddress: '',
        location: '',
        latitude: '', // 위도
        longitude: '', // 경도
        area: '',
        ownerId: '',
        housePrice: '',
        deposit: '',
        memo: '',
        type: '',
        isContract: false,
        bedSize: '',
        hasItems: '',
        hasAgent: false,
        floor: '',
        duplexAvailability: '',
        exclusiveArea: '',
        contractArea: '',
        room: '',
        bathroom: '',
        facing: '',
        elevator: '',
        petFriendly: '',
        number_of_units_in_the_given_area: '',
        total_number_of_units: '',
        parkingSpace: '',
        availableMoveInDate: '',
    });

    const [createItemError, setCreateItemError] = useState(null);
    const [isCreateItemLoading, setIsCreateItemLoading] = useState(false);

    const updateCreateItemInfo = useCallback((info) => {
        setCreateItemInfo((prevInfo) => ({ ...prevInfo, ...info }));
    }, []);

    const createItem = useCallback(async (e) => {
        e.preventDefault();
        setIsCreateItemLoading(true);
        setCreateItemError(null);
        console.log('!!!!!!!!!');

        try {
            // 필수 필드 검증
            if (!createItemInfo.itemID || !createItemInfo.ownerId || !createItemInfo.location) {
                throw new Error("필수 입력값이 누락되었습니다.");
            }

            const formData = new FormData();
            Object.keys(createItemInfo).forEach((key) => {
                formData.append(key, createItemInfo[key]);
            });

            console.log("Sending Request Data:", Object.fromEntries(formData.entries()));


            const response = await postRequest(
                `${baseUrl}/items/createItem`,
                createItemInfo,
                {
                    headers: {
                        // "Content-Type": "multipart/form-data",
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Create Item Response:", response.data);
            navigate("/");
        } catch (error) {
            console.error("Error creating item:", error);
            setCreateItemError(error.response?.data?.message || "매물 등록에 실패했습니다.");
        } finally {
            setIsCreateItemLoading(false);
            navigate("/");
        }
    }, [createItemInfo]);

    useEffect(() => {
        console.log("Updated createItemInfo:", createItemInfo);
    }, [createItemInfo]);

    
    const [updateItemError, setUpdateItemError] = useState(null);
    const [isUpdateItemLoading, setIsUpdateItemLoading] = useState(false);

    const [updaterItemInfo, setUpdaterItemInfo] = useState({
        itemID: '', 
        housePrice: '', 
        memo: '', 
        bedSize: '', 
        hasItems: {
            hasWasher : false,
            hasDryer : false, 
            hasTV : false, 
            hasAirConditioner : false, 
            hasHeater : false, 
            hasBlinds : false,
            hasDresser: false,
            hasMicrowave: false,
            hasFridge: false,
            hasSofa: false,
            hasChair: false,
        },
        hasAgent: false,
        buildingName: '',
        duplexAvailability: '',
        exclusiveArea: '',
        contractArea: '',
        room: '',
        bathroom: '',
        facing: '',
        elevator: '',
        petFriendly: '',
        number_of_units_in_the_given_area: '',
        total_number_of_units: '',
        parkingSpace: '',
        availableMoveInDate: '',
        deposit: ''
    });

    const updateItemUpdaterInfo = useCallback((info) => {
        setUpdaterItemInfo((prevInfo) => ({ ...prevInfo, ...info }));
    }, []);

    const updaterItem = useCallback(async(e, itemID) => { 
        e.preventDefault()
        console.log("Update called");
        setIsUpdateItemLoading(true);
        setUpdateItemError(null);
        
        try{
            if(!itemID){
                setUpdateItemError("Invalid item ID");
                setIsUpdateItemLoading(false);
                throw new Error("Invalid item ID");
            }

            const response = await postRequest(
                `${baseUrl}/items/updateItem/${itemID}`,
                JSON.stringify(updaterItemInfo));

            console.log("updater response ", response);
            setIsUpdateItemLoading(false);
        
            if (response.error) {
                console.log("error in updateItem");
                return setUpdateItemError(response);
            }
            console.log(response);
            navigate("/");

        } catch (error){
            setUpdateItemError(error.message)
            console.log(error.message)
        } finally{
            setIsUpdateItemLoading(false);
        }
    }, [updaterItemInfo, navigate]);

    const [deleteItemError, setDeleteItemError] = useState(null);
    const [isDeleteItemLoading, setIsDeleteItemLoading] = useState(false);

    const deleteItem = useCallback(async(e, itemID) => { 
        console.log("delete called");
        e.preventDefault()
        setIsDeleteItemLoading(true);
        setDeleteItemError(null);
        try{
            if(!itemID){
                setDeleteItemError("Invalid item ID");
                setIsDeleteItemLoading(false);
                throw new Error("Invalid item ID");
            }
            
            const response = await deleteRequest(
                `${baseUrl}/items/deleteItem/${itemID}`
            );

            console.log("deleter response ", response);

            console.log("Create Item Response:", response.data);
            navigate("/");
            setIsDeleteItemLoading(false);
        
            if (response.error) {
                setDeleteItemError(response.error);
                return;
            }

        }catch(error){
            console.error("Falied to delete:", error);
            setDeleteItemError({message: "Falied to delete item"});
            setIsDeleteItemLoading(false);
        }
    }, []);


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
            console.log(error.message)
        } finally{
        setIsFindItemLoading(false);
    }
    }, []);

    return (
        <AuthItemContext.Provider
            value={{
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
                updaterItem,
                updaterItemInfo,
                updateItemUpdaterInfo,
                isUpdateItemLoading,
                updateItemError,
                deleteItem,
                deleteItemError,
                isDeleteItemLoading
            }}
        >
            {children}
        </AuthItemContext.Provider>
    );
};
