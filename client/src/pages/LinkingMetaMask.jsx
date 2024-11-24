import { Modal, Form, Button} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

const LinkingMetaMask = ({show ,handleClose}) => {
    const { user, metaMaskUpdater } = useContext(AuthContext);
    const [input, setInput] = useState(null);

    const onLinking = async ()=>{
        console.log('계좌',input);

        await metaMaskUpdater(user._id, input);
        alert('등록되었습니다.');
        handleClose();
    };

    return( 
        <Modal show = {show} onHide={handleClose} style = {{minHeight: '50vh', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem'}}>
            <Modal.Header closeButton>
                <div className = "noto-sans-kr"> 이더리움 주소 등록</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                {user?.metaMaskAdd&&(
                    <div style ={{margin: '15px', marginBottom:'20px', gap:'20px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center'}}>
                        <div>현재 등록된 이더리움 주소: </div>
                        <div>{user.metaMaskAdd}</div>
                    </div>
                )}
                <Form className = 'formControl2'>
                    <Form.Label>이더리움 주소</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => setInput( e.target.value )}
                        />
                    <Button className = 'green' style = {{color: 'white', border: 'none', width:'100px'}} onClick={onLinking} >
                        { user?.metaMaskAdd? "변경":"등록"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LinkingMetaMask;