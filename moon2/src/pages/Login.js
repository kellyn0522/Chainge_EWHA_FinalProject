import UserInput from "../component/UserInput";
import {useNavigate} from "react-router-dom";
import React, {useRef, useState, useContext} from "react";
import "./Login.css";
import {isLoginContext, userDataContext, setLoginContext} from "../App";
import Logo from "../component/Logo";

export const inputContext = React.createContext();
export const inputRefContext = React.createContext();

const Login = () => {
    const [inputID, setID] = useState("");
    const [inputPW, setPW] = useState("");
    const navigate = useNavigate();
    const userData = useContext(userDataContext);
    const isLogin = useContext(isLoginContext);
    const {setIsLogin} = useContext(setLoginContext);
    const inputIDRef = useRef();
    const inputPWRef = useRef();
    let pw = null;

    const onClickFindID = () => {
        navigate("/findId");
    }

    const onClickFindPW = () => {
        navigate("/findPW");
    }

    function onClickButton() {
        if (!inputID) { inputIDRef.current.focus(); return;
        } else if (!inputPW) {inputPWRef.current.focus(); return;
        } else{
        pw = userData.find((item) => String(item.id) === String(inputID));
        if(String(inputPW) === String(pw.passWord)){
            alert("로그인 되었습니다.");
            setIsLogin(pw.keyId);
            navigate("/");
            } else{
            alert("아이디/비밀번호가 일치하지 않습니다.");
            return;
            }
        }   
    }

    return (
        <inputContext.Provider value={{inputID, inputPW, setID, setPW}}>
            <inputRefContext.Provider value={{inputIDRef, inputPWRef}}>
                <div className = "Login">
                    <div className = "logo"><Logo /></div>
                    <div className = "Title">로그인</div>
                    <div className = "LoginWrapper">
                        <UserInput onClickButton = {onClickButton} />
                        <button className = "button" onClick = {onClickButton}>Log In</button>
                    </div>
                    <div className = "Find">
                        <button className = "FindID" onClick = {onClickFindID}>Find ID</button>
                        <button className = "FindPW" onClick = {onClickFindPW}>Find PassWord</button>
                    </div>
                </div>
            </inputRefContext.Provider>
        </inputContext.Provider>
    );
};
export default Login;