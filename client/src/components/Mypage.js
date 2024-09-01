import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import {isLoginContext, userDataContext} from "../App";
import Logo from "../component/Logo";
import HouseItem from "../component/HouseItem";
import "./Mypage.css";

const Mypage = () => { // 마이페이지
    const navigate = useNavigate(); // 페이지 이동
    const isLogin = useContext(isLoginContext); // 로그인 상태 확인
    const userData = useContext(userDataContext); // User Data 확인
    const whoLogIn = userData.find((item) => String(item.keyId) === String(isLogin[1])); // 로그인한 사용자 데이터

    const onChangeData = () => { // 정보변경 버튼을 누른 경우 실행
        navigate("/changingUserData"); // 정보 변경 페이지로 이동
    }

    const onUnregister = () => { // 탈퇴 버튼을 누른 경우 실행
        navigate("/unregister"); // 탈퇴 페이지로 이동
    }

    const onClickChat = () => { // 채팅 버튼을 누른 경우 실행
        navigate("/chat"); // 채팅 페이지로 이동
    }

    const onContractList = () => { // 거래하기 버튼을 누른 경우 실행
        navigate("/contractList"); // 거래하기 페이지로 이동
    }

    const onCreateItem = () => { // 매물 등록 버튼을 누른 경우 실행
        navigate("/createItemPage"); // 매물 등록 페이지로 이동
    }

    const onDeleteItem = () => { // 매물 삭제 버튼을 누른 경우 실행
        alert("DELETE");
    }

    const ownItem = whoLogIn.ownItem; // 사용자의 매물 등록 기록
    const likedItem = whoLogIn.likedItemId; // 사용자의 매물 좋아요 기록
    const contracts = whoLogIn.contracts; // 사용자의 거래 기록

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