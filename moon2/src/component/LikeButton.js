import { useContext } from "react";
import {isLoginContext, likeItemContext, userDataContext} from "../App";
import "./LikeButton.css";

const LikeButton = ({itemID}) => { // 좋아요 버튼
    const {likeItem, cancelLikeItem} = useContext(likeItemContext); // 좋아요 함수, 좋아요 취소 함수 받기
    const isLogin = useContext(isLoginContext); // 로그인 여부와 로그인된 사용자의 keyId 확인
    const userData = useContext(userDataContext); // 사용자 정보
    const whoLogIn = userData.find((item) => String(item.keyId) === String(isLogin[1])); // 로그인된 사용자 정보

    if(String(isLogin[0]) === String(1)){ // 로그인이 되어있는 경우
        const likedItem = whoLogIn.likedItemId;
        let isLike = likedItem.includes(itemID);
        let color;

        const likeButton = () => { // 좋아요 버튼 클릭 시
            if (!isLike) { // '좋아요' 상태가 아닌 경우
                likeItem(likedItem, itemID, isLogin[1]); // 좋아요 함수 실행
                color = "blue";
            }
            else { // '좋아요' 상태인 경우
                cancelLikeItem(likedItem, itemID, isLogin[1]); // 좋아요 취소 함수 실행
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