import { Modal, Badge, Card } from "react-bootstrap";
import house from '../icons/house.svg';

const UserHistory = ({show,handleClose, nickName}) => {

    return (<>
        <Modal show = {show} onHide={handleClose} className = 'modalSize'>
            <Modal.Header closeButton className = "noto-sans-kr">
                <div>{nickName}</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <div>
                    <div style = {{display: "flex", alignItems: 'center', textAlign: 'center', marginBottom:'17px',marginLeft:'9px'}}>
                        <img src={house} alt='house_pic' width = '25px' height = 'auto'/>
                        <div
                            className="skyblueFont"
                            style={{
                                fontSize:'17px', 
                                display:'flex', 
                                alignItems:'center', 
                                textAlign:'center',
                                marginLeft:'9px'
                            }}>임대 기록</div>
                    </div>
                    <div className="historyInfo">
                        <div className="historyText blueFont">임차인 ID</div>
                        <div className="historyText blueFont">거래 ID</div>
                        <div className="historyText blueFont">임대 기간</div>
                        <div className="historyText">Alice</div>
                        <div className="historyText">거래 ID</div>
                        <div className="historyText">2022.11.7 ~ 2023.11.6 (거래 종료)</div>
                        <div className="historyText">Dan</div>
                        <div className="historyText">거래 ID</div>
                        <div className="historyText">2023.12.3 ~ 2024.12.2 (거래 종료)</div>
                    </div>
                </div>
                <div>
                    <div style = {{display: "flex", alignItems: 'center', textAlign: 'center', marginBottom:'17px',marginLeft:'9px', marginTop:'20px'}}>
                        <img src={house} alt='house_pic' width = '25px' height = 'auto'/>
                        <div
                            className="skyblueFont"
                            style={{
                                fontSize:'17px', 
                                display:'flex', 
                                alignItems:'center', 
                                textAlign:'center',
                                marginLeft:'9px'
                            }}>임차 기록</div>
                        </div>
                    <div className='historyText'>기록이 존재하지 않습니다.</div>
                </div>
            </Modal.Body>
        </Modal>
    </>);
};

export default UserHistory;