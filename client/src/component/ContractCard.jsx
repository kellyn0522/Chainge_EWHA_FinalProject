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
    const [d_Day, setD_Day] = useState(20);

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

    useEffect(() => {
        const today = new Date();

        if(reqInfo && reqInfo.start && reqInfo.end){
            const reqStart = new Date(reqInfo.start);
            const reqEnd = new Date(reqInfo.end);
            const dayDifference = Math.floor((reqEnd-today)/1000*60*60*24);
            if(dayDifference < 0){
                setD_Day(-1);
            }else{
                const rest = today.getDate() - reqStart.getDate();
                if (rest >= 0){
                    setD_Day(rest);
                }else{
                    setD_Day(rest+30);
                }
            }
        console.log(d_Day, today.getDate(), new Date(reqInfo.start).getDate())
        }
    },[reqInfo])


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
            <div style = {{display:'flex', alignItems: 'center', width: '240px', marginLeft: '15px', marginRight:'15px', justifyContext: 'space-between'}}>
                <Card.Title style = {{marginTop:'20px', marginLeft:'10px', fontSize: '18px'}} >{item.houseAddress}</Card.Title>
                {d_Day<0&&<Badge className = "bg-secondary" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>거래 종료</Badge>}
                {d_Day===0&&<Badge className = "green" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-Day</Badge>}
                {d_Day>0&&<Badge className = "skyblue" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-{d_Day}</Badge>}
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