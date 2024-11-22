import {useEffect, useState, useContext, createContext} from "react";
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
    const [account, setAccount] = useState(false);

    const [userInfo, setUserInfo] = useState({
        tenantID: user._id,
        tenantphoneNum: user.phoneNumber || '',
        tenantBirth:user.birth || '',
        tenantidentityNum: user.identityNum || '',
        metamaskAdd: '',
    });
    
    if (!user){
        return <div>잘못된 접근입니다.</div>
    }

    const updateCheck = () => {
        setChecked(true);
    }

    const updateAccount = () => {
        setAccount(true);
    }
    
    const reqContract = () => {
        navigate(`/reqContract/${id}`, {state: {userInfo}});
    }

    const goToItem = () => {
        navigate(`/item/${id}`);
    }

    return (<>
        <div>
            <div className = "logo"><Logo /></div>
            <Form className = 'noto-sans-kr'>
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
                            <div style = {{display:'flex', gap:'10px'}}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="생년월일" 
                                    maxLength="6"
                                    onChange={(e) => setUserInfo
                                        ({ ...userInfo, tenantBirth: e.target.value })}
                                />
                                <div>-</div>
                                <Form.Control 
                                    type="password" 
                                    placeholder="주민등록번호" 
                                    maxLength="7"
                                    onChange={(e) => setUserInfo
                                        ({ ...userInfo, tenantidentityNum: e.target.value })}
                                />
                            </div>
                            <div style = {{display:'flex', gap:'10px'}}>
                                <Form.Control
                                type="tel"
                                placeholder="Phone Number"
                                maxLength="13"
                                onChange={(e) => setUserInfo
                                    ({ ...userInfo, tenantphoneNum: e.target.value })}
                                />
                                <Button className = {checked?'green':'lightBlue'} style = {{color: 'white', border: 'none', width : '140px'}} onClick = {updateCheck}>{!checked?'인증':'인증 완료'}</Button>
                            </div>
                            <div style = {{display:'flex', alignItems: 'center', gap: '30px'}}>
                                <Button className = {account?'green':'lightBlue'} style = {{color: 'white', border: 'none', width : '140px'}} onClick = {updateAccount}>계좌 연결</Button>
                                {!account? (<div>계좌 연결이 필요합니다. </div>): <div>계좌 연결이 완료되었습니다. </div>}
                            </div>
                            <Form.Control 
                                    type="text" 
                                    placeholder="메타마스크 주소" 
                                    maxLength="42"
                                    onChange={(e) => setUserInfo
                                        ({ ...userInfo, metamaskAdd: e.target.value })}
                            />
                            <div className='contractButton' style={{marginTop: '70px'}}>
                                <Button style = {{backgroundColor: '#5B6A82', color: 'white', border: 'none', marginTop: '5px', width: '110px'}} onClick = {goToItem}>뒤로가기</Button>
                                <Button style = {{color: 'white', border: 'none', backgroundColor: '#002D72', width: '110px', opacity: checked&&account? 1: 0.6}} disabled = {!checked||!account} onClick = {reqContract}>다음</Button>
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    </>);
};
export default CheckIdentity;