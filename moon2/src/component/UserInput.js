import {useContext} from "react";
import "./UserInput.css";
import {inputContext, inputRefContext} from "../pages/Login";

const UserInput = ({onClickButton}) => { // 사용자에게 아이디와 비밀번호 입력 받기
    const {inputID, inputPW, setID, setPW} = useContext(inputContext);
    const {inputIDRef, inputPWRef} = useContext(inputRefContext);

    const insertID = (e) =>{ // ID 입력 시
        setID(e.target.value); // 입력 받은 ID 저장
    };
    const insertPW = (e) =>{ // Password 입력 시
        setPW(e.target.value); // 입력 받은 Password 저장
    };

    const onKeyDown = (e) => { // enter키 입력 시
        if (e.keyCode === 13){
            console.log("enter");
            onClickButton();
        }
    }

    return (
        <div>
            <div className = "ID">
                <div className="text">ID</div>                    
                <input value={inputID} onChange={insertID} className="input" onKeyDown = {onKeyDown} ref={inputIDRef} />
            </div>
            <div className = "PW">
                <div className="text">PW</div>
                <input type = "password" value={inputPW} onChange={insertPW} className="input" onKeyDown = {onKeyDown} ref={inputPWRef} />
            </div>
        </div>        
    );
};
export default UserInput;