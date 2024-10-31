import { useNavigate, useParams } from "react-router-dom";
//import ContractANDChat from "../component/ContractANDChat";
//import Option from "../component/Option";
import Logo from "../component/Logo";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { Card } from "react-bootstrap";

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
        <Card>
            <div className = "logo"><Logo /></div>
            <Card.Img variant = 'top' src = {item.imageFile} />
            <Card.Body>
                <Card.Text>위치: {item.location}</Card.Text>
                <Card.Text>{item.houseAddress}</Card.Text>
                <Card.Text>우편번호: {item.zipCode}</Card.Text>

                <Card.Text>월세: {item.housePrice}만원</Card.Text>
                <Card.Text>건물 종류: {item.type}</Card.Text>
                <Card.Text>크기: {item.area}평</Card.Text>
                <Card.Text>판매자: {item.ownerName}</Card.Text>

                <Card.Text>상세설명</Card.Text>
                <Card.Text>*** {item.memo} ***</Card.Text>
            </Card.Body>
        </Card>
    )
};
export default Item;
//<Option bedSize={item.bedSize} hasItems={item.hasItems} />
//            <ContractANDChat />