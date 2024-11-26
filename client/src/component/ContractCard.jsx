import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Card,Badge } from "react-bootstrap";
import { ReqContext } from "../context/ReqContext";

const ContractCard = ({itemId, reqID}) => { // {contractID}
    const [item, setItem] = useState(null);
    const navigate = useNavigate();
    if (!itemId || !reqID){
        return null;
    }
    const { 
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const { user } = useContext(AuthContext);
    const [reqInfo, setReqInfo] = useState(null);
    const{findingReq} = useContext(ReqContext);

    useEffect(() =>{
        const fetchReq = async () => {
            console.log(reqID);
            try{
                const result = await findingReq(reqID);
                setReqInfo(result);
            }catch{
                return null;
            }
        }
        fetchReq();
    }, [reqID]);
    console.log(reqInfo);

    useEffect(() => {
        const fetchItem = async () => {
            if (!findItemError && !isFindItemLoading){
                const result = await findItem(itemId);
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

        
    const onContractPage = async()=>{
        if(user._id === item.ownerId){
            navigate(`/ContractPage/${reqInfo.senderId}/${reqInfo._id}/${true}`);
        }else{
        navigate(`/ContractPage/${reqInfo.ownerId}/${reqInfo._id}/${false}`);
        }
    };

    return (
        <Card className = "noto-sans-kr" style = {{marginTop:"10px", marginBottom:"10px", width: '270px'}}  onClick ={onContractPage}>
            <div style = {{display:'flex', alignItems: 'center'}}>
                <Card.Title className = 'infoTitle' >{item.houseAddress}</Card.Title>
                <Badge className = "bg-secondary" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-20</Badge>
            </div>
            <Card.Body style = {{display: "grid", gridTemplateColumns: "1fr 0.7fr", gap:'3px'}}>
                <div className = 'infotype' style = {{fontSize: '13px'}}> 임대 시작일</div>
                <div className = 'infoName'>{timeStart}</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>임대 종료일</div>
                <div className = 'infoName'>{timeEnd}</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>임대 기간</div>
                <div className = 'infoName'>{reqInfo.period} 개월</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>월세 금액</div>
                <div className = 'infoName'>{item.housePrice} 만원/월</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>다음 월세 이체 날짜</div>
                <div className = 'infoName'>2024.11.27</div>
            </Card.Body>
        </Card>
    )
};

export default ContractCard;