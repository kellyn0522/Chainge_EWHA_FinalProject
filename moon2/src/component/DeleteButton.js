import { useContext } from "react";
import {ownItemContext, contractContext} from "../App";

const DeleteButton = (type, itemID) => { // 매물 삭제 버튼
    const {ownItem, notOwnItem} = useContext(ownItemContext); // 매물 등록 취소 함수 받기
    const {CreateContract, terminateContract} = useContext(contractContext); // 거래 취소 함수 받기

    const onNotOwn = () => { // 버튼 클릭 시
        notOwnItem(itemID); // 매물 등록 취소 함수 호출
    }

    const onTerminate = () => { // 버튼 클릭 시
        terminateContract(itemID); // 거래 취소 함수 호출
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