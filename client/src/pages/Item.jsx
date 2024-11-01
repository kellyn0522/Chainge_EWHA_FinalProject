import { useNavigate, useParams } from "react-router-dom";
//import ContractANDChat from "../component/ContractANDChat";
//import Option from "../component/Option";
import Logo from "../component/Logo";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { Card, Row, Col, Container } from "react-bootstrap";

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

    return (
        <Container>
            <Row>
                <Col>
                    <div className = "logo"><Logo /></div>
                    <img src = {item.imageFile} style = {{width: '300px', height: 'auto', border: '2px solid #ccc', display: ' block', margin: '0 auto'}} />
                    <div>
                        <h5>위치: {item.location}</h5>
                        <h5>{item.houseAddress}</h5>
                        <h5>우편번호: {item.zipCode}</h5>

                        <h5>월세: {item.housePrice}만원</h5>
                        <h5>건물 종류: {item.type}</h5>
                        <h5>크기: {item.area}평</h5>
                        <h5>판매자: {item.ownerName}</h5>

                        <Card>
                            <Card.Title>상세설명</Card.Title>
                            <Card.Body>
                                <Card.Text>{item.memo}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
};
export default Item;
//<Option bedSize={item.bedSize} hasItems={item.hasItems} />
//            <ContractANDChat />