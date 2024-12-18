import {useEffect, useState, useContext} from "react";
import Logo from "../component/Logo";
import { useNavigate, useParams } from "react-router-dom";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container, Badge } from "react-bootstrap";
import { ReqContext } from "../context/ReqContext";
import History  from "../component/History";

const ReqPage = () => {
    const navigate = useNavigate();
    const {otherUser,id,type} = useParams();
    const { user, findUser, findUserError, isFindUserLoading } = useContext(AuthContext);
    const {
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const [item, setItem] = useState(null);
    const isOwner = type==='true';

    const [reqInfo, setReqInfo] = useState(null);

    const [otherUserinfo, setOtherUserinfo] = useState(null);
    const{findingReq, updateAccept, deleteR} = useContext(ReqContext);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const handleHistoryShow = () => setShowHistoryModal(true);
    const handleHistoryClose = () => setShowHistoryModal(false);
    
    useEffect(() =>{
        const fetchReq = async () => {
            try{
                const result = await findingReq(id);
                setReqInfo(result);
            }catch{
                return null;
            }
        }
        fetchReq();
    }, [id]);
    
    console.log(reqInfo);

    useEffect(() => {
        const fetchItem = async () => {
            if (reqInfo?.itemId){
                if (item){
                    console.log('Item already fetched', item);
                }
                const result = await findItem(reqInfo?.itemId);
                setItem(result);
            }
        };
        fetchItem();
    }, [reqInfo]);

    useEffect(() => {
        const fetchUser = async () => {
            if (otherUser && !findUserError && !isFindUserLoading){
                console.log('AAAAAAAAAAAAAAAAA');
                    const result = await findUser(otherUser);
                    setOtherUserinfo(result);
            };
        };
        fetchUser();
    }, [reqInfo]);

    console.log('CCCCCCCCCCCCCCCC',otherUserinfo);
    
    if (!item){
        console.log(item);
        return <div>Error: {findItemError?.message || 'Page not found'}</div>
    }

    if (isFindUserLoading){
        return <div>Loding...</div>
    }

    const onDeleteReq = async() => {
        await deleteR(id);
        navigate("/mypage");
    }

    const onContract = async() =>{
        const otherUser = otherUserinfo._id
        if(otherUser){
        await updateAccept(id);
        navigate(`/checkIdentity/${id}/${true}`, {state: {otherUser}});}
    }

    const goToItem = () => {
        console.log('아이템 페이지로 이동');
        if(!isFindItemLoading && !findItemError && item?.itemID){
            console.log('이동 성공');
            navigate(`/item/${item.itemID}`);
        }
    }
    
    if(!user){
        return null;
    }
    const s = reqInfo?.start? reqInfo.start:null;
    const timeStart = s instanceof Date
        ? s.toISOString().split('T')[0]
        : (typeof s === 'string' && !isNaN(new Date(s).getTime()))
        ? new Date(s).toISOString().split('T')[0]
        : '';
        
    const e = reqInfo?.end? reqInfo.end:null;
    const timeEnd = e instanceof Date
        ? e.toISOString().split('T')[0]
        : (typeof e === 'string' && !isNaN(new Date(e).getTime()))
        ? new Date(e).toISOString().split('T')[0]
        : '';

    return (
        <Container>
            <div className = "logo"><Logo /></div>
            <Row className = "noto-sans-kr"
            style={{
                    height: "100%",
                    justifyContent: "Center",
                    paddingTop: "10px",
                    paddingBottom:"10%",
                    margin:"10px"
                }}>
                    <Col xs={10}>
                        <h2 style={{marginBottom: '20px'}}>{isOwner?'받은 요청':'보낸 요청'}</h2>
                        <Card className = "information" style={{marginBottom:"20px"}}>
                            {isOwner?(
                                <>
                                    <Card.Title className = "infoTitle">상대 정보 확인</Card.Title>
                                    <Card.Body 
                                        style={{
                                            display: 'grid', 
                                            gridTemplateColumns: '0.5fr 1.5fr 1fr 1fr', 
                                            gap: '5px',
                                            alignItems: 'center', 
                                            justifyContent:'center', 
                                            textAlign:'center',
                                            }}>
                                        <div className="infotype">이름</div>
                                        <div style={{display: 'flex',alignItems: 'center', justifyContent:'center', textAlign:'center',}}>
                                            <div className = "infoName">{otherUserinfo.name}</div>
                                            <Badge className='noto-sans-kr skyblue' style = {{ marginLeft: '20px', display:'flex', alignItems: 'center'}} onClick = {handleHistoryShow}>히스토리 확인</Badge>
                                        </div>
                                        <History show={showHistoryModal} handleClose={handleHistoryClose} nickName = {otherUserinfo.nickName} />
                                        <div className="infotype">전화번호</div>
                                        <div className = "infoName">{otherUserinfo.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</div>
                                    </Card.Body>
                                </>
                            ):(
                                <>
                                    <Card.Title className = "infoTitle">내 정보 확인</Card.Title>
                                    <Card.Body className = "info">
                                        <div className="infotype">이름</div>
                                        <div className = "infoName">{user.name}</div>
                                        <div className="infotype">전화번호</div>
                                        <div className = "infoName">{user.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</div>
                                    </Card.Body>
                                </>
                            )}
                        </Card>
                        <Card style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">계약 요청 상세</Card.Title>
                            <Card.Body className = "inputCard">
                                <div className="infotype">계약 시작 날짜</div>
                                <div className = "infoName">{timeStart}</div>
                                <div className="infotype">계약 종료 날짜</div>
                                <div className = "infoName">{timeEnd}</div>
                                <div className="infotype">계약 기간</div>
                                <div className = "infoName">{reqInfo.period} 개월</div>
                            </Card.Body>
                        </Card>
                        <Card className = "information" style={{marginBottom:"10px", paddingBottom:'10px'}}>
                            <Card.Title className = "infoTitle" style={{marginBottom: '25px'}}>매물 정보</Card.Title>
                            <div style = {{display: 'grid', gridTemplateColumns: '1fr 0.5fr', gap: '15px', fontSize: '17px', marginLeft:'24px', marginBottom: '5px'}}>
                                <div>{item.location} {item.houseAddress}</div>
                                <div>
                                        {item.deposit && (
                                            <>
                                                {Math.floor(item.deposit / 10000) > 0 && (
                                                    <>{Math.floor(item.deposit / 10000)}억 </>
                                                )}
                                                {item.deposit % 10000 > 0 && (
                                                    <>{item.deposit % 10000}만원</>
                                                )}
                                            </>
                                        )}
                                        / {item.housePrice}만원
                                </div>
                            </div>
                            <Card.Body className = "info">
                                {item.type? (
                                    <>
                                        <div className = "infotype">방 종류(건축물 용도)</div> 
                                        <div className = "infoName">{item.type}</div>
                                    </>
                                ):null}
                                {item.floor? (
                                    <>
                                        <div className = "infotype">해당층/건물층</div>
                                        <div className = "infoName">{item.floor}층/50층</div>
                                    </>
                                ):null}
                                {item.duplexAvailability !== '' && item.duplexAvailability !== null && item.duplexAvailability !== undefined ?(
                                    <>
                                        <div className = "infotype">복층 여부</div>
                                        <div className = "infoName">{item.duplexAvailability? '복층':'단층'}</div>  
                                    </>
                                ):null}
                                <div className = "infotype">전용/계약면적</div>
                                <div className = "infoName">
                                    {item.exclusiveArea}<span>m<sup>2</sup></span>/ {item.contractArea}<span>m<sup>2</sup></span>
                                </div>
                                <div className = "infotype">방 수/욕실 수</div>
                                <div className = "infoName">{item.room}/{item.bathroom}</div>
                                {item.facing? (
                                    <>
                                        <div className = "infotype">방향</div>
                                        <div className = "infoName">{item.facing}</div>
                                    </>
                                ):null}
                                {item.elevator !== '' && item.elevator !== null && item.elevator !== undefined ? (
                                    <>
                                        <div className = "infotype">엘리베이터</div>
                                        <div className = "infoName">{item.elevator? '있음':'없음'}</div>
                                    </>
                                ):null}
                                {item.petFriendly !== '' && item.petFriendly !== null && item.petFriendly !== undefined ? (
                                    <>
                                        <div className = "infotype">반려동물 가능 여부</div>
                                        <div className = "infoName">{item.petFriendly? '가능':'불가능'}</div>
                                    </>
                                ):null}
                                {item.number_of_units_in_the_given_area? (
                                    <>
                                        <div className = "infotype">해당 면적 세대수</div>
                                        <div className = "infoName">{item.number_of_units_in_the_given_area}세대</div>
                                    </>
                                ):null}
                                {item.total_number_of_units? (
                                    <>
                                        <div className = "infotype">총 세대수</div>
                                        <div className = "infoName">{item.total_number_of_units}세대</div>
                                    </>
                                ):null}
                                {item.parkingSpace? (
                                    <>
                                        <div className = "infotype">총 주차대수</div>
                                        <div className = "infoName">{item.parkingSpace}대</div>
                                    </>
                                ):null}
                            </Card.Body>
                        </Card>
                        <div className='contractButton' style={{marginTop: '15px'}}>{
                            isOwner?(
                            <>
                                <Button style = {{backgroundColor: '#5B6A82', color: 'white', border: 'none', marginTop: '5px', width:'100px'}} onClick = {onDeleteReq}>요청 거절</Button>
                                <Button className="green" style = {{color: 'white', border: 'none', marginTop: '5px', width: '100px'}} onClick = {onContract} >요청 수락</Button>
                            </>):(
                                <>
                                <Button style = {{backgroundColor: '#5B6A82', color: 'white', border: 'none', marginTop: '5px', width:'100px'}} onClick = {goToItem}>매물 보기</Button>
                                <Button className="green" style = {{color: 'white', border: 'none', marginTop: '5px', width: '100px'}} onClick = {onDeleteReq}>요청 취소</Button>
                                </>
                            )}
                        </div>
                    </Col>
            </Row>
        </Container>
    )
};
export default ReqPage;