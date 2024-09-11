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

    /*
    const updateUser = async (req, res) => {

    try {
        const { name, nickName, email, phoneNumber, password, birth, identityNum, zipCode, houseAddress } = req.body;
        let user = await userModel.findOne({ email });

        console.log("Received data:", { nickName, phoneNumber, password, birth, identityNum, zipCode, houseAddress });

        let nickNameExists = await userModel.findOne({ nickName });
        let phoneNumberExists = await userModel.findOne({ phoneNumber });
        let identityNumExists = await userModel.findOne({ identityNum });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 사용자 정보를 업데이트

        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.password = password ? await bcrypt.hash(user.password, salt) : user.password; // 비밀번호 암호화 필요
        user.birth = birth || user.birth;
        user.identityNum = identityNum || user.identityNum;
        user.zipCode = zipCode || user.zipCode;
        user.houseAddress = houseAddress || user.houseAddress;

        // 업데이트된 정보 저장
        await user.save();

        if (nickNameExists) return res.status(400).json("User with the given nickName already exists... ");
        if (phoneNumberExists ) return res.status(400).json("User with the given phoneNumber already exists... ");
        if (identityNumExists ) return res.status(400).json("User with the given identity number already exists... ");


        //if (!nickName || !phoneNumber || !password || !birth || !identityNum || !zipCode || !houseAddress ) return res.status(400).json("All fields are required");

        if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password");

        res.status(200).json({ 
            _id: user._id, 
            name : user.name, 
            email : user.email,
            nickName : user.nickName , 
            phoneNumber : user.phoneNumber, 
            password : user.password, 
            birth : user.birth, 
            identityNum : user.identityNum, 
            zipCode : user.zipCode, 
            houseAddress : user.houseAddress
        });

    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};
*/
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
        const storedItem = localStorage.getItem("Item");
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
            `${baseUrl}/items/createItem`, ///////
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

            item,
            createItemInfo,
            updateCreateItemInfo,
            createItem,
            createItemError,
            isCreateItemLoading,
        }}
    >
        {children}
    </AuthContext.Provider>
    );
};