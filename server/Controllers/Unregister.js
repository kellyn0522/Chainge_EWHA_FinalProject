import { useContext } from "react";
import {setLoginContext, userContext, userDataContext, isLoginContext} from "../App"
import { useNavigate } from "react-router-dom";

const Unregister = () => { // 회원탈퇴
    const {setIsLogin, setIsLogOut} = useContext(setLoginContext); // 로그아웃 함수 받기
    const {onCreateUser, onUpdateUser, onDeleteUser} = useContext(userContext); // 사용자 삭제 함수 받기
    const isLogin = useContext(isLoginContext); // 로그인한 사용자 keyId 받기
    const data = useContext(userDataContext); // 사용자 데이터 받기
    const navigate = useNavigate(); // 페이지 이동

    const onClickUnregister = () => { // 탈퇴 버튼을 누르면 실행되는 함수
        onDeleteUser(isLogin[1]); // 로그인 된 사용자 keyId와 일치하는 사용자 데이터 삭제
        alert("회원탈퇴를 완료하였습니다.");
        setIsLogOut(); // 로그아웃
        console.log(data);
        navigate("/"); // 홈으로 이동
    }

    const onClickCancel = () => { // 취소 버튼을 누르면 실행되는 함수
        navigate("/mypage"); // 마이페이지로 이동
    }

    return (
        <div className="Unregister">
            <div className="ask">탈퇴하시겠습니까?</div>
            <div className="Button">
                <button className = "yes" onClick={onClickUnregister}>탈퇴</button>
                <button className = "no" onClick={onClickCancel}>취소</button>
            </div>
        </div>
    )
};

export default Unregister;