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

    const s = info?.start? info.start:null;
    const timeStart = s instanceof Date
        ? s.toISOString().split('T')[0]
        : (typeof s === 'string' && !isNaN(new Date(s).getTime()))
        ? new Date(s).toISOString().split('T')[0]
        : '';
        
    const e = info?.end? info.end:null;
    const timeEnd = e instanceof Date
        ? e.toISOString().split('T')[0]
        : (typeof e === 'string' && !isNaN(new Date(e).getTime()))
        ? new Date(e).toISOString().split('T')[0]
        : '';

    return (
        <Card className = "noto-sans-kr" style = {{marginTop:"10px", marginBottom:"10px", width: '270px'}}>
            <div style = {{display:'flex', alignItems: 'center'}}>
                <Card.Title className = 'infoTitle'>{item.houseAddress}</Card.Title>
                <Badge className = "bg-secondary" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-20</Badge>
            </div>
            <Card.Body style = {{display: "grid", gridTemplateColumns: "1fr 0.7fr", gap:'10px'}}>
                <div className = 'infotype' style = {{fontSize: '13px'}}> 임대 시작일</div>
                <div className = 'infoName'>{timeStart}</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>임대 종료일</div>
                <div className = 'infoName'>{timeEnd}</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>임대 기간</div>
                <div className = 'infoName'>{info.period} 개월</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>월세 금액</div>
                <div className = 'infoName'>{item.housePrice} 만원/월</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>다음 월세 이체 날짜</div>
                <div className = 'infoName'>2024.11.27</div>
            </Card.Body>
        </Card>
    )
};

export default ContractCard;