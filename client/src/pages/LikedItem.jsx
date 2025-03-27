import { Modal, Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import HouseItem from "../component/HouseItem";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import "../component/HouseItem.css";
import {useNavigate} from "react-router-dom";

const LikedItem = ({show ,handleClose}) => {
    const { 
        user
    } = useContext(AuthContext);

    return (<>
        <Modal show = {show} onHide={handleClose} className='longModalSize'>
            <Modal.Header closeButton>
                <div className = "noto-sans-kr">찜한 매물 목록</div>
            </Modal.Header>
            <Modal.Body className = "noto-sans-kr">
                <Form>
                                <div className= "list_column">
                                    {user && Array.isArray(user.likedItemId) && user.likedItemId.length > 0?
                                        user.likedItemId.map(it => (
                                            <HouseItem itemId={it} key={it} />
                                        )):null
                                    }
                                </div>

                </Form>
            </Modal.Body>
        </Modal>
    </>);
};

export default LikedItem;