import {useNavigate} from "react-router-dom";
import Logo from "../component/Logo";
import HouseItem from "../component/HouseItem";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthItemContext } from "../context/AuthItemContext";
import { Card, Button } from "react-bootstrap";
import Unregister from "./Unregister";

const Mypage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { item } = useContext(AuthItemContext);
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const onChangeData = () => {
        navigate("/changingUserData");
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

    //const ownItem = registerInfo;
    //const likedItem = registerInfo;
    //const contracts = registerInfo;
    /*
    const ownItem = [1];
    const likedItem = [2,3];
    const contracts = [2];
    
    {ownItem.map((it) => <HouseItem key = {it} itemId = {it} type = {"OWN"} />)} 
    {likedItem.map((it) => <HouseItem key = {it} itemId = {it} />)}
    {contracts.map((it) => <HouseItem key = {it} itemId = {it} type = {"CONTRACT"} />)}
    */
    return (
        <div>
            <div className = "logo" ><Logo /></div>
            <div className="gugi-regular" >MY page</div>
            <Card>
                <Card.Body className="noto-sans-kr">
                    <Card.Text>이름: {user.name}</Card.Text>
                    <Card.Text>닉네임: {user.nickName}</Card.Text>
                    <Card.Text>전화번호: {user.phoneNumber}</Card.Text>
                    <Card.Text>Email: {user.email}</Card.Text>
                </Card.Body>
            </Card>
            <div className = "select">
                <div className = "title">내 매물</div>                   
                <button className = "create" onClick = {onCreateItem}>+</button>
            </div>
            <div className = "select">
                <div className = "title">찜한 매물</div>
            </div>
            <div className = "select">
                <div className = "title">거래 내역</div>
                <button className = "create" onClick = {onContractList}>+</button>
            </div>
            <div className = "buttonWrapper">
                <Button style = {{backgroundColor: '#00462a', color: 'white', border: 'none', margin: '10px'}} onClick = {onClickChat}>채팅</Button>
                <Button style = {{backgroundColor: '#00462a', color: 'white', border: 'none', margin: '10px'}} onClick = {onChangeData}>정보 변경</Button>
                <Button style = {{backgroundColor: '#00462a', color: 'white', border: 'none', margin: '10px'}} onClick = {handleShow} >회원 탈퇴</Button>
                <Unregister show={showModal} handleClose={handleClose} />
            </div>
    </div>);
};
export default Mypage;
