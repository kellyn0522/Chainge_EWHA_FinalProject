import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import {isLoginContext, userDataContext} from "../App";
import Logo from "../component/Logo";
import HouseItem from "../component/HouseItem";

const Mypage = () => {
    const navigate = useNavigate();
    const isLogin = useContext(isLoginContext);
    const userData = useContext(userDataContext);    
    const whoLogIn = userData.find((item) => String(item.keyId) === String(isLogin[1]));

    const onChangeData = () => {
        navigate("/changingUserData");
    }

    const onUnregister = () => {
        navigate("/unregister");
    }

    const onClickChat = () => {
        navigate("/chat");
    }

    const onContractList = () => {
        navigate("/contractList");
    }

    const onCreateItem = () => {
        navigate("/createItemPage");
    }

    const onDeleteItem = () => {
        alert("DELETE");
    }

    const ownItem = whoLogIn.ownItem;
    const likedItem = whoLogIn.likedItemId;
    const contracts = whoLogIn.contracts;

    return (
        <div className="Mypage">
            <div className = "titleSet">
                <div className = "logo"><Logo /></div>
                <div className = "title">MY page</div>
            </div>
            <div className = "UserData">
                <div>이름: {whoLogIn.name}</div>
                <div>전화번호: {whoLogIn.telNum}</div>
                <div>생년월일: {whoLogIn.birth}</div>
                <div>우편번호: {whoLogIn.zipCode}</div>
                <div>Email: {whoLogIn.email}</div>
            </div>
            <div className = "select">
                <div className = "title">내 매물</div>
                {ownItem.map((it) => <HouseItem key = {it} itemId = {it} type = {"OWN"} />)}
                <button className = "create" onClick = {onCreateItem}>+</button>
            </div>
            <div className = "select">
                <div className = "title">찜한 매물</div>
                {likedItem.map((it) => <HouseItem key = {it} itemId = {it} />)}
            </div>
            <div className = "select">
                <div className = "title">거래 내역</div>
                {contracts.map((it) => <HouseItem key = {it} itemId = {it} type = {"CONTRACT"} />)}
                <button className = "create" onClick = {onContractList}>+</button>
            </div>
            <div className = "buttonWrapper">
                <button className = "button" onClick = {onClickChat}>채팅</button>
                <button className = "button" onClick = {onChangeData}>정보 변경</button>
                <button className = "button" onClick = {onUnregister}>회원 탈퇴</button>
            </div>
        </div>
    )
};
export default Mypage;