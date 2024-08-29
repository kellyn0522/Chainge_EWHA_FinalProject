import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {itemDataContext} from "../App";

const useHouse = (id) => { // 매물 페이지가 존재하는 경우 이동, 존재하지 않는 경우 알림 출력
    const itemData = useContext(itemDataContext);
    const matchItem = itemData.find((it) => String(it.itemId) === String(id));
    const [item, setItem] = useState(matchItem);
    const navigate = useNavigate();

    useEffect(() => {
        //const matchItem = itemData.find((it) => String(it.itemId) === String(id));
        if(matchItem){
            setItem(matchItem);
        } else {
            console.log(2, matchItem);
            alert("페이지가 존재하지 않습니다");
            navigate("/", {replace: true});
        }
    }, [id, itemData])

    return item;
}
export default useHouse;