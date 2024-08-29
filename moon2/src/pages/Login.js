import UserInput from "../component/UserInput";
import {useNavigate} from "react-router-dom";
import React, {useRef, useContext} from "react";
// import "./Login.css";
import {isLoginContext, userDataContext, setLoginContext} from "../App";
// import Logo from "../component/Logo";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export const inputContext = React.createContext();
export const inputRefContext = React.createContext();

const Login = () => {
    const {
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
    } = useContext(AuthContext);

    const navigate = useNavigate();
    const inputIDRef = useRef();
    const inputPWRef = useRef();

    function handleLogin(event) {
        event.preventDefault();
        if (!loginInfo.email) {
            inputIDRef.current.focus();
            return;
        } else if (!loginInfo.password) {
            inputPWRef.current.focus();
            return;
        }
        loginUser(); // AuthContext에서 제공하는 loginUser 함수 호출
    }

    
    return (
        <Form onSubmit={handleLogin}>
            <Row
                style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "10%",
                }}
            >
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Login</h2>

                        <Form.Control
                            type="email"
                            placeholder="Email"
                            ref={inputIDRef}
                            onChange={(e) =>
                                updateLoginInfo({
                                    ...loginInfo,
                                    email: e.target.value,
                                })
                            }
                        />
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={inputPWRef}
                            onChange={(e) =>
                                updateLoginInfo({
                                    ...loginInfo,
                                    password: e.target.value,
                                })
                            }
                        />

                        <Button variant="primary" type="submit">
                            {isLoginLoading ? "Getting you in ..." : "Login"}
                        </Button>
                        {loginError?.error && (
                            <Alert variant="danger">
                                <p>{loginError?.message}</p>
                            </Alert>
                        )}
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
};

export default Login;