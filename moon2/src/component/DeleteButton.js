import { useContext } from "react";
import {ownItemContext, contractContext} from "../App";

const DeleteButton = (type, itemID) => {
    const {ownItem, notOwnItem} = useContext(ownItemContext);
    const {CreateContract, terminateContract} = useContext(contractContext);

    const onNotOwn = () => {
        notOwnItem(itemID);
    }

    const onTerminate = () => {
        terminateContract(itemID);
    }

    switch(type){
        case "OWN":{
            return <button className="onNotOwn" onClick = {onNotOwn}>-</button>;
            
        }
        case "CONTRACT":{
            return <button className="onTerminate" onClick = {onTerminate}>-</button>;
        }
        default : return;
    }
};
export default DeleteButton;