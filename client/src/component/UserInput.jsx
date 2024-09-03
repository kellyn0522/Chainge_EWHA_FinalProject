import {useContext} from "react";
import {inputContext, inputRefContext} from "../pages/Login";

const UserInput = ({onClickButton}) => {
    const {inputID, inputPW, setID, setPW} = useContext(inputContext);
    const {inputIDRef, inputPWRef} = useContext(inputRefContext);

    const insertID = (e) =>{
        setID(e.target.value);
    };
    const insertPW = (e) =>{
        setPW(e.target.value);
    };

    const onKeyDown = (e) => {
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