import { Modal, Card } from "react-bootstrap";
import { ReqContext } from "../context/ReqContext";
import {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

const SendContractReq = ({show ,handleClose}) => {
    const { getUserSendReq} = useContext(ReqContext);
    const [sendReq, setSendReq] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReq = async () => {
            const allReqs = await getUserSendReq();
            if (Array.isArray(allReqs)){
                setSendReq(allReqs);
            } else {
                console.error('Failed to fetch Sended Request.');
            }
        };
        fetchReq();
    }, []);

    useEffect(() => {
        console.log('Received Requwsts' ,sendReq );
    }, [sendReq])

    
    const goToReq = (ownerId, id) => {
        navigate(`/reqPage/${ownerId}/${id}/${false}`);
    }

    return( 
        <Modal show = {show} onHide={handleClose} style = {{minHeight: '50vh', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem'}}>
            <Modal.Header closeButton>
                <div className = "noto-sans-kr"> 보낸 거래 요청</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <div>
                {sendReq?.map((s) => (
                    <Card style = {{display: 'flex', justifyContent: 'center', padding: '1rem', gap: '7px'}} onClick={() => goToReq(s.ownerId, s._id)}>
                        <strong>ID: {s.ownerId} 님에게 거래 요청을 보냈습니다.</strong>
                        <p style={{marginBottom: '0'}}>거래 요청 한 매물: {s.itemId}</p>
                    </Card>
                ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SendContractReq;