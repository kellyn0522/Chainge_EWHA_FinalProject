import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";


const Login = () => {
    const {
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
    } = useContext(AuthContext);

    return (<>
        <Form onSubmit ={loginUser}>
            <Row style={{
                height: "100vh",
                justifyContent: "Center",
                paddingTop: "10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <div className = "logo"><Logo /></div>
                        <h2 className="gugi-regular">Login</h2>

                        <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo
                            ({ ...loginInfo, email: e.target.value })} />
                        <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo
                            ({ ...loginInfo, password: e.target.value })}/>

                        <Button className="gugi-regular green" type="submit" >
                            {isLoginLoading? "Getting you in ... " : "Login"}
                        </Button>
                        {loginError?.error && 
                        <Alert variant="danger">
                            <p>{loginError?.message}</p></Alert>} 
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>);
};

export default Login;