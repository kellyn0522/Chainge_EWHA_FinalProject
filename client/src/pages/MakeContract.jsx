import {useEffect, useState, useContext} from "react";
import Logo from "../component/Logo";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container, Stack } from "react-bootstrap";
import {ContractContext} from '../App';
import axios from 'axios';
import { ReqContext } from "../context/ReqContext";


const MakeContract = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();
    const {contractInfo} = location.state || {};
    const [item, setItem] = useState(null);
    const {setContract} = useContext(ContractContext);
    const [reqInfo, setReqInfo] = useState(null);
    const { user } = useContext(AuthContext);

    const {
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const{findingReq, signingError, isSigningLoading, tenantSigned, landlordSigned} = useContext(ReqContext);
    
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
            if (contractInfo && !findItemError && !isFindItemLoading){
                const result = await findItem(contractInfo.itemID);
                setItem(result);
            }
        };
        fetchItem();
    }, [contractInfo, findItem]);
    console.log('IIIIIIIIIIIIIItem', item);

    if (isFindItemLoading){
        return <div>Loding...</div>
    }
    if (!item){
        return <div>Error: {findItemError?.message || 'Page not found'}</div>
    }
    
    const info =
    {
        itemID: contractInfo?.itemID,
        tenantID: contractInfo.tenantID,
        tenantphoneNum: contractInfo.tenantphoneNum,
        tenantBirth: contractInfo.tenantBirth,
        tenantidentityNum: contractInfo.tenantidentityNum,
        tenantMetamaskAdd: contractInfo.metamaskAdd,
        tenantname: contractInfo.tenantname,
        tenantzipcode: contractInfo.tenantzipcode,

        landlordID: contractInfo.landlordID,
        landlordphoneNum: contractInfo.landlordphoneNum,
        landlordBirth: contractInfo.landlordBirth,
        landlordIdentityNum: contractInfo.landlordIdentityNum,
        landlordMetamaskAdd: contractInfo.landlordMetamaskAdd,
        landlordname: contractInfo.landlordname,
        landlordzipcode: contractInfo.landlordzipcode,

        price: contractInfo?.price,
        deposit: contractInfo?.deposit,
        start: contractInfo.start,
        end: contractInfo.end,
        period: contractInfo.period,
    }
    console.log('receivedinfo!!!!!!!!!!!!!!!',info);
    console.log('info!!!!!!!!!!!!!!!!!!!!!!!',contractInfo);

    const goToItem = () => {
        if(!isFindItemLoading && !findItemError && item){
            navigate(`/item/${item.itemID}`);
        }
    }
    
    if(!contractInfo || !item){
        return null;
    }

    const onLSign = async()=>{
        if(user._id === contractInfo.landlordID){
            await landlordSigned(id);
            setReqInfo(preState => ({
                ...preState,
                landlordSign: true,
            }));
        }
    }
    const onTSign = async()=>{
        if(user._id === contractInfo.tenantID){
            await tenantSigned(id);
            setReqInfo(preState => ({
                ...preState,
                tenantSign: true,
            }))
        }
    }

    const onContract = async (e)=>{
        e.preventDefault();

        await createReq(e);

        try {
            await axios.post('http://localhost:5000/api/contracts', info);
            setContract((prev) => [...prev, info]);
            navigate('/');
        } catch (errer){
            console.error('Error saving contract:', error);
        }
    };

    const s = contractInfo?.start? contractInfo.start:null;
    const timeStart = s instanceof Date
        ? s.toISOString().split('T')[0]
        : (typeof s === 'string' && !isNaN(new Date(s).getTime()))
        ? new Date(s).toISOString().split('T')[0]
        : '';
        
    const e = contractInfo?.end? contractInfo.end:null;
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
                        <h2 style={{marginBottom: '20px'}}>거래 하기</h2>
                        <Card className = "information" style={{marginBottom:"20px"}}>
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <Card.Title className = "infoTitle">임대인</Card.Title>
                                {reqInfo?.landlordSign?(
                                    <Button className="green" style = {{color: 'white', border: 'none', margin: '15px', marginRight: '25px', width: '150px', alignItems:'center'}}>서명 완료</Button>
                                ):(
                                    <Button className="lightBlue" style = {{color: 'white', border: 'none', margin: '15px', marginRight: '25px', width: '150px', alignItems:'center'}} onClick ={onLSign}>전자 서명 하기</Button>)}
                            </div>
                            <Card.Body className = "info">
                                <div className="infotype">이름</div>
                                <div className = "infoName">{contractInfo.landlordname}</div>
                                <div className="infotype">우편번호</div>
                                <div className = "infoName">{contractInfo.landlordzipcode}</div>
                                <div className ="infotype">주민등록번호</div>
                                <div className = "infoName">{contractInfo.landlordBirth}-{contractInfo.landlordIdentityNum}</div>
                                <div className="infotype">전화번호</div>
                                <div className = "infoName">{contractInfo.landlordphoneNum.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</div>
                            </Card.Body>
                            <div style ={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px', paddingLeft:'17px', paddingBottom:'20px'}}>
                                <div className ="infotype">메타마스크 주소</div>
                                <div className = "infoName">{contractInfo.landlordMetamaskAdd}</div>
                            </div>
                        </Card>
                        <Card className = "information" style={{marginBottom:"20px"}}>
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <Card.Title className = "infoTitle">임차인</Card.Title>
                                {reqInfo?.tenantSign?(
                                    <Button className="green" style = {{color: 'white', border: 'none', margin: '15px', marginRight: '25px', width: '150px', alignItems:'center'}}>서명 완료</Button>
                                ):(
                                    <Button className="lightBlue" style = {{color: 'white', border: 'none', margin: '15px', marginRight: '25px', width: '150px', alignItems:'center'}} onClick ={onTSign}>전자 서명 하기</Button>)}
                            </div>
                            <Card.Body className = "info">
                                <div className="infotype">이름</div>
                                <div className = "infoName">{contractInfo.tenantname}</div>
                                <div className="infotype">우편번호</div>
                                <div className = "infoName">{contractInfo.tenantzipcode}</div>
                                <div className ="infotype">주민등록번호</div>
                                <div className = "infoName">{contractInfo.tenantBirth}-{contractInfo.tenantidentityNum}</div>
                                <div className="infotype">전화번호</div>
                                <div className = "infoName">{contractInfo.tenantphoneNum.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</div>
                            </Card.Body>
                            <div style ={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px', paddingLeft:'17px', paddingBottom:'20px'}}>
                                <div className ="infotype">메타마스크 주소</div>
                                <div className = "infoName">{contractInfo.tenantMetamaskAdd}</div>
                            </div>
                        </Card>
                        <Card style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">계약 상세</Card.Title>
                            <Card.Body className = "inputCard">
                                <div className="infotype">계약 시작 날짜</div>
                                <div className = "infoName">{timeStart}</div>
                                <div className="infotype">계약 종료 날짜</div>
                                <div className = "infoName">{timeEnd}</div>
                                <div className="infotype">계약 기간</div>
                                <div className = "infoName">{contractInfo.period} 개월</div>
                            </Card.Body>
                        </Card>
                        <Card className = "information" style={{marginBottom:"10px"}}>
                            <Card.Title className = "infoTitle">매물 정보 확인</Card.Title>
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
                        <div className='contractButton' style={{marginTop: '15px'}}>
                            <Button style = {{backgroundColor: '#5B6A82', color: 'white', border: 'none', marginTop: '5px', width:'100px'}} onClick = {goToItem}>돌아가기</Button>
                            <Button className="green" style = {{color: 'white', border: 'none', marginTop: '5px', width: '100px', opacity: reqInfo?.tenantSign&&reqInfo.landlordSign? 1: 0.6}} disabled = {!reqInfo || !reqInfo?.tenantSign||!reqInfo?.landlordSign} onClick = {onContract}>거래 시작</Button>
                        </div>
                    </Col>
            </Row>
        </Container>
    )
};
export default MakeContract;