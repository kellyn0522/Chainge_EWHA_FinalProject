//import "./Header.css";
import { useContext } from "react";
import {isLoginContext} from "../App"
import { useNavigate } from "react-router-dom";


const Header = () => {
    const {isLogin} = useContext(isLoginContext);
    const navigate = useNavigate();

    const onClickLogin = () => {
        navigate("/login");
    }
    const onClickMypage = () => {
        navigate("/mypage");
    }
    const onClickSignUp = () => {
        navigate("/Register");
    }
    const onClickChat = () => {
        navigate("/chat");
    }
    const onClickLogOut = () => {
        setIsLogOut();
        alert("로그아웃 되었습니다.");
    }

    if (String(isLogin) === String(1)){
        return (
            <div className="Header">
                <h1>문방구</h1>
                <div className = "userData"> 
                    <button onClick={onClickMypage}>마이페이지</button>
                    <button onClick={onClickLogOut}>로그아웃</button>
                </div>
                <button onClick={onClickChat}>채팅</button>
            </div>
        );
    } else {
        return (
            <div className="Header">
                <h1>문방구</h1>
                <div className = "togoLogin">
                    <button onClick={onClickSignUp}>회원가입</button>
                    <button onClick={onClickLogin}>로그인</button>
                </div>
            </div>
        );
    }
};

export default Header;
