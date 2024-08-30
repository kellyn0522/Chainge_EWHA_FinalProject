//import "./Header.css";
import { useContext } from "react";
import {isLoginContext, setLoginContext} from "../App"
import { useNavigate } from "react-router-dom";


const Header = () => { // 헤더에 있는 버튼 제어
    const isLogin = useContext(isLoginContext); // 로그인 여부 확인
    const {setIsLogin, setIsLogOut} = useContext(setLoginContext); // 로그아웃 함수 받기
    const navigate = useNavigate();

    const onClickLogin = () => { // 로그인 버튼 클릭 시
        navigate("/login"); // 로그인 페이지로 이동
    }
    const onClickMypage = () => { // 마이페이지 버튼 클릭 시
        navigate("/mypage"); // 마이페이지로 이동
    }
    const onClickSignUp = () => { // 회원가입 버튼 클릭 시
        navigate("/Register"); // 회원가입 페이지로 이동
    }
    const onClickChat = () => { // 채팅 버튼 클릭 시
        navigate("/chat"); // 채팅 페이지로 이동
    }
    const onClickLogOut = () => { // 로그아웃 버튼 클릭시
        setIsLogOut(); // 로그아웃 함수 실행
        alert("로그아웃 되었습니다.");
    }

    if (String(isLogin[0]) === String(1)){ // 로그인 되어있는 경우 마이페이지 버튼, 로그아웃 버튼, 채팅 버튼 출력
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
    } else { // 로그인 되어있지 않은 경우 회원가입 버튼, 로그인 버튼 출력
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
