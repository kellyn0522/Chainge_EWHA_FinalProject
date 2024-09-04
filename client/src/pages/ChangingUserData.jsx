import { useNavigate } from "react-router-dom";
import {useRef, useState, useContext} from "react";
import Logo from "../component/Logo";


const ChangingUserData = () => {
    
    const whoLogIn = { // 데이터 연결필요
        name: "송태섭",
        id: "ijkl",
        passWord: "1234",
        keyId: 10000003,
        telNum:111,
        birth:111113,
        identityNum:3333333,
        zipCode: 33333, 
        email: undefined,
        ownItem: [1],
        likedItemId: [2,3],
        contracts: [2]
      };

    const keyID = whoLogIn.keyId;
    const pw = whoLogIn.passWord;

    const pwRef = useRef();
    const checkPWRef = useRef();
    const nameRef = useRef();
    const telNumRef = useRef();
    const birthRef = useRef();
    const zipCodeRef = useRef();
    const navigate = useNavigate();

    const [settedPW, makePW] = useState(pw);
    const [checkedPW, checkPW] = useState(pw);
    const [userName, setUserName] = useState(whoLogIn.name);
    const [userPhoneNum, setPhoneNum] = useState(whoLogIn.telNum);
    const [birth, setBirth] = useState(whoLogIn.birth);
    const [zipCode, setZipCode] = useState(whoLogIn.zipCode);
    const [email, setEmail] = useState(whoLogIn.email);
    
    const settingPW = (e) =>{ makePW(e.target.value);};
    const checkingPW = (e) =>{ checkPW(e.target.value);};
    const settingPhoneNum = (e) =>{ setPhoneNum(e.target.value);};
    const settingName = (e) =>{ setUserName(e.target.value);};
    const settingBirth = (e) =>{ setBirth(e.target.value);};
    const settingZipCode = (e) =>{ setZipCode(e.target.value);};
    const settingEmail = (e) =>{ setEmail(e.target.value);};

    const onChanegeData = () => {
        if (!settedPW) {pwRef.current.focus(); return;
        } else if (!checkedPW) {checkPWRef.current.focus(); return;
        } else if (!userName) {nameRef.current.focus(); return;
        } else if (!userPhoneNum) {telNumRef.current.focus(); return;
        } else if (String(birth).length!==6) {birthRef.current.focus(); return;
        } else if (String(zipCode).length!==5) {zipCodeRef.current.focus(); return;
        } else if (settedPW !== checkedPW) { 
            checkPWRef.current.focus(); 
            alert("비밀번호가 일치하지 않습니다.");
            return;
        } else {          
            console.log(keyID, settedPW, userName, userPhoneNum, birth, zipCode, email); // 수정필요
            alert("개인정보 변경이 완료되었습니다.");
            navigate("/mypage");
            return;
        };
    };

    
    const onKeyDown = (e) => {
        if (e.keyCode === 13){
            console.log("enter");
            onChanegeData();
        }
    }

       
    return ( 
        <div>
            <div className = "titleSet">
                <div className = "logo"><Logo /></div>
                <div className = "title">개인정보 변경</div>
            </div>
            <div>
                <div className="text">ID</div>
                <input value={whoLogIn.id} className="set" disabled/>                                     
            </div>
            <div className = "settingPW">
                <div className="text">PW</div>
                <input type="password" value={settedPW} onChange={settingPW} className="set" onKeyDown = {onKeyDown} ref={pwRef} maxLength="20" />
            </div>
            <div className = "checkingPW">
                <div className="text">PW 확인</div>
                <input type="password" value={checkedPW} onChange={checkingPW} className="set" onKeyDown = {onKeyDown} ref={checkPWRef} maxLength="20" />
            </div>
            <div className = "settingName">
                <div className="text">이름</div>
                <input value={userName} onChange={settingName} className="set" onKeyDown = {onKeyDown} ref={nameRef} maxLength="10" />
            </div>
            <div className = "IdentityNum">
                <div className ="text">생년월일</div>
                    <input value={birth} onChange={settingBirth} className="set" onKeyDown = {onKeyDown} ref={birthRef} maxLength="6" />
            </div>
            <div className = "settingPhoneNum">
                <div className="text">전화번호</div>
                <input type="tel" value={userPhoneNum} onChange={settingPhoneNum} className="set" onKeyDown = {onKeyDown} ref={telNumRef} maxLength="13" />
            </div>
            <div className = "zipCode">
                <div className="text">우편번호</div>
                <input value={zipCode} onChange={settingZipCode} className="set" onKeyDown = {onKeyDown} ref={zipCodeRef} maxLength="5" />
            </div>
            <div className = "settingEmail">
                <div className="text">E-mail</div>
                <input type="email" value={email} onChange={settingEmail} className="set" onKeyDown = {onKeyDown} maxLength="35" />
            </div>
            <button className = "signUpButton" onClick={onChanegeData}>변경</button>
        </div>
    )
};
export default ChangingUserData;