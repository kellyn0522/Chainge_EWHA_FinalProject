import {useEffect, useState, useContext} from "react";
import Logo from "../component/Logo";
import { useParams} from "react-router-dom";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container, Stack } from "react-bootstrap";
import { ReqContext } from "../context/ReqContext";

const ContractPage = () => {
    const {otherUser,id,type} = useParams();
    const [item, setItem] = useState(null);
    const [reqInfo, setReqInfo] = useState(null);
    const [info, setInfo] = useState(null);
    const { user, findUser, findUserError, isFindUserLoading } = useContext(AuthContext);
    const {
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const isOwner = type==='true';
    const [otherUserinfo, setOtherUserinfo] = useState(null);
    const{findingReq} = useContext(ReqContext);
    const [d_Day, setD_Day] = useState(20);
    
    useEffect(() =>{
        const fetchReq = async () => {
            console.log(id);
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
    }, [reqInfo?.itemId]);

    useEffect(() => {
        const fetchUser = async () => {
            if (otherUser && !findUserError && !isFindUserLoading){
                    const result = await findUser(otherUser);
                    setOtherUserinfo(result);
            };
        };
        fetchUser();
    }, [otherUser]);

    useEffect(() => {
        if(user && otherUserinfo && item && reqInfo){
            const newInfo = isOwner?
                {
                    tenantID: otherUserinfo._id,
                    tenantphoneNum: otherUserinfo.phoneNumber,
                    tenantBirth: otherUserinfo.birth,
                    tenantidentityNum: otherUserinfo.identityNum,
                    tenantMetamaskAdd: otherUserinfo.metaMaskAdd,
                    tenantname: otherUserinfo.name,
                    tenantzipcode: otherUserinfo.zipCode,
                    tenantAccount: otherUserinfo.account,

                    landlordID: user._id,
                    landlordphoneNum: user.phoneNumber,
                    landlordBirth: user.birth,
                    landlordIdentityNum: user.identityNum,
                    landlordMetamaskAdd: user.metaMaskAdd,
                    landlordname: user.name,
                    landlordzipcode: user.zipCode,
                    landlordAccount: user.account,

                    itemID: item?.itemID,
                    price: item?.price,
                    deposit: item?.deposit,
                    start: reqInfo.start,
                    end: reqInfo.end,
                    period: reqInfo.period,
                }:{
                    tenantID: user._id,
                    tenantphoneNum: user.phoneNumber,
                    tenantBirth: user.birth,
                    tenantidentityNum: user.identityNum,
                    tenantMetamaskAdd: user.metaMaskAdd,
                    tenantname: user.name,
                    tenantzipcode: user.zipCode,
                    tenantAccount: user.account,

                    landlordID: otherUserinfo._id,
                    landlordphoneNum: otherUserinfo.phoneNumber,
                    landlordBirth: otherUserinfo.birth,
                    landlordIdentityNum: otherUserinfo.identityNum,
                    landlordMetamaskAdd: otherUserinfo.metaMaskAdd,
                    landlordname: otherUserinfo.name,
                    landlordzipcode: otherUserinfo.zipCode,
                    landlordAccount: otherUserinfo.account,

                    itemID: item?.itemID,
                    price: item?.price,
                    deposit: item?.deposit,
                    start: reqInfo.start,
                    end: reqInfo.end,
                    period: reqInfo.period,
                };
                setInfo(newInfo);
        };
    }, [otherUserinfo,user,item,reqInfo, isOwner]);

    useEffect(() => {
        const today = new Date();

        if(reqInfo && reqInfo.start && reqInfo.end){
            const reqStart = new Date(reqInfo.start);
            const reqEnd = new Date(reqInfo.end);
            const dayDifference = Math.floor((reqEnd-today)/1000*60*60*24);
            if(dayDifference < 0){
                setD_Day(-1);
            }else{
                const rest = today.getDate() - reqStart.getDate();
                if (rest >= 0){
                    setD_Day(rest);
                }else{
                    setD_Day(rest+30);
                }
            }
        console.log(d_Day, today.getDate(), new Date(reqInfo.start).getDate())
        }
    },[reqInfo])

    if (isFindItemLoading){
        return <div>Loding...</div>
    }

    if (findItemError || !item){
        return <div>Error: {findItemError?.message || 'Page not found'}</div>
    }

    if (isFindUserLoading){
        return <div>Loding...</div>
    }
    
    if(!user || !item){
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

    
    if(!info || !item){
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
                        <h2 style={{marginBottom: '30px'}}>계약서</h2>
                        {d_Day<0&&<div className = 'skyblueFont'>거래가 종료되었습니다.</div>}
                        {d_Day===0&&<div className = 'skyblueFont'>계좌 이체 D-day입니다.</div>}
                        {d_Day>0&&<div className = 'skyblueFont'>다음 이체까지 {d_Day}일 남았습니다.</div>}
                        <Card className = "information" style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">임대인</Card.Title>
                            <Card.Body className = "info">
                                <div className="infotype">이름</div>
                                <div className = "infoName">{info.landlordname}</div>
                                <div className="infotype">우편번호</div>
                                <div className = "infoName">{info.landlordzipcode}</div>
                                <div className ="infotype">주민등록번호</div>
                                <div className = "infoName">{info.landlordBirth}-{info.landlordIdentityNum}</div>
                                <div className="infotype">전화번호</div>
                                <div className = "infoName">{info.landlordphoneNum?.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</div>
                                <div className ="infotype">연결된 계좌</div>
                                <div className = "infoName">{info.landlordAccount}</div>
                                <div className ="infotype">메타마스크 주소</div>
                                <div className = "infoName">{info.landlordMetamaskAdd}</div>
                            </Card.Body>
                        </Card>
                        <Card className = "information" style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">임차인</Card.Title>
                            <Card.Body className = "info">
                                <div className="infotype">이름</div>
                                <div className = "infoName">{info.tenantname}</div>
                                <div className="infotype">우편번호</div>
                                <div className = "infoName">{info.tenantzipcode}</div>
                                <div className ="infotype">주민등록번호</div>
                                <div className = "infoName">{info.tenantBirth}-{info.tenantidentityNum}</div>
                                <div className="infotype">전화번호</div>
                                <div className = "infoName">{info.tenantphoneNum?.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</div>
                                <div className ="infotype">연결된 계좌</div>
                                <div className = "infoName">{info.tenantAccount}</div>
                                <div className ="infotype">메타마스크 주소</div>
                                <div className = "infoName">{info.tenantMetamaskAdd}</div>
                            </Card.Body>
                        </Card>
                        <Card style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">계약 상세</Card.Title>
                            <Card.Body className = "inputCard">
                                <div className="infotype">계약 시작 날짜</div>
                                <div className = "infoName">{timeStart}</div>
                                <div className="infotype">계약 종료 날짜</div>
                                <div className = "infoName">{timeEnd}</div>
                                <div className="infotype">계약 기간</div>
                                <div className = "infoName">{info.period} 개월</div>
                            </Card.Body>
                        </Card>
                        <Card className = "information" style={{marginBottom:"10px", paddingBottom:'10px'}}>
                            <Card.Title className = "infoTitle" style={{marginBottom: '25px'}}>매물 정보 확인</Card.Title>
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
                    </Col>
            </Row>
        </Container>
    )
};
export default ContractPage;