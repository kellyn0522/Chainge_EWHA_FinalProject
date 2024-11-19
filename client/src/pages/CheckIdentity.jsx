import {useEffect, useState, useContext} from "react";
import Logo from "../component/Logo";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container, Stack, Form } from "react-bootstrap";


const CheckIdentity = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { 
        user
    } = useContext(AuthContext);
    const [checked, setChecked] = useState(false);
    
    if (!user){
        return <div>잘못된 접근입니다.</div>
    }

    const updateCheck = () => {
        setChecked(true);
    }

    const makeContract = () => {
        navigate(`/makeContract/${id}`);
    }

    const goToItem = () => {
        navigate(`/item/${id}`);
    }

    return (<>
        <div>
            <div className = "logo"><Logo /></div>
            <Form>
                <Row style={{
                    height: "100%",
                    justifyContent: "Center",
                    paddingTop: "10px",
                    paddingBottom:"10%"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2 style={{marginBottom: '70px'}}>본인 인증</h2>
  
                            <Form.Control 
                                type="text" 
                                placeholder={user.name} 
                                disabled 
                            />
                            <Form.Control 
                                type="email" 
                                placeholder={user.email} 
                                disabled 
                            />
                            <Form.Control
                                type="tel"
                                placeholder="Phone Number"
                                maxLength="13"
                            />
                            <div style = {{display:'flex', gap:'10px'}}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="생년월일" 
                                    maxLength="6"
                                />
                                <div>-</div>
                                <Form.Control 
                                    type="password" 
                                    placeholder="주민등록번호" 
                                    maxLength="7"
                                />
                            </div>
                            <div style = {{display:'flex', gap:'10px'}}>
                                <Form.Control
                                type="tel"
                                placeholder="Phone Number"
                                maxLength="13"
                                />
                                <Button className = 'lightBlue' style = {{color: 'white', border: 'none', width : '140px'}} onClick = {updateCheck}>인증</Button>
                            </div>
                            <div className='contractButton' style={{marginTop: '70px'}}>
                                <Button style = {{backgroundColor: '#5B6A82', color: 'white', border: 'none', marginTop: '5px', width: '110px'}} onClick = {goToItem}>뒤로가기</Button>
                                <Button style = {{color: 'white', border: 'none', backgroundColor: checked?'#002D72':'#5B6A82', width: '110px'}} disabled = {!checked} onClick = {makeContract}>다음</Button>
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    </>);
};
export default CheckIdentity;