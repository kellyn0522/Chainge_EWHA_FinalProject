import { useContext } from "react";
import {isLoginContext} from "../App"
import { useNavigate } from "react-router-dom";

const Unregister = () => {
    const {isLogin,setIsLogIn} = useContext(isLoginContext);
    const navigate = useNavigate();

    const onClickUnregister = () => {
        console.log(isLogin, " 탈퇴 완료");
        alert("회원탈퇴를 완료하였습니다.");
        setIsLogIn(1);
        navigate("/");
    }

    const onClickCancel = () => {
        navigate("/mypage");
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