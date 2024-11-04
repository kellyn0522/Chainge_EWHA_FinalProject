import { useNavigate } from "react-router-dom";
import {useRef, useState, useContext} from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";


const ChangingUserData = () => {
      const { 
        user,
        updateUpdaterInfo,
        updaterUser,
        updateError,
        isUpdateLoading, 
        } = useContext(AuthContext);

      return (<>
        <div>
            <div className = "logo"><Logo /></div>
            <Form className="noto-sans-kr" onSubmit={updaterUser}>
                <Row style={{
                    height: "100%",
                    justifyContent: "Center",
                    paddingTop: "10px",
                    paddingBottom:"10%"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2 style={{marginBottom: '10px'}}>정보변경</h2>
  
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
                                type="password" 
                                placeholder="Password" 
                                maxLength="50"
                                onChange={(e) =>
                                    updateUpdaterInfo({password: e.target.value })
                                } 
                            />
                            <Form.Control
                                type="text"
                                placeholder={user.nickName || "Nickname"}
                                maxLength="10"
                                onChange={(e) =>
                                    updateUpdaterInfo({nickName: e.target.value })
                                }
                            />
                            <Form.Control
                                type="tel"
                                placeholder={user.phoneNumber || "Phone Number"}
                                maxLength="13"
                                onChange={(e) =>
                                    updateUpdaterInfo({phoneNumber: e.target.value })
                                }
                            />
                            <Form.Control 
                                type="text" 
                                placeholder="생년월일" 
                                maxLength="6"
                                onChange={(e) =>
                                    updateUpdaterInfo({birth: e.target.value })
                                } 
                            />
                            <Form.Control 
                                type="password" 
                                placeholder="주민등록번호" 
                                maxLength="7"
                                onChange={(e) =>
                                    updateUpdaterInfo({identityNum: e.target.value })
                                } 
                            />
                            <Form.Control 
                                type="text" 
                                placeholder="Zipcode" 
                                maxLength="5"
                                onChange={(e) =>
                                    updateUpdaterInfo({zipCode: e.target.value })
                                } 
                            />
                            <Form.Control 
                                type="text" 
                                placeholder="House Address" 
                                maxLength="100"
                                onChange={(e) =>
                                    updateUpdaterInfo({ houseAddres: e.target.value })
                                } 
                            />
                      
                            <Button className = 'green' style = {{color: 'white', border: 'none'}} type="submit" >
                                { isUpdateLoading? "Updating your account":"정보변경"}
                            </Button>
                            {
                                updateError?.error && (
                                    <Alert variant="danger">
                                        <p>{updateError.message|| 'error'}</p>
                                    </Alert>)
                            }
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    </>);
};
export default ChangingUserData;