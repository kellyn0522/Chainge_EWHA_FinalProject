import UserInput from "../component/UserInput";
import {useNavigate} from "react-router-dom";
import React, {useRef, useState, useContext} from "react";
// import "./Login.css";
import {userDataContext, setLoginContext, isLoginContext} from "../App";
// import Logo from "../component/Logo";

import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export const inputContext = React.createContext();
export const inputRefContext = React.createContext();

const Login = () => {

    const {loginUser, updateLoginInfo, loginInfo, isLoginLoading, loginError} = useContext(AuthContext);

    /*
    const [inputID, setID] = useState("");
    const [inputPW, setPW] = useState("");
    const navigate = useNavigate();
    const userData = useContext(userDataContext);
    // const isLogin = useContext(isLoginContext);
    const {setIsLogin} = useContext(setLoginContext);
    const inputIDRef = useRef();
    const inputPWRef = useRef();
    let pw = null;

    const onClickFindID = () => {
        navigate("/findId");
    }

    const onClickFindPW = () => {
        navigate("/findPW");
    }

    function onClickButton() {
        if (!inputID) { inputIDRef.current.focus(); return;
        } else if (!inputPW) {inputPWRef.current.focus(); return;
        } else{
        pw = userData.find((item) => String(item.id) === String(inputID));
        if(String(inputPW) === String(pw.passWord)){
            alert("로그인 되었습니다.");
            setIsLogin(pw.keyId);
            navigate("/");
            } else{
            alert("아이디/비밀번호가 일치하지 않습니다.");
            return;
            }
        }   
    }
    */

    return (
        // <inputContext.Provider value={{inputID, inputPW, setID, setPW}}>
            // <inputRefContext.Provider value={{inputIDRef, inputPWRef}}>
        <>
            <Form onSubmit = { loginUser }>
                <Row style={{
                    height: "100vh",
                    justifyContent: "Center",
                    paddingTop: "10%"
                }}
            >
                    <Col xs={6}>
                        <Stack gap={3}>
                            
                                <h2>Login</h2>
                                    <Form.Control type="email" placeholder="email" onChange={(e) => updateLoginInfo ({ ...loginInfo, email: e.target.value})} />
                                    <Form.Control type="password" placeholder="password" onChange={(e) => updateLoginInfo ({ ...loginInfo, password: e.target.value})} />
                                    
                                    <Button variant="primary" type="submit">
                                        {isLoginLoading? "Getting you in ... " : "Login" }
                                    </Button>


                                    {loginError?.error && 
                                        <Alert variant="danger"> 
                                            <p>
                                                {loginError?.message}
                                            </p>
                                        </Alert>
                                    }
                            
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
            // </inputRefContext.Provider>
        // </inputContext.Provider>
    );
};
export default Login;