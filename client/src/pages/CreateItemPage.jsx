//import { AuthItemContext } from "../context/AuthItemContext";
import { useContext, useState, useEffect } from "react";
import { Alert, Button, Form, Row, Col, Stack, Card } from "react-bootstrap";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import Logo from "../component/Logo";
import { useNavigate } from "react-router-dom";


const CreateItemPage = () => {

    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();
    
    const { 
        //item,
        createItemInfo,
        updateCreateItemInfo,
        createItem,
        createItemError,
        isCreateItemLoading,
    } = useContext(AuthItemContext);
    //const{user} = useContext(AuthContext);
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
    const [addressData, setAddressData] = useState({
        location: "",
        zipCode: "",
        latitude: null,
        longitude: null,
    });
    const handlePostcodeSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const roadAddress = data.roadAddress;
                const zonecode = data.zonecode;

                // 좌표 변환 API 호출 (Kakao REST API 사용)
                const geocoder = new window.daum.maps.services.Geocoder();
                geocoder.addressSearch(roadAddress, (result, status) => {
                    if (status === window.daum.maps.services.Status.OK) {
                        const { x, y } = result[0]; // 경도 (x), 위도 (y)
                        setAddressData({
                            location: roadAddress,
                            zipCode: zonecode,
                            latitude: y,
                            longitude: x,
                        });
                        updateCreateItemInfo({
                            ...createItemInfo,
                            location: roadAddress,
                            zipCode: zonecode,
                            latitude: y,
                            longitude: x,
                        });
                    }
                });
            },
        }).open();
    };


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
    // 스크립트 추가
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 클린업
    return () => {
        document.body.removeChild(script);
    };
}, []);

    useEffect(() => {
        updateCreateItemInfo({ ...createItemInfo, hasItems});
    },[hasItems]);

    useEffect(() => {
        updateCreateItemInfo({ ...createItemInfo, bedSize: bedExist? createItemInfo.bedSize: "" })
    }, [bedExist])
   // console.log("User in CreateItemPage:", user);
   useEffect(() => {
    if (user) {
        updateCreateItemInfo({
            ItemId: new Date().getTime(),
            ownerId: user._id,
            ownerName: user.name,
        });
    }
}, [user]);

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
                        
                        <h2 style={{marginBottom: '15px'}}>매물 등록</h2>
                        <Form.Control
                                type="file"
                                style = {{marginBottom: '10px'}}
                                onChange={(e) => updateCreateItemInfo({ ...createItemInfo, imageFile: e.target.files[0] })}
                        />
                        <Form.Group className='formControl'>
                            <Form.Label>소유주 이름</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder={user.name}
                            disabled/>
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>매물 주소</Form.Label>
                            <Form.Control 
                            type="text" 
                            value={addressData.location} readOnly 
                            onChange={
                                (e) => updateCreateItemInfo({ ...createItemInfo, location: e.target.value, ownerName: user.name, itemID: new Date().getTime(), ownerId: user._id })
                            } />
                            <Button onClick={handlePostcodeSearch}>주소 찾기</Button>
                        </Form.Group>
                        <Form.Group className="formControl">
                                <Form.Label>우편번호</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={addressData.zipCode || ""}
                                    readOnly
                                    placeholder="우편번호"
                                />
                            </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>상세 주소</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Detail Location" 
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, houseAddress: e.target.value })
                            } />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>월세</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="단위: 만원/월"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, housePrice: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>보증금</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="단위: 만원"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, deposit: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>층</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="층"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, floor: e.target.value })
                            } />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>방 개수</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="방 개수"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, room: e.target.value })
                            } />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>화장실 개수</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="화장실 개수"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, bathroom: e.target.value })
                            } />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>총 주차대수</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="총 주차대수"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, parkingSpace: e.target.value })
                            } />
                        </Form.Group>
                        <div className='checkContainer'>
                        <div className='groupLeft'>
                        <Card className = 'radioCheck'>
                        <Form.Group className = 'formGroupRight'>
                            <Form.Label>방향</Form.Label>
                            <Form.Check 
                            type="radio" 
                            label = '남향'
                            name = 'facing'
                            value = '남향'
                            checked = {createItemInfo.facing === '남향'}
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '남동향'
                            name = 'facing'
                            value = '남동향'
                            checked = {createItemInfo.facing === '남동향'}
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '동향'
                            name = 'facing'
                            value = '동향'
                            checked = {createItemInfo.facing === '동향'}
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '북동향'
                            name = 'facing'
                            value = '북동향'
                            checked = {createItemInfo.facing === '북동향'}
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '북향'
                            name = 'facing'
                            value = '북향'
                            checked = {createItemInfo.facing === '북향'}
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '북서향'
                            name = 'facing'
                            value = '북서향'
                            checked = {createItemInfo.facing === '북서향'}
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '서향'
                            name = 'facing'
                            value = '서향'
                            checked = {createItemInfo.facing === '서향'}
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, facing: e.target.value })
                            } />
                            <Form.Check 
                            type="radio" 
                            label = '남서향'
                            name = 'facing'
                            value = '남서향'
                            checked = {createItemInfo.facing === '남서향'}
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, facing: e.target.value })
                            } />
                        </Form.Group>
                        </Card>
                        </div>
                        <div className = 'groupRight'>
                        <Card className = 'radioCheck'>
                            <Form.Group>
                                <Form.Label>엘리베이터 여부</Form.Label>
                                <Form.Check 
                                type="radio" 
                                label = '엘리베이터 있음'
                                name = 'elevater'
                                value = 'true'
                                checked = {createItemInfo.elevator === true}
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, elevator: e.target.value === 'true' })
                                } />
                                <Form.Check 
                                type="radio" 
                                label = '엘리베이터 없음'
                                name = 'elevater'
                                value = 'false'
                                checked = {createItemInfo.elevator === false}
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, elevator: e.target.value === 'true' })
                                } />
                            </Form.Group>
                        </Card>
                        <Card className = 'radioCheck'>
                            <Form.Group>
                                <Form.Label>복층 여부</Form.Label>
                                <Form.Check 
                                type="radio" 
                                label = '단층'
                                name = 'story'
                                value = 'false'
                                checked = {createItemInfo.duplexAvailability === false}
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, duplexAvailability: e.target.value === 'true' })
                                } />
                                <Form.Check 
                                type="radio" 
                                label = '복층'
                                name = 'story'
                                value = 'true'
                                checked = {createItemInfo.duplexAvailability === true}
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, duplexAvailability: e.target.value === 'true' })
                                } />
                            </Form.Group>
                        </Card>
                        <Card className = 'radioCheck'>
                            <Form.Group>
                                <Form.Label>반려 동물 가능 여부</Form.Label>
                                <Form.Check 
                                type="radio" 
                                label = '가능'
                                name = 'pet'
                                value = 'true'
                                checked = {createItemInfo.petFriendly === true}
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, petFriendly: e.target.value === 'true' })
                                } />
                                <Form.Check 
                                type="radio" 
                                label = '불가능'
                                name = 'pet'
                                value = 'false'
                                checked = {createItemInfo.petFriendly === false}
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, petFriendly: e.target.value === 'true' })
                                } />
                            </Form.Group>
                        </Card>
                        </div>
                        </div>

                        <Form.Group className='formControl'>
                            <Form.Label>공급 면적</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="평"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, area: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>전용 면적</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="제곱미터"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, exclusiveArea: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>계약 면적</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="제곱미터"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, contractArea: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>총 세대수</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="세대"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, total_number_of_units: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>해당 면적 세대수</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="세대"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, number_of_units_in_the_given_area: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>입주 가능 날짜</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, availableMoveInDate: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>매물 종류</Form.Label>
                            <Form.Select 
                                className = "typeSelect"
                                value={createItemInfo.type}
                                onChange={
                                    (e) => updateCreateItemInfo({ ...createItemInfo, type: e.target.value })
                                } >
                                <option value = "select">매물 종류</option>
                                <option value = "아파트">아파트</option>
                                <option value = "오피스텔">오피스텔</option>
                                <option value = "단독주택">단독주택</option>
                                <option value = "상가">상가</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <Form.Label>추가 상세 정보</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Memo"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, memo: e.target.value })
                                }
                            />
                        </Form.Group>
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