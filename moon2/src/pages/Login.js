import UserInput from "../component/UserInput";
import {useNavigate} from "react-router-dom";
import React, {useRef, useState, useContext} from "react";
// import "./Login.css";
import {isLoginContext, userDataContext, setLoginContext} from "../App";
import Logo from "../component/Logo";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export const inputContext = React.createContext();
export const inputRefContext = React.createContext();

/*
const Login = () => { // 로그인
    const [inputID, setID] = useState(""); // 입력받은 아이디를 저장하는 변수
    const [inputPW, setPW] = useState(""); // 입력받은 비밀번호를 저장하는 변수
    const navigate = useNavigate();
    const userData = useContext(userDataContext); // 저장된 user data
    const isLogin = useContext(isLoginContext);
    const {setIsLogin} = useContext(setLoginContext); // 로그인으로 상태 변경하는 함수
    const inputIDRef = useRef();
    const inputPWRef = useRef();
    let pw = null; // 사용자 정보를 저장할 변수

    const onClickFindID = () => { // 아이디 찾기 버튼을 누른 경우
        navigate("/findId"); // Find ID 페이지로 이동
    }

    const onClickFindPW = () => { // 비밀번호 찾기 버튼을 누른 경우
        navigate("/findPW"); // Find Passwoed 페이지로 이동
    }

    function onClickButton() { // 로그인 버튼을 누른 경우 실행
        if (!inputID) { inputIDRef.current.focus(); return; // 입력이 없으면 하이라이트
        } else if (!inputPW) {inputPWRef.current.focus(); return;
        } else{
        pw = userData.find((item) => String(item.id) === String(inputID)); // 입력받은 ID를 가진 사용자의 저장된 정보
        if(String(inputPW) === String(pw.passWord)){ // 저장된 비밀번호와 입력받은 비밀번호가 같은 경우
            alert("로그인 되었습니다.");
            setIsLogin(pw.keyId); // 로그인 상태로 변경
            navigate("/"); // 홈으로 이동
            } else{ // 저장된 비밀번호와 입력받은 비밀번호가 같지 않은 경우
            alert("아이디/비밀번호가 일치하지 않습니다.");
            return;
            }
        }   
    }

    return (
        <inputContext.Provider value={{inputID, inputPW, setID, setPW}}>
            <inputRefContext.Provider value={{inputIDRef, inputPWRef}}>
                <div className = "Login">
                    <div className = "logo"><Logo /></div>
                    <div className = "Title">로그인</div>
                    <div className = "LoginWrapper">
                        <UserInput onClickButton = {onClickButton} />
                        <button className = "button" onClick = {onClickButton}>Log In</button>
                    </div>
                    <div className = "Find">
                        <button className = "FindID" onClick = {onClickFindID}>Find ID</button>
                        <button className = "FindPW" onClick = {onClickFindPW}>Find PassWord</button>
                    </div>
                </div>
            </inputRefContext.Provider>
        </inputContext.Provider>
    );
};
*/

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
                        <h2>Login</h2>

                        <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo
                            ({ ...loginInfo, email: e.target.value })} />
                        <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo
                            ({ ...loginInfo, password: e.target.value })}/>

                        <Button variant="primary" type="submit" >
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