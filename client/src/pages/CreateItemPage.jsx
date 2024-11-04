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
        <div>
            <div className = "logo"><Logo /></div>
            <Form className="noto-sans-kr" onSubmit={createItem}>
                <Row style={{
                    height: "100%",
                    justifyContent: "Center",
                    paddingTop: "10px",
                    paddingBottom:"10%"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                        
                        <h2 style={{marginBottom: '10px'}}>매물 등록</h2>
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
                            maxLength="5"
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
                        <div className = "creatPageHasItem" style={{marginTop: '10px'}}>
                            <div className="text" style = {{marginBottom: '15px'}}>옵션 여부 (옵션인 경우 체크해주세요.)</div>   
                            <div className = "creatPageItem"> 
                                <div className="creatPageText">침대</div>
                                <input type = "checkbox" checked = {bedExist} onChange = {onChangebedExist} />
 
                                <div className="creatPageText" style = {{marginLeft: '15px'}}>침대 크기</div>
                                <input onChange={
                                    (e) => updateCreateItemInfo({ ...createItemInfo, bedSize: e.target.value })
                                } className="set"  maxLength="6" disabled = {!bedExist} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">세탁기</div>
                                <input type = "checkbox" name = "hasWasher" checked = {hasItems.hasWasher} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">드라이기</div>
                                <input type = "checkbox" name = "hasDryer" checked = {hasItems.hasDryer} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">TV</div>
                                <input type = "checkbox" name = "hasTV" checked = {hasItems.hasTV} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">에어컨</div>
                                <input type = "checkbox" name = "hasAirConditioner" checked = {hasItems.hasAirConditioner} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">난방</div>
                                <input type = "checkbox" name = "hasHeater" checked = {hasItems.hasHeater} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">블라인드</div>
                                <input type = "checkbox" name = "hasBlinds" checked = {hasItems.hasBlinds} onChange = {onChangeCheckbox} />
                            </div>
                        </div>

                        
                        <Button className = 'green' style = {{color: 'white', border: 'none', marginTop: '5px'}} type="submit" >
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
        </div>
    </>);
};

export default CreateItemPage;