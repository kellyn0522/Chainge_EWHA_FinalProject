//import { AuthItemContext } from "../context/AuthItemContext";
import { useContext, useState, useEffect } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";

const CreateItemPage = () => {

    const { 
        //item,
        createItemInfo,
        updateCreateItemInfo,
        createItem,
        createItemError,
        isCreateItemLoading,
    } = useContext(AuthItemContext);
    const{user} = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const [bedExist, setBedExist] = useState(false);
    const [hasItems, setHasItems] = useState({
        hasWasher : false,
        hasDryer : false, 
        hasTV : false, 
        hasAirConditioner : false, 
        hasHeater : false, 
        hasBlinds : false});

    const onChangebedExist = (e) => {
        const checked = e.target.checked
        setBedExist(checked);
        () => updateCreateItemInfo({ ...createItemInfo, bedSize: checked? createItemInfo.bedSize: "" })
    };

    const onChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        setHasItems((prevState) => {
            const newState = {...prevState, [name]:checked};
            return newState;
        });
    };

    useEffect(() => {
        updateCreateItemInfo({ ...createItemInfo, hasItems});
    },[hasItems]);

    useEffect(() => {
        updateCreateItemInfo({ ...createItemInfo, bedSize: bedExist? createItemInfo.bedSize: "" })
    }, [bedExist])

    return (<>
        <Form onSubmit={createItem}>
            <Row style={{
                height: "100vh",
                justifyContent: "Center",
                paddingTop: "10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <div className = "logo"><Logo /></div>
                        <h2>매물 등록</h2>
                        <Form.Control
                                type="file"
                                onChange={(e) => updateCreateItemInfo({ ...createItemInfo, imageFile: e.target.files[0] })}
                        />

                        <Form.Control 
                        type="text" 
                        placeholder={user.name}
                        disabled/>

                        <Form.Control 
                        type="text" 
                        placeholder="Location" 
                        onChange={
                            (e) => updateCreateItemInfo({ ...createItemInfo, location: e.target.value, ownerName: user.name, itemID: new Date().getTime(), ownerId: user.email })
                        } />

                        <Form.Control 
                        type="text" 
                        placeholder="Detail Location" 
                        onChange={ 
                            (e) => updateCreateItemInfo({ ...createItemInfo, houseAddress: e.target.value })
                        } />

                        <Form.Control
                            type="text"
                            placeholder="ZipCode"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, zipCode: e.target.value })
                            }
                        />
                        
                        <Form.Control
                            type="text"
                            placeholder="월세 (단위:월)"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, housePrice: e.target.value })
                            }
                        />
                        <Form.Control
                            type="text"
                            placeholder="공급 면적"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, area: e.target.value })
                            }
                        />
                        
                        <Form.Control
                            type="text"
                            placeholder="Memo"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, memo: e.target.value })
                            }
                        />
                        <div className = "type">  
                            <select className = "typeSelect" onClick={
                                    (e) => updateCreateItemInfo({ ...createItemInfo, type: e.target.value })
                                } >
                                <option value = "select">매물 종류</option>
                                <option value = "아파트">아파트</option>
                                <option value = "오피스텔">오피스텔</option>
                                <option value = "단독주택">단독주택</option>
                                <option value = "상가">상가</option>
                            </select>
                        </div>   
                        <div className = "bedSize"> 
                            <div className="text">침대 옵션 여부</div>
                            <input type = "checkbox" checked = {bedExist} onChange = {onChangebedExist} />
                            <div className="text">침대 크기</div>
                            <input onChange={
                                (e) => updateCreateItemInfo({ ...createItemInfo, bedSize: e.target.value })
                            } className="set"  maxLength="6" disabled = {!bedExist} />
                        </div>
                        <div className = "hasItem"> 
                            <div className="text">옵션 여부 (옵션인 경우 체크해주세요.)</div>
                            <div className="hasWasher">
                                <div className="text">세탁기</div>
                                <input type = "checkbox" name = "hasWasher" checked = {hasItems.hasWasher} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasDryer">
                                <div className="text">드라이기</div>
                                <input type = "checkbox" name = "hasDryer" checked = {hasItems.hasDryer} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasTV">
                                <div className="text">TV</div>
                                <input type = "checkbox" name = "hasTV" checked = {hasItems.hasTV} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasAirConditioner">
                                <div className="text">에어컨</div>
                                <input type = "checkbox" name = "hasAirConditioner" checked = {hasItems.hasAirConditioner} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasHeater">
                                <div className="text">난방</div>
                                <input type = "checkbox" name = "hasHeater" checked = {hasItems.hasHeater} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasBlinds">
                                <div className="text">블라인드</div>
                                <input type = "checkbox" name = "hasBlinds" checked = {hasItems.hasBlinds} onChange = {onChangeCheckbox} />
                            </div>
                        </div>

                        
                        <Button variant="primary" type="submit" >
                            { isCreateItemLoading? "Creating your Item":"매물 등록"}
                        </Button>
                        {
                            createItemError?.error && <Alert variant="danger">
                            <p>{createItemError?.message}</p></Alert>
                        }
                        
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>);
};

export default CreateItemPage;