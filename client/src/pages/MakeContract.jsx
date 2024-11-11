import {useEffect, useState, useContext} from "react";
import Logo from "../component/Logo";
import { useNavigate, useParams } from "react-router-dom";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container, Stack } from "react-bootstrap";


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
   
    /*
    const onMakeContract = () => {
        if (!cost) {costRef.current.focus(); return;
        } else if (!deposit) {depositRef.current.focus(); return;
        } else if (!startDate) {startDateRef.current.focus(); return;
        } else if (!period) {periodRef.current.focus(); return;
        } else if (!endDate) {endDateRef.current.focus(); return;
        } else {
            navigate("/");
            return [
                {userName, zipCode, birth, identityNum, telNum},
                {location, detailAdd, ownerID, area, type, memo},// bedSize, hasItems},
                {cost, deposit, startDate, period, endDate}
            ];
        };
    };
    */

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
                        <Card className = "information" style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">임차인 정보 확인</Card.Title>
                            <Card.Body className = "info">
                                <div className="infotype">이름</div>
                                <div className = "infoName">황유저</div>
                                <div className="infotype">우편번호</div>
                                <div className = "infoName">55555</div>
                                <div className ="infotype">주민등록번호</div>
                                <div className = "infoName">222222-*******</div>
                                <div className="infotype">전화번호</div>
                                <div className = "infoName">01999999999</div>
                            </Card.Body>
                        </Card>
                        <Card style={{marginBottom:"20px"}}>
                            <Card.Title className = "infoTitle">계약 상세</Card.Title>
                            <Card.Body className = "inputCard">
                                <div className="infotype">계약 시작 날짜</div>
                                <input type = "date" className="set" />
                                <div className="infotype">계약 종료 날짜</div>
                                <input type = "date" className="set" />
                                <div className="infotype">계약 기간</div>
                                <input placeholder=" 개월 수" className="set" />
                            </Card.Body>
                        </Card>
                        <Card className = "information" style={{marginBottom:"10px"}}>
                            <Card.Title className = "infoTitle">매물 정보 확인</Card.Title>
                            <Card.Body className = "info">
                                <div className="infotype">소유주</div>
                                <div className = "infoName">황유저</div>
                                <div className = "infotype">월세</div> 
                                <div className = "infoName">{item.housePrice}</div>
                                <div className = "infotype">보증금</div> 
                                <div className = "infoName">1억 5000만원</div>
                                <div className = "infotype">건물 주소</div> 
                                <div className = "infoName">{item.location}</div>
                                <div className = "infotype">면적(평)</div> 
                                <div className = "infoName">{item.area}평</div>
                                <div className = "infotype">전용/계약면적</div>
                                <div className = "infoName">전용/계약면적</div>
                                <div className = "infotype">건물 이름</div> 
                                <div className = "infoName">{item.houseAddress}</div>
                                <div className = "infotype">방 종류</div> 
                                <div className = "infoName">{item.type}</div>
                                <div className = "infotype">해당층/건물층</div>
                                <div className = "infoName">25층/50층</div>
                                <div className = "infotype">복층 여부</div>
                                <div className = "infoName">단층</div>  
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
                                <div className = "infotype">건축물 용도</div>
                                <div className = "infoName">상가</div>
                            </Card.Body>
                        </Card>
                        <div className='contractButton'>
                            <Button style = {{backgroundColor: '#5B6A82', color: 'white', border: 'none', marginTop: '5px'}} onClick = {goToItem}>뒤로가기</Button>
                            <Button className="green" style = {{color: 'white', border: 'none', marginTop: '5px'}}>거래 시작</Button>
                        </div>
                    </Col>
            </Row>
        </Container>
    )
};
export default MakeContract;