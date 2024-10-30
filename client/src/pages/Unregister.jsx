import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";

const Unregister = () => {
    const {
        unregisterUser,
        deleteError,
        isDeleteLoading,
        user,
    } = useContext(AuthContext);
    const navigate = useNavigate();

    const onClickCancel = () => {
        navigate("/mypage");
    }

    return (<>
        <Form onSubmit ={unregisterUser}>
            <Row style={{
                height: "100vh",
                justifyContent: "Center",
                paddingTop: "10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <div className = "logo"><Logo /></div>
                        <h2>탈퇴하시겠습니까?</h2>
                        <Button variant="primary" type="submit">{isDeleteLoading? "Deleting you in ... " : "Unregister"}</Button>
                        <Button className = "no" onClick={onClickCancel}>취소</Button>
                        {deleteError?.error && 
                        <Alert variant="danger">
                            <p>{deleteError?.message}</p></Alert>} 
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>);
};

export default Unregister;