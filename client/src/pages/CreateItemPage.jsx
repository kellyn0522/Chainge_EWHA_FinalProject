import {useRef, useState, useContext} from "react";
import Logo from "../component/Logo";
import {itemContext, isLoginContext} from "../App";
import { useNavigate } from "react-router-dom";

const CreateItemPage = () => {
    const locationRef = useRef();
    const detailAddRef = useRef();
    const housePriceRef = useRef();
    const areaRef = useRef();
    const typeRef = useRef();
    const check = useRef();
    check.current = 0;

    const {onCreateItem} = useContext(itemContext);
    const isLogin = useContext(isLoginContext);
    const ownerID =isLogin[1];

    const navigate = useNavigate();

    let hasBed, hasWasher, hasDryer, hasTV, hasAirConditioner, hasHeater, hasBlinds = 0;

    const [location, setLocation] = useState("");
    const [detailAdd, setdetailAdd] = useState("")
    const [housePrice, setHousePrice] = useState("");
    const [area, setArea] = useState("");
    const [type, setType] = useState(undefined);
    const [memo, setMemo] = useState(undefined);
    const [bedSize, setBedSize] = useState(undefined);
    const [hasItems, setHasItems] = useState([hasBed, hasWasher, hasDryer, hasTV, hasAirConditioner, hasHeater, hasBlinds]);

    const settingLocation = (e) =>{ setLocation(e.target.value);};
    const settingdetailAdd = (e) =>{ setdetailAdd(e.target.value);};
    const settingHousePrice = (e) =>{ setHousePrice(e.target.value);};
    const settingArea = (e) =>{ setArea(e.target.value);};
    const settingType = (e) =>{ setType(e.target.value);};
    const settingMemo = (e) =>{ setMemo(e.target.value);};
    const settingBedSize = (e) =>{ setBedSize(e.target.value);};

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


    return (
        <div className = "CreateItemPage">
            <div className = "titleSet">
                <div className = "logo"><Logo /></div>
                <div className = "Title">매물 등록</div>
            </div>
            <div className = "location">
                <div className="text">주소</div>
                <div className="address">                     
                    <input value={location} onChange={settingLocation} className="set" 
                    onKeyDown = {onKeyDown} ref={locationRef} maxLength="50" placeholder = "매물 주소" />                
                    <input value={detailAdd} onChange={settingdetailAdd} className="set" 
                    onKeyDown = {onKeyDown} ref={detailAddRef} maxLength="20" placeholder = "상세 주소" />                 
                </div>
                <button className = "checkOwner" onClick={onCheck}>주소 확인</button>
            </div>
            <div className = "price"> 
                <div className="text">월세 (단위:월)</div>  
                <input value={housePrice} onChange={settingHousePrice} className="set" onKeyDown = {onKeyDown} ref={housePriceRef} maxLength="10" />
            </div>
            <div className = "area"> 
                <div className="text">공급 면적</div>  
                <input value={area} onChange={settingArea} className="set" onKeyDown = {onKeyDown} ref={areaRef} maxLength="6" />
            </div>
            <div className = "type">  
                <select className = "typeSelect" onClick={settingType} onKeyDown = {onKeyDown} ref={typeRef}>
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
                <input value={bedSize} onChange={settingBedSize} className="set" onKeyDown = {onKeyDown} maxLength="6" />
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
            <textarea value={memo} onChange={settingMemo} className="set" onKeyDown = {onKeyDown} maxLength="500" />
            <div className="ask">
                <button className = "CreateItemButton" onClick={onCreate}>등록</button>
                <button className = "cancel" onClick={notCreate}>취소</button>
            </div>           
        </div>
    )
};

export default CreateItemPage;
