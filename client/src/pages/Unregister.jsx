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
        <Modal show = {show} onHide={handleClose} style={{width: '100%', height: '70%'}}>
            <Modal.Header closeButton>
                <div className = "logo"><Logo /></div>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit ={unregisterUser}>
                    <Row style={{
                        height: "100vh",
                        justifyContent: "Center",
                        paddingTop: "10%"
                    }}>
                        <Col xs={6}>
                            <Stack gap={3}>
                                <h4 style={{marginBottom: "30px"}}>Do you want to delete your account?</h4>
                                <Button style = {{backgroundColor: '#00462a', color: 'white', border: 'none'}} type="submit">{isDeleteLoading? "Deleting you in ... " : "Delete my account"}</Button>
                                <Button className = "no" style = {{backgroundColor: '#00462a', color: 'white', border: 'none'}} onClick={handleClose}>Cancel</Button>
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