import {useNavigate} from "react-router-dom";
import Logo from "../component/Logo";
import HouseItem from "../component/HouseItem";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthItemContext } from "../context/AuthItemContext";
import { Card, Button,Badge, Container, Row, Col} from "react-bootstrap";
import Unregister from "./Unregister";
import MyItem from "./MyItem";
import LikedItem from "./LikedItem";
import chat from '../icons/chat.svg';
import account from '../icons/account.svg';
import house from '../icons/house.svg';
import ContractCard from "../component/ContractCard";

const Mypage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [showMyItemModal, setShowMyItemModal] = useState(false);
    const handleShowMyItem = () => setShowMyItemModal(true);
    const handleCloseMyItem = () => setShowMyItemModal(false);

    const [showLikeItemModal, setShowLikeItemModal] = useState(false);
    const handleShowLikedItem = () => setShowLikeItemModal(true);
    const handleCloseLikedItem = () => setShowLikeItemModal(false);

    const onChangeData = () => {
        navigate("/changingUserData");
    }

    const onClickChat = () => {
        navigate("/chat");
    }

    const onContractList = () => {
        navigate("/contractList");
    }

    return (
        <Container>
            <Row>
                <Col style = {{marginBottom: '35px'}}>
                    <div>
                        <div className = "logo" ><Logo /></div>
                        <div className = 'intro' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                            <div className = "noto-sans-kr" style = {{display:'grid', gridTemplateColumns: "1fr 1fr",gap:'30px'}}>
                                <div className = "intro" style = {{display:'flex', flexDirection:'column', alignItems: 'center'}}>
                                    <h4 className="gugi-regular" style={{marginTop:'15px', marginBottom: '25px', fontSize:'30px'}}>MY page</h4>
                                    <span className="material-symbols-outlined size-200" style={{textAlign: 'center', marginBottom: '10px'}}>account_circle</span>
                                    <div style ={{display:'flex', flexDirection: ' column', alignItems:'flex-start', width: '400px'}}>
                                    <Card style = {{width: '400px', marginBottom:'5px'}}>
                                        <Card.Body className="noto-sans-kr">
                                            <Card.Text>이름: {user.name}</Card.Text>
                                            <Card.Text>닉네임: {user.nickName}</Card.Text>
                                            <Card.Text>전화번호: {user.phoneNumber}</Card.Text>
                                            <Card.Text>Email: {user.email}</Card.Text>
                                        </Card.Body>
                                        <div style = {{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems:'center', marginLeft:'10px',  marginRight:'10px',  marginBottom:'10px'}}>
                                            <Button className = 'green' style = {{color: 'white', border: 'none', margin: '7px'}} onClick = {onClickChat}>채팅 목록</Button>
                                            <Button className = 'green' style = {{color: 'white', border: 'none', margin: '7px'}} onClick = {handleShowMyItem}>내 매물</Button>
                                            <MyItem show={showMyItemModal} handleClose={handleCloseMyItem} />
                                            <Button className = 'green' style = {{color: 'white', border: 'none', margin: '7px'}} onClick = {handleShowLikedItem}>찜한 매물</Button>
                                            <LikedItem show={showLikeItemModal} handleClose={handleCloseLikedItem} />
                                        </div>
                                    </Card>
                                    <div style = {{border: 'none', margin: '10px', marginBottom: '45px', display:'flex', justifyContent:'space-between', alignItems: 'center', width: '95%'}}>
                                        <div className = 'blueFont' style = {{border: 'none',cursor: "pointer"}} onClick = {onChangeData}>정보 변경</div>
                                        <div style = {{color: '#d3d3d3', border: 'none', cursor: "pointer"}} onClick = {handleShow} >회원 탈퇴</div>
                                    </div>
                                    <div style = {{color: 'gray', border: 'none', margin: '10px', cursor: "pointer"}} onClick = {handleShow} >회원 탈퇴</div>
                                    <Unregister show={showModal} handleClose={handleClose} />
                                </div>
                            </div>     
                            <div>
                                <div >
                                    <div style = {{display: "flex", alignItems: 'center', textAlign: 'center'}}>
                                        <img src={house} alt='house_pic' width = '30px' height = 'auto'/>
                                        <div style={{marginLeft:"10px", marginRight:'15px'}}>임대 중</div>
                                    </div>
                                    <div>
                                        <ContractCard/>
                                    </div>
                                    <div style = {{display: "flex", alignItems: 'center', textAlign: 'center'}}>
                                        <img src={house} alt='house_pic' width = '30px' height = 'auto'/>
                                        <div style={{marginLeft:"10px", marginRight:'15px'}}>임차 중</div>
                                    </div>
                                    <div style = {{display:'flex', gap: '17px'}}>
                                        <ContractCard/>
                                        <ContractCard/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>);
};
export default Mypage;
