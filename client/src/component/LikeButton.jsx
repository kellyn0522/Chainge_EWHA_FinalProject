import { useContext } from "react";
import {isLoginContext, likeItemContext, userDataContext} from "../App";


const LikeButton = ({itemID}) => {
    const {likeItem, cancelLikeItem} = useContext(likeItemContext);
    const isLogin = useContext(isLoginContext);
    const userData = useContext(userDataContext);    
    const whoLogIn = userData.find((item) => String(item.keyId) === String(isLogin[1]));

    if(String(isLogin[0]) === String(1)){
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