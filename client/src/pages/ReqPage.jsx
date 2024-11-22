import {useEffect, useState, useContext} from "react";
import Logo from "../component/Logo";
import { useNavigate, useParams } from "react-router-dom";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container, Stack } from "react-bootstrap";
import { ReqContext } from "../context/ReqContext";

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
            if (reqInfo?.itemId && !findItemError && !isFindItemLoading){
                const result = await findItem(reqInfo?.itemId);
                setItem(result);
            }
        };
        fetchItem();
    }, [reqInfo]);

    useEffect(() => {
        if (id && !findUserError && !isFindUserLoading){
            const fetchUser = async () => {
                const result = await findUser(otherUser);
                setOtherUserinfo(result);
            }
        
            fetchUser();
        };
    }, [otherUser]);

    
    
    if (isFindItemLoading){
        return <div>Loding...</div>
    }

    if (findItemError || !item){
        return <div>Error: {findItemError?.message || 'Page not found'}</div>
    }

    if (isFindUserLoading){
        return <div>Loding...</div>
    }

    const onDeleteReq = () => {
        deleteR(id);
    }

    const onContract = () =>{
        const contractInfo= {
            itemID: item?.itemID,
            tenantID: otherUserinfo?.tenantID,
            tenantphoneNum: otherUserinfo?.tenantphoneNum,
            tenantBirth:otherUserinfo?.tenantBirth,
            tenantidentityNum: otherUserinfo?.tenantidentityNum,
            metamaskAdd: otherUserinfo?.metamaskAdd,
            price: item?.housePrice,
            deposit: item?.deposit,

            landlordID: user?._id,
            landlordphoneNum: user?.phoneNumber,
            landlordBirth: user?.birth,
            landlordIdentityNum: user?.identityNum,

            start: reqInfo?.start||'2024.11.21',
            end:reqInfo?.end||'2025.11.20',
            period:reqInfo?.period||12,
        }
        console.log('CCCCCCCCCCCCCCCCC',contractInfo);
        updateAccept(id);
    }

    const goToItem = () => {
        if(!isFindItemLoading && !findItemError && item?.itemId){
            navigate(`/item/${item.itemId}`);
        }
    }
    
    if(!user || !item){
        return null;
    }

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
                                    <Card.Body className = "info">
                                        <div className="infotype">이름</div>
                                        <div className = "infoName">{user.name}</div>
                                        <div className="infotype">전화번호</div>
                                        <div className = "infoName">{user.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</div>
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
                                <div className = "infoName">2024.11.11</div>
                                <div className="infotype">계약 종료 날짜</div>
                                <div className = "infoName">2025.11.10</div>
                                <div className="infotype">계약 기간</div>
                                <div className = "infoName">12 개월</div>
                            </Card.Body>
                        </Card>
                        <Card className = "information" style={{marginBottom:"10px"}}>
                            <Card.Title className = "infoTitle">매물 정보</Card.Title>
                            <Card.Body className = "info">
                                {item.buildingName? (
                                    <>
                                        <div className = "infotype">건물 이름</div> 
                                        <div className = "infoName">{item.buildingName}</div>
                                    </>
                                ):null}
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
                                <Button className="green" style = {{color: 'white', border: 'none', marginTop: '5px', width: '100px'}} onclick = {onContract} >요청 수락</Button>
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