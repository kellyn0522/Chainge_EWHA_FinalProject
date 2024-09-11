//import { AuthItemContext } from "../context/AuthItemContext";
import { useContext, useState } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";

const CreateItemPage = () => {

    const { 
        user,
        createItemInfo,
        updateCreateItemInfo,
        createItem,
        createItemError,
        isCreateItemLoading,
    } = useContext(AuthContext);

    let hasBed, hasWasher, hasDryer, hasTV, hasAirConditioner, hasHeater, hasBlinds = 0;
    const[isContract, setIsContract] = useState(0);
    const ownerID = 10000003; // 데이터 연결 필요

    const [type, setType] = useState(undefined);
    const [memo, setMemo] = useState(undefined);
    const [bedSize, setBedSize] = useState(undefined);
    const [hasItems, setHasItems] = useState([hasBed, hasWasher, hasDryer, hasTV, hasAirConditioner, hasHeater, hasBlinds]);
    
    const settingType = (e) =>{ setType(e.target.value);};
    const settingBedSize = (e) =>{ setBedSize(e.target.value);};

    const onChangeCheckbox = (e) => {
        //console.log(String(e.current));
        //switch(String(e.current))
    }
/*

    const locationRef = useRef();
    const detailAddRef = useRef();
    const housePriceRef = useRef();
    const areaRef = useRef();
    const typeRef = useRef();
    const check = useRef();
    check.current = 0;

    const {onCreateItem} = useContext(itemContext);
    const ownerID = 10000003; // 데이터 연결 필요

    const navigate = useNavigate();

    let hasBed, hasWasher, hasDryer, hasTV, hasAirConditioner, hasHeater, hasBlinds = 0;

    const [type, setType] = useState(undefined);
    const [memo, setMemo] = useState(undefined);
    const [bedSize, setBedSize] = useState(undefined);
    const [hasItems, setHasItems] = useState([hasBed, hasWasher, hasDryer, hasTV, hasAirConditioner, hasHeater, hasBlinds]);
*/
/*
    const onCheck = () => {
        if (!location) { locationRef.current.focus(); return;
        } else if (!detailAdd) { detailAddRef.current.focus(); return;
        } else {
            alert("인증이 완료되었습니다.");
            check.current = 1;
            return;
        }
    }

    const onCreate = () => {
        if (!location) { locationRef.current.focus(); return;   
        } else if (!detailAdd) { detailAddRef.current.focus(); return;
        } else if (!housePrice) {housePriceRef.current.focus(); return;
        } else if (!area) {areaRef.current.focus(); return;
        } else if (String(check.current) !== String(1)) {alert("주소 인증이 완료되지 않았습니다."); return;
        } else {
            onCreateItem(location, detailAdd, ownerID, housePrice, area, type, memo, bedSize, hasItems);
            alert("매물을 등록하였습니다.");
            navigate("/mypage");
            return;
        };
    };

    const notCreate = () => {
        navigate("/mypage");
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13){
            console.log("enter");
            onCreate();
        }
    }

    const onChangeCheckbox = (e) => {
        console.log(String(e.current));
        //switch(String(e.current))
    }

*/

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
                        type="text" 
                        placeholder={user.name}
                        disabled/>

                        <Form.Control 
                        type="text" 
                        placeholder="Location" 
                        onChange={
                            (e) => updateCreateItemInfo({ ...createItemInfo, location: e.target.value })
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

                        
                        <Button variant="primary" type="submit" >
                            { isCreateItemLoading? "Creating your Item":"Register"}
                        </Button>
                        {
                            createItemError?.error && <Alert variant="danger">
                            <p>{createItemError?.message}</p></Alert>
                        }
                        
                    </Stack>
                </Col>
            </Row>
        </Form>
        <div className = "type">  
                            <select className = "typeSelect" onClick={settingType} >
                                <option value = "select">매물 종류</option>
                                <option value = "아파트">아파트</option>
                                <option value = "오피스텔">오피스텔</option>
                                <option value = "단독주택">단독주택</option>
                                <option value = "상가">상가</option>
                            </select>
                        </div>   
                        <div className = "bedSize"> 
                            <div className="text">침대 옵션 여부</div>
                            <input type = "checkbox" checked = {hasBed} onChange = {onChangeCheckbox} />
                            <div className="text">침대 크기</div>
                            <input value={bedSize} onChange={settingBedSize} className="set"  maxLength="6" />
                        </div>
                        <div className = "hasItem"> 
                            <div className="text">옵션 여부 (옵션인 경우 체크해주세요.)</div>
                            <div className="hasWasher">
                                <div className="text">세탁기</div>
                                <input type = "checkbox" checked = {hasWasher} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasDryer">
                                <div className="text">드라이기</div>
                                <input type = "checkbox" checked = {hasDryer} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasTV">
                                <div className="text">TV</div>
                                <input type = "checkbox" checked = {hasTV} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasAirConditioner">
                                <div className="text">에어컨</div>
                                <input type = "checkbox" checked = {hasAirConditioner} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasHeater">
                                <div className="text">난방</div>
                                <input type = "checkbox" checked = {hasHeater} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="hasBlinds">
                                <div className="text">블라인드</div>
                                <input type = "checkbox" checked = {hasBlinds} onChange = {onChangeCheckbox} />
                            </div>
                        </div>
    </>);
};

export default CreateItemPage;