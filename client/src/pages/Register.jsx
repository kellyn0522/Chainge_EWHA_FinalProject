import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";

// 사용자 등록
const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
    return (<>
        <Form onSubmit={registerUser}>
            <Row style={{
                height: "100vh",
                justifyContent: "Center",
                paddingTop: "10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <div className = "logo"><Logo /></div>
                        <h2>Register</h2>

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
                    
                        <Button variant="primary" type="submit" >
                            { isRegisterLoading? "Creating your account":"Register"}
                        </Button>
                        {
                            registerError?.error && <Alert variant="danger">
                            <p>{registerError?.message}</p></Alert>
                        }
                        
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>);
};

export default Register;