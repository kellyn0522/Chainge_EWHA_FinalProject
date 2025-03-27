import { Modal, Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

const LinkingAccount = ({show ,handleClose}) => {
    const { user, accountUpdater } = useContext(AuthContext);
    const [input, setInput] = useState(null);

    const onLinking = async ()=>{
        console.log('계좌',input);

        await accountUpdater(user._id, input);
        alert('연결되었습니다.');
        handleClose();
    };

    return( 
        <Modal show = {show} onHide={handleClose} style = {{minHeight: '50vh', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem'}}>
            <Modal.Header closeButton>
                <div className = "noto-sans-kr"> 계좌 연결</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                {user?.account&&(
                    <div style ={{margin: '15px', marginBottom:'20px', gap:'20px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center'}}>
                        <div>현재 연결된 계좌: </div>
                        <div>{user.account}</div>
                    </div>
                )}
                <Form className = 'formControl2'>
                    <Form.Label style={{marginBottom:'0px'}}>계좌번호</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e) => setInput(e.target.value)}
                        />
                    <Button className = 'green' style = {{color: 'white', border: 'none', width:'100px'}} onClick={onLinking} >
                        { user?.account? "변경":"연결"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LinkingAccount;