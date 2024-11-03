import { useNavigate, useParams } from "react-router-dom";
//import ContractANDChat from "../component/ContractANDChat";
//import Option from "../component/Option";
import Logo from "../component/Logo";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { Card, Row, Col, Container } from "react-bootstrap";
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

const Item = () => {
    //const navigate = useNavigate();
    const {id} = useParams();

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

    return (<>
        <Container>
            <div className = "logo"><Logo /></div>
                <Row className = "noto-sans-kr" style = {{margin:"10px"}}>
                    <Col>
                    <img src = {item.imageFile} style = {{width: '300px', height: 'auto', border: '2px solid #ccc', display: ' block', margin: '0 auto'}} />
                    <div>
                        <h3>월세 1억5000/{item.housePrice}</h3>
                        <div>{item.location} {item.houseAddress}</div>
                        <div>{item.type} / {item.area}평</div>
                        <Card className = "information" style={{marginBottom:"10px"}}>
                            <Card.Title className = "infoTitle">상세 설명</Card.Title>
                            <Card.Body>
                                <Card.Text className="infoText">{item.memo}</Card.Text>
                            </Card.Body>
                        </Card>
                        <div className = "optionCard">
                        <Card>
                            <Card.Title className = "infoTitle">가격 정보</Card.Title>
                            <Card.Body>
                                <div className="infoText">월세 1억 5000/{item.housePrice}</div>
                                <div className="infoText">관리비 없음</div>
                                <div className="infoText">주차 가능</div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Title className = "infoTitle">옵션</Card.Title>
                            <img src={chat} alt='chat' width = '30px' height = '30px' />
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