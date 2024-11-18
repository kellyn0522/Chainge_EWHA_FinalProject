import { Modal, Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import Logo from "../component/Logo";
import HouseItem from "../component/HouseItem";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import "../component/HouseItem.css";
import {useNavigate} from "react-router-dom";
import add_circle from '../icons/add_circle.svg';

const MyItem = ({show ,handleClose}) => {
    const [items, setItems] = useState([]);
    const { getItem, getItemError } = useContext(AuthItemContext);
    const navigate = useNavigate();
    const { 
        user
    } = useContext(AuthContext);
    const userID = user? (user._id? user._id : null) : null

    useEffect(() => {
        const fetchItems = async () => {
            const allItems = await getItem();
            if (Array.isArray(allItems)){
                setItems(allItems);
            } else {
                console.error('Failed to fetch items.');
            }
        };
        fetchItems();
    }, [getItem]);

    const onCreateItem = () => {
        navigate("/createItemPage");
    }

    return (<>
        <Modal show = {show} onHide={handleClose} className='longModalSize'>
            <Modal.Header closeButton>
                <div className = "noto-sans-kr">내 매물 목록</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <Form>
                    <Row>
                        <Col xs={9} style = {{height: "400px"}}>
                            <Stack gap={3}>
                                <div style = {{display: 'flex'}}>
                                <div className= "list_wrapper">
                                    {getItemError && <p>Error: {getItemError}</p>}
                                    {items.map(it => (
                                        userID === it.ownerId?(
                                            <HouseItem itemId={it.itemID} />
                                        ):null
                                    ))}
                                </div>
                                <img src={add_circle} alt='add_circle' width = '50px' height = '50px' style = {{cursor: "pointer", margin:'120px 20px 0px 20px'}} onClick = {onCreateItem} />
                                </div>
                            </Stack>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    </>);
};

export default MyItem;