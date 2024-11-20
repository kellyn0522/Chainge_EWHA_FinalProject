import { useContext, useState,useEffect } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";

// 사용자 등록
const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
    const [realEstateAgent, setRealEstateAgent] = useState(false);

    const handleUserType = () => {
        const newUserType = !realEstateAgent;
        setRealEstateAgent(newUserType);
        updateRegisterInfo({ ...registerInfo, realEstateAgent:newUserType})
    };
    
    return (<>
        <Form onSubmit={registerUser} className = 'noto-sans-kr' >
            <Row style={{
                height: "100vh",
                justifyContent: "Center",
                paddingTop: "10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <div className = "logo"><Logo /></div>
                        <h2 className="gugi-regular">Register</h2>
                        <div style = {{display:'flex'}}>
                            <Button className = {!realEstateAgent? 'green': 'disable'} style={{flex: 1}} onClick={handleUserType}>일반 회원 가입</Button>
                            <Button className = {realEstateAgent? 'green': 'disable'}  style={{flex: 1}} onClick={handleUserType}>중개사 회원 가입</Button>
                        </div>
                        {!realEstateAgent &&(
                        <>
                        <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) =>
                            updateRegisterInfo({ ...registerInfo, email: e.target.value })
                        } />

                        <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) =>
                            updateRegisterInfo({ ...registerInfo, password: e.target.value })
                        } />
                        
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, name: e.target.value })
                            }
                        />
                        <Form.Control
                            type="text"
                            placeholder="Nickname"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, nickName: e.target.value })
                            }
                        />
                         <Form.Control
                            type="tel"
                            placeholder="Phonenumber"
                            maxLength="11"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, phoneNumber: e.target.value })
                            }
                        />
                    
                        <Button className="gugi-regular green" type="submit" >
                            { isRegisterLoading? "Creating your account":"Register"}
                        </Button>
                        {
                            registerError?.error && <Alert variant="danger">
                            <p>{registerError?.message}</p></Alert>
                        }
                        </>
                    )}
                    {realEstateAgent &&(
                        <>
                        <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) =>
                            updateRegisterInfo({ ...registerInfo, email: e.target.value })
                        } />

                        <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) =>
                            updateRegisterInfo({ ...registerInfo, password: e.target.value })
                        } />
                        
                        <div style = {{display:'flex', gap:'10px'}}>
                            <Form.Control 
                                type="realEstateAgentNum" 
                                placeholder="중개사 등록 번호" 
                            />
                            <Button className = 'green' style = {{width : '140px'}}>인증하기</Button>
                        </div>

                        <Form.Control
                            type="text"
                            placeholder="Name"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, name: e.target.value })
                            }
                        />
                        <Form.Control
                            type="text"
                            placeholder="Nickname"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, nickName: e.target.value })
                            }
                        />
                         <Form.Control
                            type="tel"
                            placeholder="Phonenumber"
                            maxLength="11"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, phoneNumber: e.target.value })
                            }
                        />
                    
                        <Button className="gugi-regular green" type="submit" >
                            { isRegisterLoading? "Creating your account":"Register"}
                        </Button>
                        {
                            registerError?.error && <Alert variant="danger">
                            <p>{registerError?.message}</p></Alert>
                        }
                        </>
                    )}
                        
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>);
};

export default Register;