import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {isLoginContext} from "../App";

const ContractANDChat = () => {
    const isLogin = useContext(isLoginContext);
    const navigate = useNavigate();

    const onClickChat = () => {
        navigate("/chat");
    }
    const onMakeContract = () => {
        navigate("/makeContract");
    }
    if(String(isLogin[0]) === String(1)){
        return (
            <div className="ContractANDChat">
                    <button className = "button" onClick = {onClickChat}>채팅</button>
                    <button className = "button" onClick = {onMakeContract}>거래하기</button>
            </div>
        )
    }
};
export default ContractANDChat;