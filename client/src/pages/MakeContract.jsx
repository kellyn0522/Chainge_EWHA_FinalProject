import {useEffect, useState, useContext} from "react";
import Logo from "../component/Logo";
import { useNavigate, useParams } from "react-router-dom";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container, Stack } from "react-bootstrap";
import {ContractContext} from '../App';


const MakeContract = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { user } = useContext(AuthContext);
    const {
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const [item, setItem] = useState(null)
    const {setContract} = useContext(ContractContext);
    const [info, setInfo] = useState(
        {
            itemID:'',
            landlordID: '',
            landlordphoneNum: '',
            landlordBirth: '',
            tenantID: '',
            tenantphoneNum: '',
            tenantBirth:'',
            tenantidentityNum: '',
            start:'',
            end:'',
            period:'',
            price: '',
            deposit: ''
        }
    )

    useEffect(() => {
        const fetchItem = async () => {
            if (!findItemError && !isFindItemLoading){
                const result = await findItem(id);
                setItem(result);
            }
        };
        fetchItem();
    }, [findItem, findItemError]);

    if (isFindItemLoading){
        return <div>Loding...</div>
    }
    if (findItemError || !item){
        return <div>Error: {findItemError?.message || 'Page not found'}</div>
    }
    
    const goToItem = () => {
        if(!isFindItemLoading && !findItemError && item){
            navigate(`/item/${item.itemID}`);
        }
    }
    
    if(!user || !item){
        return null;
    }

    const handleStart = (e) =>{
        setInfo((prev) => ({...prev, start:e.target.value}));
    }
    const handleEnd = (e) =>{
        setInfo((prev) => ({...prev, end:e.target.value}));
    }
    const handlePeriod = (e) =>{
        setInfo((prev) => ({...prev, period:e.target.value}));
    }


    const onContract=(e)=>{
        const newContract = {
            ...info,
            itemID: item.itemID,
            tenantID: user._id,
            tenantphoneNum: user.phoneNumber,
            tenantBirth:user.birth,
            tenantidentityNum: user.identityNum,
            price: item.housePrice,
            deposit: item.deposit

        }
        setContract((prev) => [...prev, newContract])
        navigate('/');
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
                        <h2 style={{marginBottom: '20px'}}>거래 하기</h2>
                        <Card className = "information" style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">본인 정보 확인</Card.Title>
                            <Card.Body className = "info">
                                <div className="infotype">이름</div>
                                <div className = "infoName">{user.name}</div>
                                <div className="infotype">우편번호</div>
                                <div className = "infoName">{user.zipCode}</div>
                                <div className ="infotype">주민등록번호</div>
                                <div className = "infoName">{user.birth}-{user.identityNum}</div>
                                <div className="infotype">전화번호</div>
                                <div className = "infoName">{user.phoneNumber}</div>
                            </Card.Body>
                        </Card>
                        <Card style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">계약 상세</Card.Title>
                            <Card.Body className = "inputCard">
                                <div className="infotype">계약 시작 날짜</div>
                                <input type = "date" className="set" onChange={handleStart} />
                                <div className="infotype">계약 종료 날짜</div>
                                <input type = "date" className="set" onChange={handleEnd} />
                                <div className="infotype">계약 기간</div>
                                <input placeholder=" 개월 수" className="set" onChange={handlePeriod} />
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
                            <Button style = {{backgroundColor: '#5B6A82', color: 'white', border: 'none', marginTop: '5px'}} onClick = {goToItem}>돌아가기</Button>
                            <Button className="green" style = {{color: 'white', border: 'none', marginTop: '5px'}} onClick = {onContract}>거래 요청하기</Button>
                        </div>
                    </Col>
            </Row>
        </Container>
    )
};
export default MakeContract;