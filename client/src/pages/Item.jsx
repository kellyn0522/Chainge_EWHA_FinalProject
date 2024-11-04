import { useNavigate, useParams } from "react-router-dom";
//import ContractANDChat from "../component/ContractANDChat";
//import Option from "../component/Option";
import Logo from "../component/Logo";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import ac from '../icons/ac_unit.svg';
import bed from '../icons/bed.svg';
import blind from '../icons/blinds.svg';
import chair from '../icons/chair.svg';
import chat from '../icons/chat.svg';
import dresser from '../icons/dresser.svg';
import king_bed from '../icons/king_bed.svg';
import refridge from '../icons/kitchen.svg';
import micro from '../icons/microwave.svg';
import single_bed from '../icons/single_bed.svg';
import tv from '../icons/tv.svg';
import weekend from '../icons/weekend_24.svg';
import house from '../icons/house.svg';

const Item = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [liked, setLiked] = useState(false);

    //const onHistory = () => {
    //    navigate("/userHistory");
    //}
    const { 
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const [item, setItem] = useState(null)

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

    const handleLike = () => {
        setLiked(prevLiked => !prevLiked);
    };
    const onClickChat = () => {
        navigate("/chat");
    }
    const makeContract = () => {
        navigate("/");
    }
    //<img src = {item.imageFile} style = {{width: '300px', height: 'auto', border: '2px solid #ccc', display: ' block', margin: '0 auto'}} />
                    
    return (<>
        <Container>
            <div className = "logo"><Logo /></div>
                <Row className = "noto-sans-kr" style = {{margin:"10px"}}>
                    <Col>
                        <div className = 'intro'>
                            <img src={house} alt='house_pic' width = '300px' height = 'auto' style = {{border: '2px solid #ccc', display: ' block', margin: '0 auto'}}/>
                            <div>
                                <div className = 'introInfo' style = {{marginBottom : '10px'}}>  
                                    <h3>월세 1억5000/{item.housePrice}</h3>
                                    <div>{item.location} {item.houseAddress}</div>
                                    <div>{item.type} / {item.area}평</div> 
                                </div>
                                <div style = {{display : 'flex', alignItems: 'center', gap: '20px', marginBottom : '10px'}}>
                                    <span className={`material-symbols-outlined ${liked? 'liked':'dontlike'}`} style={{cursor: "pointer"}} onClick = {handleLike}>favorite</span>
                                    <img src={chat} alt='chat' width = '30px' height = '30px' style = {{cursor: "pointer"}} onClick = {onClickChat} />
                                    <Button className="noto-sans-kr green" style = {{color: 'white', border: 'none'}} onClick = {makeContract}>거래하기</Button>
                                </div>
                                <Card className = "information" style={{marginBottom:"10px"}}>
                                    <Card.Title className = "infoTitle">상세 설명</Card.Title>
                                    <Card.Body>
                                        <Card.Text className="infoText">{item.memo}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div> 
                        </div>
                        <div style = {{marginTop:'20px'}}>
                            <div className = "optionCard">
                            <Card>
                                <Card.Title className = "infoTitle" >가격 정보</Card.Title>
                                <Card.Body>
                                    <div className="infoText">월세 1억 5000/{item.housePrice}</div>
                                    <div className="infoText">관리비 없음</div>
                                    <div className="infoText">주차 가능</div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Title className = 'infoTitle'>옵션</Card.Title>
                                <Card.Body>
                                    <div className = 'combine-container'>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={ac} alt='ac' width = '30px' height = '30px' />
                                        <div>에어컨</div>
                                    </div>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={dresser} alt='dresser' width = '30px' height = '30px' />
                                        <div>옷장</div>
                                    </div>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={tv} alt='tv' width = '30px' height = '30px' />
                                        <div>TV</div>
                                    </div>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={micro} alt='microwave' width = '30px' height = '30px' />
                                        <div>전자레인지</div>
                                    </div>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={refridge} alt='refridgerator' width = '30px' height = '30px' />
                                        <div>냉장고</div>
                                    </div>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={king_bed} alt='king_bed' width = '30px' height = '30px' />
                                        <div>침대(킹)</div>
                                    </div>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={weekend} alt='sofa' width = '30px' height = '30px' />
                                        <div>소파</div>
                                    </div>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={blind} alt='blind' width = '30px' height = '30px' />
                                        <div>블라인드</div>
                                    </div>
                                    <div className = 'combine'>
                                        <img className = 'infoIcon' src={chair} alt='chair' width = '30px' height = '30px' />
                                        <div>의자</div>
                                    </div>
                                    </div>
                                </Card.Body>
                            </Card> 
                            <Card>
                                <Card.Title className = "infoTitle">보안/안전시설</Card.Title>
                            </Card>
                            <Card>
                                <Card.Title className = "infoTitle">위치 및 주변시설</Card.Title>
                            </Card>
                            </div>
                            <Card className = "information" style={{marginBottom:"30px"}}>
                                <Card.Title className = "infoTitle">상세 정보</Card.Title>
                                <Card.Body className = "info">
                                    <div className = "infotype">건물 이름</div> 
                                    <div className = "infoName">{item.houseAddress}</div>
                                    <div className = "infotype">방 종류</div> 
                                    <div className = "infoName">{item.type}</div>
                                    <div className = "infotype">해당층/건물층</div>
                                    <div className = "infoName">25층/50층</div>
                                    <div className = "infotype">복층 여부</div>
                                    <div className = "infoName">단층</div>  
                                    <div className = "infotype">전용/계약면적</div>
                                    <div className = "infoName">전용/계약면적</div>
                                    <div className = "infotype">방 수/욕실 수</div>
                                    <div className = "infoName">2/1</div>
                                    <div className = "infotype">방향</div>
                                    <div className = "infoName">남서향</div>
                                    <div className = "infotype">엘리베이터</div>
                                    <div className = "infoName">없음</div>
                                    <div className = "infotype">반려동물 가능 여부</div>
                                    <div className = "infoName">가능</div>
                                    <div className = "infotype">해당 면적 세대수</div>
                                    <div className = "infoName">50세대</div>
                                    <div className = "infotype">총 세대수</div>
                                    <div className = "infoName">50세대</div>
                                    <div className = "infotype">총 주차대수</div>
                                    <div className = "infoName">30대</div>
                                    <div className = "infotype">현관유형</div>
                                    <div className = "infoName">복도식</div>
                                    <div className = "infotype">입주 가능일</div>
                                    <div className = "infoName">2025.03.01</div>
                                    <div className = "infotype">건축물 용도</div>
                                    <div className = "infoName">상가</div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
        </Container>
    </>)
};
export default Item;
//<Option bedSize={item.bedSize} hasItems={item.hasItems} />
//            <ContractANDChat />