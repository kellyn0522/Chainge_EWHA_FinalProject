import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {isLoginContext} from "../App";

const ContractANDChat = () => { // 채팅버튼 + 거래하기 버튼
    const isLogin = useContext(isLoginContext); // 로그인 여부 확인
    const navigate = useNavigate();

    const onClickChat = () => { // 채팅버튼 클릭 시
        navigate("/chat"); // 채팅 목록 페이지로 이동
    }
    const onMakeContract = () => { // 거래하기 버튼 클릭 시
        navigate("/makeContract"); // 거래하기 페이지로 이동
    }
    if(String(isLogin[0]) === String(1)){ // 로그인 되어있는 경우에만
        return (
            <div className="ContractANDChat">
                    <button className = "button" onClick = {onClickChat}>채팅</button>
                    <button className = "button" onClick = {onMakeContract}>거래하기</button>
            </div>
        )
    }
};
export default ContractANDChat;