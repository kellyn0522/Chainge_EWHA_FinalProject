import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Card,Badge } from "react-bootstrap";


const ContractCard = () => { // {contractID}
         
    return (
        <Card className = "noto-sans-kr" style = {{marginTop:"10px", marginBottom:"30px", width: '300px'}}>
            <div style = {{display:'flex', alignItems: 'center'}}>
                <Card.Title className = 'infoTitle'>반포 자이아파트</Card.Title>
                <Badge className = "bg-secondary" style = {{marginLeft:"15px", marginTop:"12.5px", width: '50px'}}>D-20</Badge>
            </div>
            <Card.Body style = {{display: "grid", gridTemplateColumns: "1fr 1fr", gap:'10px'}}>
                <div className = 'infotype' style = {{fontSize: '13px'}}> 임대 시작일</div>
                <div className = 'infoName'>2024.10.27</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>임대 종료일</div>
                <div className = 'infoName'>2025.10.26</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>임대 기간</div>
                <div className = 'infoName'>12 개월</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>월세 금액</div>
                <div className = 'infoName'>220 만원/월</div>
                <div className = 'infotype' style = {{fontSize: '13px'}}>다음 월세 이체 날짜</div>
                <div className = 'infoName'>2024.11.27</div>
            </Card.Body>
        </Card>
    )
};

export default ContractCard;