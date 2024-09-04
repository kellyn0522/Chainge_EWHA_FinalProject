import { useContext } from "react";
import {isLoginContext, likeItemContext} from "../App";


const LikeButton = ({itemID}) => {
    const {likeItem, cancelLikeItem} = useContext(likeItemContext);
    const {isLogin} = useContext(isLoginContext); 
    const whoLogIn = { // 데이터 연결 필요
        name: "송태섭",
        id: "ijkl",
        passWord: "1234",
        keyId: 10000003,
        telNum:111,
        birth:111113,
        identityNum:3333333,
        zipCode: 33333, 
        email: undefined,
        ownItem: [1],
        likedItemId: [2,3],
        contracts: [2]
      };

    if(String(isLogin) === String(1)){
        const likedItem = whoLogIn.likedItemId;
        let isLike = likedItem.includes(itemID);
        let color;

        const likeButton = () => {
            if (!isLike) {
                likeItem(likedItem, itemID, isLogin[1]);
                color = "blue";
            }
            else {
                cancelLikeItem(likedItem, itemID, isLogin[1]);
                console.log("not like");
                color = "gray";
            }
        }

        return (
            <div className="LikeButton">
                <button className = {color} onClick = {likeButton}>좋아요</button>
            </div>
        )
    }
};
export default LikeButton;