import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest, deleteRequest } from "../utils/services";
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
        buildingName: '',
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
        deposit: ''
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
        formData.append("hasAgent", createItemInfo.hasAgent);
        formData.append("buildingName", createItemInfo.buildingName);
        formData.append("floor", createItemInfo.floor);
        formData.append("duplexAvailability", createItemInfo.duplexAvailability);
        formData.append("exclusiveArea", createItemInfo.exclusiveArea);
        formData.append("contractArea", createItemInfo.contractArea);
        formData.append("room", createItemInfo.room);
        formData.append("bathroom", createItemInfo.bathroom);
        formData.append("facing", createItemInfo.facing);
        formData.append("elevator", createItemInfo.elevator);
        formData.append("total_number_of_units", createItemInfo.total_number_of_units);
        formData.append("parkingSpace", createItemInfo.parkingSpace);
        formData.append("availableMoveInDate", createItemInfo.availableMoveInDate);
        formData.append("petFriendly", createItemInfo.petFriendly);
        formData.append("number_of_units_in_the_given_area", createItemInfo.number_of_units_in_the_given_area);
        formData.append("deposit", createItemInfo.deposit);

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

    const [updateItemError, setUpdateItemError] = useState(null);
    const [isUpdateItemLoading, setIsUpdateItemLoading] = useState(false);

    const [updaterItemInfo, setUpdaterItemInfo] = useState({
        itemID: '', 
        ownerName: '', 
        ownerId: '', 
        housePrice: '', 
        memo: '', 
        type: '',
        bedSize: '', 
        hasItems: '',
        hasAgent: false,
        buildingName: '',
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

            navigate("/");
            setIsDeleteItemLoading(false);
        
            if (response.error) {
                return setDeleteItemError(response);
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


