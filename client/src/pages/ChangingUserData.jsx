import { useNavigate } from "react-router-dom";
import {useRef, useState, useContext} from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";


const ChangingUserData = () => {
    
    const whoLogIn = { // 데이터 연결필요
        name: "송태섭",
        id: "ijkl",
        passWord: "1234",
        keyId: 10000003,
        telNum:111,
        birth:111113,
        identityNum:3333333,
        zipCode: 33333, 
        email: undefined,
        ownItem: [1],
        likedItemId: [2,3],
        contracts: [2]
      };

      const { 
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
                            placeholder="이름" 
                            disabled 
                            />
                          <Form.Control 
                            type="email" 
                            placeholder="Email" 
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
                              placeholder="Nickname"
                              onChange={(e) =>
                                updateUpdaterInfo({ ...updaterInfo, nickName: e.target.value })
                              }
                          />
                           <Form.Control
                              type="tel"
                              placeholder="Phonenumber"
                              onChange={(e) =>
                                updateUpdaterInfo({ ...updaterInfo, phoneNumber: e.target.value })
                              }
                          />
                          <Form.Control 
                            type="text" 
                            placeholder="Birth" 
                            disabled 
                            />
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
                                placeholder="houseAddres" 
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