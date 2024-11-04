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
        <Modal show = {show} onHide={handleClose}>
            <Modal.Header closeButton>
                <div className = "logo"><Logo /></div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <Form onSubmit ={unregisterUser}>
                    <Row style={{
                        height: "500px",
                        justifyContent: "Center",
                        paddingTop: "10%"
                    }}>
                        <Col xs={9} style = {{height: "400px"}}>
                            <Stack gap={3}>
                                <h4 style={{marginBottom: "30px"}}>Do you want to delete your account?</h4>
                                <Button  className = 'green' style = {{color: 'white', border: 'none'}} type="submit">{isDeleteLoading? "Deleting you in ... " : "Delete my account"}</Button>
                                <Button className = "no green" style = {{color: 'white', border: 'none'}} onClick={handleClose}>Cancel</Button>
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