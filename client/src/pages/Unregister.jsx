import { useContext } from "react";
import {setLoginContext, userContext, userDataContext, isLoginContext} from "../App"
import { useNavigate } from "react-router-dom";

const Unregister = () => {
    const {setIsLogin, setIsLogOut} = useContext(setLoginContext);
    const {onCreateUser, onUpdateUser, onDeleteUser} = useContext(userContext);
    const isLogin = useContext(isLoginContext);
    const data = useContext(userDataContext);
    const navigate = useNavigate();

    const onClickUnregister = () => {
        onDeleteUser(isLogin[1]);
        alert("회원탈퇴를 완료하였습니다.");
        setIsLogOut();
        console.log(data);
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