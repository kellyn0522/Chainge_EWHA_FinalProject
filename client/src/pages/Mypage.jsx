import {useNavigate} from "react-router-dom";
import Logo from "../component/Logo";
import HouseItem from "../component/HouseItem";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthItemContext } from "../context/AuthItemContext";
import { Card, Button,Badge } from "react-bootstrap";
import Unregister from "./Unregister";
import chat from '../icons/chat.svg';
import account from '../icons/account.svg';
import house from '../icons/house.svg';

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
    <div className = "intro" style = {{justifyContent: 'space-between'}}>
    */
    return (
        <div>
            <div className = "logo" ><Logo /></div>
            <div className = 'intro' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                <h4 className="gugi-regular" style={{marginBottom: '40px'}}>MY page</h4>
                <div className = "noto-sans-kr">
                <div className = "intro" style = {{justifyContent: 'space-between'}}> 
                    <Card style = {{width: '400px'}}>
                        <Card.Body className="noto-sans-kr">
                            <Card.Text>이름: {user.name}</Card.Text>
                            <Card.Text>닉네임: {user.nickName}</Card.Text>
                            <Card.Text>전화번호: {user.phoneNumber}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                        </Card.Body>
                        <div style = {{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems:'center'}}>
                            <Button className = 'green' style = {{color: 'white', border: 'none', margin: '10px'}} onClick = {onClickChat}>채팅</Button>
                            <Button className = 'green' style = {{color: 'white', border: 'none', margin: '10px'}} onClick = {onChangeData}>정보 변경</Button>
                            <Button className = 'green' style = {{color: 'white', border: 'none', margin: '10px'}} onClick = {handleShow} >회원 탈퇴</Button>
                            <Unregister show={showModal} handleClose={handleClose} />
                        </div>
                    </Card>
                    <span className="material-symbols-outlined size-200" style={{textAlign: 'center'}}>account_circle</span>
                </div>
                <div style = {{marginTop:"60px", marginBottom:"40px"}}/>
                <div>
                    <div >
                        <div style = {{display: "flex", alignItems: 'center', textAlign: 'center'}}>
                            <img src={house} alt='house_pic' width = '30px' height = 'auto'/>
                            <h7 style={{marginLeft:"10px", marginRight:'15px'}}>임대 중</h7>
                        </div>
                        <div>
                            <Card style = {{marginTop:"10px", marginBottom:"30px", width: '300px'}}>
                                <div style = {{display:'flex', alignItems: 'center'}}>
                                    <Card.Title className = 'infoTitle'>반포 자이아파트</Card.Title>
                                    <Badge className = "bg-success" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-20</Badge>
                                </div>
                                <Card.Body style = {{display: "grid", gridTemplateColumns: "1fr 1fr", gap:'10px'}}>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}> 임대 시작일</div>
                                        <div className = 'infoName'>2024.10.27</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>임대 종료일</div>
                                        <div className = 'infoName'>2025.10.26</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>임대 기간</div>
                                        <div className = 'infoName'>12 개월</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>월세 금액</div>
                                        <div className = 'infoName'>220 만원/월</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>다음 월세 이체 날짜</div>
                                        <div className = 'infoName'>2024.11.27</div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div style = {{display: "flex", alignItems: 'center', textAlign: 'center'}}>
                            <img src={house} alt='house_pic' width = '30px' height = 'auto'/>
                            <h7 style={{marginLeft:"10px", marginRight:'15px'}}>임차 중</h7>
                        </div>
                        <div style = {{display:'flex', gap: '17px'}}>
                            <Card style = {{marginTop:"10px", marginBottom:"30px", width: '300px'}}>
                                <div style = {{display:'flex', alignItems: 'center'}}>
                                    <Card.Title className = 'infoTitle'>신촌 푸르지오 아파트</Card.Title>
                                    <Badge className = "bg-danger" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-3</Badge>
                                </div>
                                <Card.Body style = {{display: "grid", gridTemplateColumns: "1fr 1fr", gap:'10px'}}>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>임차 시작일</div>
                                        <div className = 'infoName'>2024.10.11</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>임차 종료일</div>
                                        <div className = 'infoName'>2025.10.10</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>임차 기간</div>
                                        <div className = 'infoName'>12 개월</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>월세 금액</div>
                                        <div className = 'infoName'>180 만원/월</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>다음 월세 입금 날짜</div>
                                        <div className = 'infoName'>2024.11.10</div>
                                </Card.Body>
                            </Card>
                            <Card style = {{marginTop:"10px", marginBottom:"30px", width: '300px'}}>
                                <div style = {{display:'flex', alignItems: 'center'}}>
                                    <Card.Title className = 'infoTitle'>잠실 푸르지오 아파트</Card.Title>
                                    <Badge className = "bg-warning" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-10</Badge>
                                </div>
                                <Card.Body style = {{display: "grid", gridTemplateColumns: "1fr 1fr", gap:'10px'}}>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>임차 시작일</div>
                                        <div className = 'infoName'>2024.9.17</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>임차 종료일</div>
                                        <div className = 'infoName'>2025.9.16</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>임차 기간</div>
                                        <div className = 'infoName'>12 개월</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>월세 금액</div>
                                        <div className = 'infoName'>150 만원/월</div>
                                        <div className = 'infotype' style = {{fontSize: '13px'}}>다음 월세 입금 날짜</div>
                                        <div className = 'infoName'>2024.11.17</div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </div>);
};
export default Mypage;
