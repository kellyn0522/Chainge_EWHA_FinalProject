import { useNavigate } from "react-router-dom";
import {useRef, useState, useContext} from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";


const ChangingUserData = () => {

      const { 
        user,
        updaterInfo,
        updateUpdaterInfo,
        updaterUser,
        updateError,
        isUpdateLoading, 
        } = useContext(AuthContext);

      return (<>
          <Form onSubmit={updaterUser}>
              <Row style={{
                  height: "100vh",
                  justifyContent: "Center",
                  paddingTop: "10%"
              }}>
                  <Col xs={6}>
                      <Stack gap={3}>
                          <div className = "logo"><Logo /></div>
                          <h2>정보변경</h2>
  
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
                            onChange={(e) =>
                                updateUpdaterInfo({ ...updaterInfo, password: e.target.value })
                            } 
                          />
                          <Form.Control
                              type="text"
                              placeholder={user.nickName}
                              onChange={(e) =>
                                updateUpdaterInfo({ ...updaterInfo, nickName: e.target.value })
                              }
                          />
                           <Form.Control
                              type="tel"
                              placeholder={user.phoneNumber}
                              onChange={(e) =>
                                updateUpdaterInfo({ ...updaterInfo, phoneNumber: e.target.value })
                              }
                          />
                          <Form.Control 
                            type="text" 
                            placeholder="생년월일" 
                            onChange={(e) =>
                                updateUpdaterInfo({ ...updaterInfo, birth: e.target.value })
                            } />
                        <Form.Control 
                            type="password" 
                            placeholder="주민등록번호" 
                            onChange={(e) =>
                                updateUpdaterInfo({ ...updaterInfo, identityNum: e.target.value })
                            } />
                          <Form.Control 
                            type="text" 
                            placeholder="Zipcode" 
                            onChange={(e) =>
                                updateUpdaterInfo({ ...updaterInfo, zipCode: e.target.value })
                            } />
                            <Form.Control 
                                type="text" 
                                placeholder="House Addres" 
                                onChange={(e) =>
                                    updateUpdaterInfo({ ...updaterInfo, houseAddres: e.target.value })
                                } />
                      
                          <Button variant="primary" type="submit" >
                              { isUpdateLoading? "Updating your account":"정보변경"}
                          </Button>
                          {
                              updateError?.error && <Alert variant="danger">
                              <p>{updateError?.message}</p></Alert>
                          }
                          
                      </Stack>
                  </Col>
              </Row>
          </Form>
      </>);
};
export default ChangingUserData;