import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, deleteRequest } from "../utils/services";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        nickName:"",
        phoneNumber:"",
        password: "",
        realEstateAgent: false
    });
// 임의로 추가
    const [updateError, setUpdateError] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);

    const [updaterInfo, setUpdaterInfo] = useState({
        id: "",
        nickName: "", 
        phoneNumber: "", 
        password: "", 
        birth: "",
        identityNum: "", 
        zipCode: "", 
        houseAddres: "",
    });
    useEffect(()=>{
        if (user){
            setUpdaterInfo((prevInfo) => ({ ...prevInfo, id : user._id }));
        }
    }, [user]);

    const updateUpdaterInfo = useCallback((info) => {
        setUpdaterInfo((prevInfo) => ({ ...prevInfo, ...info }));
    }, []);

    const updaterUser = useCallback(async(e) => {
        e.preventDefault();
        setIsUpdateLoading(true);
        setUpdateError(null);

        const response = await postRequest(
            `${baseUrl}/users/update`,
            JSON.stringify(updaterInfo));

        setIsUpdateLoading(false);

        console.log("updater response ", response);
        

        if (response.error) {
            return setUpdateError(response);
        }

        localStorage.setItem("user", JSON.stringify(response));

        setUser(response);
        navigate("/mypage");
    }, [updaterInfo]);

    const updaterLike = useCallback(async(itemID, newLikedState) => {
        setIsUpdateLoading(true);
        setUpdateError(null);

        try{
        const response = await postRequest(
            `${baseUrl}/users/updateLike`,
            JSON.stringify({userId: user._id, itemId: itemID, liked: newLikedState,}));

        setIsUpdateLoading(false);

        console.log("updater response ", response);
        

        if (response.error) {
            return setUpdateError(response);
        }

        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
        }catch(error){
            setIsUpdateLoading(false);
            setUpdateError(error);
            console.log('Error updating like: ', error);
        }
    }, [user]);

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    console.log("registerInfo", registerInfo);
    console.log("Userr", user);
    console.log("loginInfo", loginInfo);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setUser(JSON.parse(storedUser));
    }, []);

    /*useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem("user"); // 손상된 데이터를 제거합니다.
            }
        }
    }, []);*/
    

    const updateRegisterInfo = useCallback((info) => {
        //setRegisterInfo(info);
        setRegisterInfo((prevInfo) => ({ ...prevInfo, ...info }));
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);


    const registerUser = useCallback(async(e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(
            `${baseUrl}/users/register`,
            JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        console.log("Register response ", response);
        

        if (response.error) {
            return setRegisterError(response);
        }

        localStorage.setItem("user", JSON.stringify(response));

        setUser(response);
        navigate("/");
    }, [registerInfo]);

    const loginUser = useCallback(async (e) => {
        e.preventDefault();

        setIsLoginLoading(true);
        setLoginError(null);
        

        const response = await postRequest(
            `${baseUrl}/users/login`,
            JSON.stringify(loginInfo));

        setIsLoginLoading(false);

        if (response.error) {
            return setLoginError(response);
        }
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
        navigate("/");

    }, [loginInfo]);

    const logoutUser = useCallback(() => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    }, []);

    const [deleteError, setDeleteError] = useState(null);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const unregisterUser = useCallback(async(e) => {
        console.log("delete called");
        e.preventDefault();
        setIsDeleteLoading(true);
        setDeleteError(null);

        if (!user){
            setDeleteError({message: "User is not logged in."});
            setIsDeleteLoading(false);
            return;
        }
        
        try{
            const response = await deleteRequest(
                `${baseUrl}/users/unregister`,
                {
                    id: user._id
                }
            );

            console.log("deleter response ", response);
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");
            setIsDeleteLoading(false);
        
            if (response.error) {
                return setDeleteError(response);
            }

        }catch(error){
            console.error("Falied to unregister:", error);
            setDeleteError({message: "Falied to unregister user"});
            setIsDeleteLoading(false);
        }
    }, [user, navigate, setUser, setDeleteError, setIsDeleteLoading]);


    return (<AuthContext.Provider
        value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,

            updaterInfo,
            updateUpdaterInfo,
            updaterUser,
            updateError,
            isUpdateLoading,
            
            logoutUser,
            loginUser,
            loginError,
            loginInfo,
            updateLoginInfo,
            isLoginLoading,

            unregisterUser,
            deleteError,
            isDeleteLoading,

            updaterLike,
        }}
    >
        {children}
    </AuthContext.Provider>
    );
};