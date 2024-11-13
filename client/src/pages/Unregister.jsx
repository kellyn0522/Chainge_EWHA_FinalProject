import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";

const Unregister = ({show,handleClose}) => {
    const {
        unregisterUser,
        deleteError,
        isDeleteLoading,
        user,
    } = useContext(AuthContext);


    return (<>
        <Modal show = {show} onHide={handleClose} className = 'unregisterModel'>
            <Modal.Header closeButton className = "noto-sans-kr">
                <div>회원탈퇴</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <Form onSubmit ={unregisterUser}>
                    <Row style={{
                        height: "500px",
                        justifyContent: "Center",
                        paddingTop: "10%"
                    }}>
                        <Col xs={6} style = {{height: "400px"}}>
                            <Stack gap={3}>
                                <h4 style={{marginBottom: "30px"}}>탈퇴하시겠습니까?</h4>
                                <div style = {{ display:'flex', justifyContent:'center', gap: '100px'}}>
                                    <Button  className = 'green' style = {{color: 'white', border: 'none'}} type="submit">{isDeleteLoading? "Deleting you in ... " : "탈퇴"}</Button>
                                    <Button className = "no green" style = {{color: 'white', border: 'none'}} onClick={handleClose}>취소</Button>
                                </div>
                                {deleteError?.error && 
                                <Alert variant="danger">
                                    <p>{deleteError?.message}</p></Alert>} 
                            </Stack>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    </>);
};

export default Unregister;