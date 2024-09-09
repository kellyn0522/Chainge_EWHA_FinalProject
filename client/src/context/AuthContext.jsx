import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
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
    });
// 임의로 추가
    const [updateError, setUpdateError] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);

    const [updaterInfo, setUpdaterInfo] = useState({
        nickName: "", 
        phoneNumber: "", 
        password: "", 
        birth: "",
        identityNum: "", 
        zipCode: "", 
        houseAddres: "",
    });

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
        navigate("/");
    }, [updaterInfo]);
//여기까지
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
        }}
    >
        {children}
    </AuthContext.Provider>
    );
};