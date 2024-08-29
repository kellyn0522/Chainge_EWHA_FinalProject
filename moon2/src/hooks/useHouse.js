import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {itemDataContext} from "../App";

const useHouse = (id) => {
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