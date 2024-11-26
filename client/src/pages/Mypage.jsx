import {useNavigate} from "react-router-dom";
import Logo from "../component/Logo";
import HouseItem from "../component/HouseItem";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthItemContext } from "../context/AuthItemContext";
import { Card, Button,Badge, Container, Row, Col} from "react-bootstrap";
import Unregister from "./Unregister";
import MyItem from "./MyItem";
import LikedItem from "./LikedItem";
import ContractReq from "./ContractReq";
import SendContractReq from "./SendContractReq";
import LinkingAccount from './LinkingAccount';
import LinkingMetaMask from './LinkingMetaMask';
import chat from '../icons/chat.svg';
import account from '../icons/account.svg';
import house from '../icons/house.svg';
import ContractCard from "../component/ContractCard";
import {ContractContext} from '../App';
import { ReqContext } from "../context/ReqContext";

const Mypage = () => {
    const navigate = useNavigate();
    const { user, userNickNameFinder } = useContext(AuthContext);
    const { getUserSendReq,getUserReceiveReq} = useContext(ReqContext);
    //const { findItem, findItemError, isFindItemLoading, } = useContext(AuthItemContext);
    const [receiveRequest, setReceiveRequest] = useState(null);
    const [sendReq, setSendReq] = useState(null);
    const [senderNickName, setSenderNickName] = useState({});
    const [reNickName, setReNickName] = useState({});
    //const [houseForRent, setHouseForRent] = useState({});
    //const [rentedHouse, setRentedHouse] = useState({});

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [showMyItemModal, setShowMyItemModal] = useState(false);
    const handleShowMyItem = () => setShowMyItemModal(true);
    const handleCloseMyItem = () => setShowMyItemModal(false);

    const [showLikeItemModal, setShowLikeItemModal] = useState(false);
    const handleShowLikedItem = () => setShowLikeItemModal(true);
    const handleCloseLikedItem = () => setShowLikeItemModal(false);

    const [showReqModal, setShowReqModal] = useState(false);
    const handleReqShow = () => setShowReqModal(true);
    const handleReqClose = () => setShowReqModal(false);

    const [showSendReqModal, setShowSendReqModal] = useState(false);
    const handleSendReqShow = () => setShowSendReqModal(true);
    const handleSendReqClose = () => setShowSendReqModal(false);

    const [showAccountModal, setShowAccountModal] = useState(false);
    const handleAccountShow = () => setShowAccountModal(true);
    const handleAccountClose = () => setShowAccountModal(false);

    const [showMetaMaskModal, setShowMetaMaskModal] = useState(false);
    const handleMetaMaskShow = () => setShowMetaMaskModal(true);
    const handleMetaMaskClose = () => setShowMetaMaskModal(false);

    
    useEffect(() => {
        const fetchReq = async () => {
            const allReqs = await getUserSendReq();
            if (Array.isArray(allReqs)){
                setSendReq(allReqs);
            } else {
                console.error('Failed to fetch Sended Request.');
            }
        };
        fetchReq();
    }, []);

    useEffect(() => {
        const fetchReq = async () => {
            const allReqs = await getUserReceiveReq();
            if (Array.isArray(allReqs)){
                setReceiveRequest(allReqs);
            } else {
                console.error('Failed to fetch Request1111111.');
            }
        };
        fetchReq();
    }, []);

    useEffect(() => {
        if(!receiveRequest){return;}
        const fetchUserNickName = async (senderId) => {
            try{
                const result = await userNickNameFinder(senderId);
                setSenderNickName((prev) => ({
                    ...prev,
                    [senderId]: result,
                }));
            } catch {
                console.error('Failed to fetch Received Request.');
            }
        };

        receiveRequest.forEach((r)=>{
            if(!senderNickName[r.senderId]){
                fetchUserNickName(r.senderId);
        }});
    }, [receiveRequest,senderNickName])

    useEffect(() => {
        if (!sendReq) return;
        const fetchUserNickName = async (ownerId) => {
            try{
            const result = await userNickNameFinder(ownerId);
            setReNickName((prev) => ({
                ...prev,
                [ownerId]: result,
            }));
            } catch {
                console.error('Failed to fetch Sended Request.');
            }
        };

        sendReq.forEach((s)=>{
            if(!reNickName[s.ownerId]){
                fetchUserNickName(s.ownerId);
        }});
    }, [sendReq, reNickName]);
/*
    useEffect(() => {
        console.log(receiveRequest, sendReq);
        const fetchHouse = async (itemID, func) => {
            try{
                const result = await findItem(itemID);
                if(result){
                func((prev) => ({
                    ...prev,
                    [itemID]: result,
                }));}else{
                    console.error('아이템을 찾을 수 없습니다.');
                }
            }catch(error){
                console.error('Failed to fetch items.');
            }
        };

        const fetchReceiveRequest = async () => {
            if(!receiveRequest){
                console.log('빈 객체');
                return;
            }
            for (const r of receiveRequest){
                if(!houseForRent[r.itemId]){
                    await fetchHouse(r.itemId, setHouseForRent);
            }}
        };

        const fetchSendReq = async () => {
            if(!sendReq){
                console.log('빈 객체');
                return;
            }
            for (const s of sendReq) {
                if(!rentedHouse[s.itemId]){
                    await fetchHouse(s.itemId, setRentedHouse);
            }}
        };

        if (receiveRequest && receiveRequest.length > 0){
            fetchReceiveRequest();
        }
        if(sendReq && sendReq.length > 0){
            fetchSendReq();
        }
        
    }, [receiveRequest, sendReq]);

    useEffect(()=>{
        console.log(houseForRent, rentedHouse);
    }, [houseForRent, rentedHouse])
*/

    const onChangeData = () => {
        navigate("/changingUserData");
    }

    const onClickChat = () => {
        navigate("/chat");
    }

    const onContractList = () => {
        navigate("/contractList");
    }

    if (!user){
        return <div>Error: User not found'</div>
    }
    console.log('userrrrr: ',{user})

    const acceptContract = async(otherUser, id, isOwner)=>{
        console.log(otherUser, id, isOwner);
        navigate(`/makeContract/${otherUser}/${id}/${isOwner}`);
    };

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
                                            <div style = {{display : 'flex', alignItems: 'center', marginBottom : '1rem'}}>
                                                <Card.Text style={{marginBottom:'0px'}}>이름: {user.name}</Card.Text>
                                                {user?.realEstateAgent && <Badge className = 'skyblue' style = {{marginLeft: '7px', alignItems:'center'}}>중개사</Badge>}
                                            </div>
                                            <Card.Text>닉네임: {user.nickName}</Card.Text>
                                            <Card.Text>전화번호: {user.phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</Card.Text>
                                            <Card.Text>Email: {user.email}</Card.Text>
                                            <div style = {{display : 'flex', alignItems: 'center', gap:'10px', marginBottom : '1rem'}}>
                                                <Card.Text style={{marginBottom:'0px'}}>계좌 연결 상태: </Card.Text>
                                                <Card.Text className={user.account?'blueFont':'skyblueFont'} style = {{marginBottom : '0'}}>{user.account?"연결 완료":"미연결"}</Card.Text>
                                                {!user?.account && <Badge className = 'skyblue' style = {{marginLeft: '7px', marginBottom : '0', display : 'flex',alignItems:'center'}} onClick = {handleAccountShow}>연결하기</Badge>}
                                                {user?.account && <Badge className = 'skyblue' style = {{marginLeft: '7px', marginBottom : '0', display : 'flex',alignItems:'center'}} onClick = {handleAccountShow}>계좌 변경</Badge>}
                                            
                                            </div>
                                            <LinkingAccount show={showAccountModal} handleClose={handleAccountClose}/>
                                            <div style = {{display : 'flex', alignItems: 'center', gap:'10px'}}>
                                                <Card.Text style={{marginBottom:'0px'}}>이더리움 주소: </Card.Text>
                                                <Card.Text className={user.metaMaskAdd?'blueFont':'skyblueFont'} style = {{marginBottom : '0'}}>{user.metaMaskAdd?user.metaMaskAdd:"미연결"}</Card.Text>
                                                {!user?.metaMaskAdd && <Badge className = 'skyblue' style = {{marginLeft: '7px', marginBottom : '0', display : 'flex', alignItems:'center'}} onClick = {handleMetaMaskShow}>등록하기</Badge>}
                                                {user?.metaMaskAdd && <Badge className = 'skyblue' style = {{marginLeft: '7px', marginBottom : '0', display : 'flex', alignItems:'center'}} onClick = {handleMetaMaskShow}>변경하기</Badge>}
                                            
                                            </div>
                                            <LinkingMetaMask show={showMetaMaskModal} handleClose={handleMetaMaskClose}/>
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
                                    <Unregister show={showModal} handleClose={handleClose} />
                                </div>
                            </div> 
                            <div>
                                <div >
                                    <Button className = 'green' style = {{color: 'white', border: 'none', margin: '7px'}} onClick = {handleSendReqShow}>보낸 거래 요청</Button>
                                    <Button className = 'green' style = {{color: 'white', border: 'none', margin: '7px'}} onClick = {handleReqShow}>받은 거래 요청</Button>
                                    <SendContractReq show={showSendReqModal} handleClose={handleSendReqClose} />
                                    <ContractReq show={showReqModal} handleClose={handleReqClose} />
                                    <div style = {{display: "flex", alignItems: 'center', textAlign: 'center'}}>
                                        <img src={house} alt='house_pic' width = '30px' height = 'auto'/>
                                        <div style={{marginLeft:"10px", marginRight:'15px'}}>진행 중인 거래</div>
                                    </div>
                                        <div>
                                            {sendReq?.map((s) => (
                                                s.accept &&
                                                <Card style = {{display: 'flex', justifyContent: 'center', padding: '1rem', gap: '7px'}} onClick ={() => {acceptContract(s.ownerId, s._id, false)}}>
                                                    <strong>ID: {reNickName[s.ownerId]? reNickName[s.ownerId]:s.ownerId} 님이 거래 요청을 수락하였습니다.</strong>
                                                    <p style={{marginBottom: '0'}}>거래 요청 한 매물: {s.itemId}</p>
                                                </Card>
                                            ))}
                                        </div>
                                        <div>
                                            {receiveRequest?.map((r) => (
                                                r.accept &&
                                                <Card  style = {{display: 'flex', justifyContent: 'center', padding: '1rem', gap: '7px'}} onClick ={() => {acceptContract(r.senderId, r._id, true)}}>
                                                    <strong>ID: {senderNickName[r.senderId]? senderNickName[r.senderId]: r.senderId} 님의 거래 요청을 수락하였습니다.</strong>
                                                    <p style={{marginBottom: '0'}}>거래 요청 한 매물: {r.itemId}</p>
                                                </Card>
                                            ))}
                                        </div>

                                    <div style = {{display: "flex", alignItems: 'center', textAlign: 'center'}}>
                                        <img src={house} alt='house_pic' width = '30px' height = 'auto'/>
                                        <div style={{marginLeft:"10px", marginRight:'15px'}}>임차 중</div>
                                    </div>
                                    <div className = 'contractContainer'>
                                        {receiveRequest?.map((r) => {
                                            console.log(r);
                                            if(r.accept){
                                                return(
                                                <ContractCard id = {r.itemId} info = {{start: r.start, end: r.end, period: r.period}} className='contractCard'/>
                                                )
                                            }
                                            return null;
                                        })}
                                    </div>
                                        
                                    <div style = {{display: "flex", alignItems: 'center', textAlign: 'center'}}>
                                        <img src={house} alt='house_pic' width = '30px' height = 'auto'/>
                                        <div style={{marginLeft:"10px", marginRight:'15px'}}>임대 중</div>
                                    </div>
                                    <div className = 'contractContainer'>
                                    {sendReq?.map((s) => {
                                            console.log(s);
                                            if(s.accept){
                                                return(
                                                <ContractCard id = {s.itemId} info = {{start: s.start, end: s.end, period: s.period}} className='contractCard'/>
                                                )
                                            }
                                            return null;
                                        })}
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
