import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/services";

export const AuthItemContext = createContext();

export const AuthItemContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [createItemInfo, setCreateItemInfo] = useState({
        itemID: "",
        ownerName: "",
        zipCode: "",
        houseAddress: "",
        location: "",
        latitude: "",
        longitude: "",
        area: "",
        housePrice: "",
        memo: "",
        type: "",
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

        try {
            // 필수 필드 검증
            if (!createItemInfo.itemID || !createItemInfo.ownerName || !createItemInfo.location) {
                throw new Error("필수 입력값이 누락되었습니다.");
            }

            const formData = new FormData();
            Object.keys(createItemInfo).forEach((key) => {
                formData.append(key, createItemInfo[key]);
            });

            console.log("Sending Request Data:", Object.fromEntries(formData.entries()));

            const response = await axios.post(
                `${baseUrl}/items/createItem`,
                createItemInfo,
                {
                    headers: {
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
        }
    }, [createItemInfo]);

    useEffect(() => {
        console.log("Updated createItemInfo:", createItemInfo);
    }, [createItemInfo]);

    return (
        <AuthItemContext.Provider
            value={{
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
