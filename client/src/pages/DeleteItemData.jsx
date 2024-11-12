import { useContext, useState } from "react";
import { Modal, Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthItemContext } from "../context/AuthItemContext";
import Logo from "../component/Logo";

const DeleteItemData = ({show ,handleClose, itemID}) => {
    const {
        deleteItem,
        deleteItemError,
        isDeleteItemLoading
    } = useContext(AuthItemContext);

    return (<>
        <Modal show = {show} onHide={handleClose}>
            <Modal.Header closeButton>
                <div className = "logo"><Logo /></div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <Form onSubmit ={(e) => deleteItem(e, itemID)}>
                    <Row style={{
                        height: "500px",
                        justifyContent: "Center",
                        paddingTop: "10%"
                    }}>
                        <Col xs={9} style = {{height: "400px"}}>
                            <Stack gap={3}>
                                <h4 style={{marginBottom: "30px"}}>삭제하시겠습니까?</h4>
                                <Button  className = 'green' style = {{color: 'white', border: 'none'}} type="submit">{isDeleteItemLoading? "Deleting you in ... " : "Yes"}</Button>
                                <Button className = "no green" style = {{color: 'white', border: 'none'}} onClick={handleClose}>Cancel</Button>
                                {deleteItemError?.error && 
                                <Alert variant="danger">
                                    <p>{deleteItemError?.message}</p></Alert>} 
                            </Stack>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    </>);
};

export default DeleteItemData;