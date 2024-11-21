//import { AuthItemContext } from "../context/AuthItemContext";
import React, { useContext, useState, useEffect } from "react";
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
        // createItemInfo,
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
        hasBlinds : false,
        hasDresser: false,
        hasMicrowave: false,
        hasFridge: false,
        hasSofa: false,
        hasChair: false,});
    
    const [addressData, setAddressData] = useState({
        location: "",
        zipCode: "",
        latitude: null,
        longitude: null,
    });

    const [createItemInfo, setCreateItemInfo] = useState({
        location: "",
        zipCode: "",
        latitude: null,
        longitude: null,
    });
    
    const [roadAddress, setRoadAddress] = useState('');
    const [zonecode, setZonecode] = useState('');

    const loadKakaoMapsAPI = () => {
        return new Promise((resolve, reject) => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    console.log("Kakao Maps API 로드 완료");
                    resolve();
                });
            } else {
                const kakaoScript = document.createElement("script");
                kakaoScript.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=774e3b62181c99d1ba97f5efdc1eab76&libraries=services";
                kakaoScript.async = true;
                kakaoScript.onload = () => resolve();
                kakaoScript.onerror = () => reject("Kakao Maps API 로드 실패");
                document.body.appendChild(kakaoScript);
                // reject("Kakao Maps API가 로드되지 않았습니다.");
            }
        });
    };

    const handlePostcodeSearch = () => {
        if (!window.daum || !window.daum.Postcode) {
            console.error("Daum Postcode API가 로드되지 않았습니다.");
            return;
        }

        new window.daum.Postcode({
            oncomplete: async function (data) {
                const roadAddress = data.roadAddress;
                const zonecode = data.zonecode;

                console.log("검색된 주소:", roadAddress)
                console.log("검색된 우편번호:", zonecode)

                setRoadAddress(roadAddress);
                setZonecode(zonecode);
    
                loadKakaoMapsAPI().then(() => {
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.addressSearch(roadAddress, (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const { x: longitude, y: latitude } = result[0]; // 경도 (x), 위도 (y)
                            
                            // 위치 정보로 상태 업데이트 (필요시)
                            setAddressData({ 
                                roadAddress, 
                                zonecode, 
                                latitude, 
                                longitude 
                            });
                        } else {
                            console.error("주소 검색 실패:", status);
                        }
                    });
                });
            },
        }).open();
    };

    const onChangebedExist = (e) => {
        const checked = e.target.checked
        setBedExist(checked);
        updateCreateItemInfo({ 
            ...createItemInfo, 
            bedSize: checked? createItemInfo.bedSize: "" ,

        });
    };

    const onChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        setHasItems((prevState) => {
            const newState = {...prevState, [name]:checked};
            return newState;
        });
    };
    
    useEffect(() => {
        // Daum Postcode API 로드
        const daumScript = document.createElement("script");
        daumScript.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        daumScript.async = true;

        daumScript.onload = () => {
            console.log("Daum Postcode API 로드 완료");
        };

        document.body.appendChild(daumScript);

        return () => {
            // document.body.removeChild(kakaoScript);
            document.body.removeChild(daumScript);
        };
    }, []);

    useEffect(() => {
        updateCreateItemInfo({ ...createItemInfo, hasItems});
    },[hasItems]);

    useEffect(() => {
        updateCreateItemInfo({ ...createItemInfo, bedSize: bedExist? createItemInfo.bedSize: "" })
    }, [bedExist]);

   // console.log("User in CreateItemPage:", user);

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
                    <Col xs={8}>
                        <Stack gap={3}>
                        
                        <h2 style={{marginBottom: '15px'}}>매물 등록</h2>
                        <div style={{color: '#6495ED', fontSize: '12px', marginBottom:'10px'}}>* : 필수 작성 항목</div>
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

                        <Form.Group style = {{marginBottom: '10px', display: 'grid', gridTemplateColumns: '1fr 2fr 0.7fr', alignItems: 'center'}}>
                            <div style = {{display: 'flex', gap: '5px'}}>
                                <Form.Label>주소 검색</Form.Label>
                                <Form.Label style={{color: '#6495ED'}}> *</Form.Label>
                            </div>
                            <Button className = 'green' onClick={handlePostcodeSearch}>주소 찾기</Button>
                        </Form.Group>

                        <Form.Group className="formControl">
                            <div style = {{display: 'flex', gap: '5px'}}>
                                <Form.Label>우편 번호 </Form.Label>                                
                            </div>
                            <Form.Control
                                type="text"
                                value = {zonecode}
                                placeholder="zipcode"
                                onChange = {(e) => setZonecode(e.target.value)}
                            />                                
                        </Form.Group>

                        <Form.Group className="formControl">
                            <div style = {{display: 'flex', gap: '5px'}}>                            
                                <Form.Label>매물 주소 </Form.Label>
                            </div>
                            <Form.Control
                                type="text"
                                value = {roadAddress}
                                placeholder="Main Location"
                                onChange = {(e) => setRoadAddress(e.target.value)}
                            /> 
                        </Form.Group>

                        <Form.Group className='formControl'>
                            <Form.Label>상세 주소</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Detail Location" 
                                onChange={(e) => {
                                    const detailAddress = e.target.value;
                                    setAddressData((prev) => ({
                                        ...prev,
                                        location: `${prev.location} ${detailAddress}`,  // 상세 주소가 추가되도록
                                    }));
                                }}
                            />
                        </Form.Group>   
                        <Form.Group className='formControl'>
                            <div style = {{display: 'flex', gap: '5px'}}>
                                <Form.Label>월세</Form.Label>
                                <Form.Label style={{color: '#6495ED'}}> *</Form.Label>
                            </div>
                            <Form.Control
                                type="text"
                                placeholder="단위: 만원/월"
                                onChange={ 
                                    (e) => updateCreateItemInfo({ ...createItemInfo, housePrice: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <div style = {{display: 'flex', gap: '5px'}}>
                                <Form.Label>보증금</Form.Label>
                                <Form.Label style={{color: '#6495ED'}}> *</Form.Label>
                            </div>
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
                            <div style = {{display: 'flex', gap: '5px'}}>
                                <Form.Label>방 개수</Form.Label>
                                <Form.Label style={{color: '#6495ED'}}> *</Form.Label>
                            </div>
                            <Form.Control 
                            type="text" 
                            placeholder="방 개수"
                            onChange={ 
                                (e) => updateCreateItemInfo({ ...createItemInfo, room: e.target.value })
                            } />
                        </Form.Group>
                        <Form.Group className='formControl'>
                            <div style = {{display: 'flex', gap: '5px'}}>
                                <Form.Label>화장실 개수</Form.Label>
                                <Form.Label style={{color: '#6495ED'}}> *</Form.Label>
                            </div>
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
                            <div className="text" style = {{marginBottom: '20px'}}>옵션 여부 (옵션인 경우 체크해주세요.)</div>   
                            <div style = {{display: 'flex', alignItems: 'center', marginBottom: '15px', fontSize: '15px'}}> 
                                <div className="creatPageText" style = {{marginRight: '53px'}}>침대</div>
                                <input type = "checkbox" checked = {bedExist} onChange = {onChangebedExist} />
 
                                <div className="creatPageText" style = {{marginLeft: '80px', marginRight: '25px'}}>침대 크기</div>
                                <input onChange={
                                    (e) => updateCreateItemInfo({ ...createItemInfo, bedSize: e.target.value })
                                } className="set"  maxLength="6" disabled = {!bedExist} />
                            </div>
                            <div className = 'optionCheck'>
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
                            <div className="creatPageItem">
                                <div className="creatPageText">옷장</div>
                                <input type = "checkbox" name = "hasDresser" checked = {hasItems.hasDresser} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">전자레인지</div>
                                <input type = "checkbox" name = "hasMicrowave" checked = {hasItems.hasMicrowave} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">냉장고</div>
                                <input type = "checkbox" name = "hasFridge" checked = {hasItems.hasFridge} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">소파</div>
                                <input type = "checkbox" name = "hasSofa" checked = {hasItems.hasSofa} onChange = {onChangeCheckbox} />
                            </div>
                            <div className="creatPageItem">
                                <div className="creatPageText">의자</div>
                                <input type = "checkbox" name = "hasChair" checked = {hasItems.hasChair} onChange = {onChangeCheckbox} />
                            </div>
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