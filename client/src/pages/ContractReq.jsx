import { Modal, Card } from "react-bootstrap";
import { ReqContext } from "../context/ReqContext";
import {useEffect, useState, useContext} from "react";

const ContractReq = ({show ,handleClose}) => {
    const {getUserReceiveReq} = useContext(ReqContext);
    useEffect(() => {
        const fetchItems = async () => {
            const allItems = await getItem();
            if (Array.isArray(allItems)){
                setItems(allItems);
            } else {
                console.error('Failed to fetch items.');
            }
        };
        fetchItems();
    }, [getItem]);

    const notifications = [{
        id:'ㅇㅇㅇㅇㅇ',
        senderId:'ㅇㅇㅇㅇ',
        message:'ㅇㅇㅇㅇㅇ',
        isRead: true
    }, {
        id:'ㅁㅁㅁㅁㅁ',
        senderId:'ㅁㅁㅁㅁㅁㅁ',
        message:'ㅁㅁㅁㅁㅁ',
        isRead: true
    }]
    return( 
        <Modal show = {show} onHide={handleClose} style = {{minHeight: '50vh', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem'}}>
            <Modal.Header closeButton>
                <div className = "noto-sans-kr"> 받은 거래 요청</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <div>
                {notifications.map((notification) => (
                    <Card key = {notification.id} style = {{display: 'flex', justifyContent: 'center', padding: '1rem', gap: '7px'}}>
                        <strong>ID: {notification.senderId} 님이 거래 요청을 보냈습니다.</strong>
                        <p style={{marginBottom: '0'}}>거래 요청 한 매물: {notification.message}</p>
                    </Card>
                ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ContractReq;