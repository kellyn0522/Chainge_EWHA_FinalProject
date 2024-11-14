import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Card,Badge } from "react-bootstrap";

const ContractCard = ({id, info}) => { // {contractID}
    const [item, setItem] = useState(null);
    if (!info || !id){
        return null;
    }
    const { 
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);

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
        return null;
    }
    if (findItemError || !item){
        return null;
    }

    return (
        <Card className = "noto-sans-kr" style = {{marginTop:"10px", marginBottom:"30px", width: '300px'}}>
            <div style = {{display:'flex', alignItems: 'center'}}>
                <Card.Title className = 'infoTitle'>{item.buildingName}</Card.Title>
                <Badge className = "bg-secondary" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-20</Badge>
            </div>
            <Card.Body style = {{display: "grid", gridTemplateColumns: "1fr 1fr", gap:'10px'}}>
                <div className = 'infotype' style = {{fontSize: '13px'}}> 임대 시작일</div>
                <div className = 'infoName'>{info.start}</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>임대 종료일</div>
                <div className = 'infoName'>{info.end}</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>임대 기간</div>
                <div className = 'infoName'>{info.period} 개월</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>월세 금액</div>
                <div className = 'infoName'>{info.price} 만원/월</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>다음 월세 이체 날짜</div>
                <div className = 'infoName'>2024.11.27</div>
            </Card.Body>
        </Card>
    )
};

export default ContractCard;