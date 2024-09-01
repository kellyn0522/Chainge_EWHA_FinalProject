import { useNavigate } from "react-router-dom";
import {useRef, useState, useContext} from "react";
import {userContext,isLoginContext, userDataContext} from "../App";
import Logo from "../component/Logo";


const ChangingUserData = () => { // 사용자 정보 변경 페이지
    const isLogin = useContext(isLoginContext); // 로그인 여부와 로그인한 사용자 keyId
    const userData = useContext(userDataContext); // 사용자의 기존 정보
    const whoLogIn = userData.find((item) => String(item.keyId) === String(isLogin[1])); // 로그인한 사용자의 기존 정보
    const {onCreateUser, onUpdateUser} = useContext(userContext); // 사용자 정보 업데이트 함수 받기
    const keyID = whoLogIn.keyId;
    const pw = whoLogIn.passWord;

    const pwRef = useRef(); // 사용자 정보 입력 감지
    const checkPWRef = useRef();
    const nameRef = useRef();
    const telNumRef = useRef();
    const birthRef = useRef();
    const zipCodeRef = useRef();
    const navigate = useNavigate();

    const [settedPW, makePW] = useState(pw); // 사용자의 정보를 입력받을 변수, 기존에 저장된 정보로 초기화
    const [checkedPW, checkPW] = useState(pw);
    const [userName, setUserName] = useState(whoLogIn.name);
    const [userPhoneNum, setPhoneNum] = useState(whoLogIn.telNum);
    const [birth, setBirth] = useState(whoLogIn.birth);
    const [zipCode, setZipCode] = useState(whoLogIn.zipCode);
    const [email, setEmail] = useState(whoLogIn.email);
    
    const settingPW = (e) =>{ makePW(e.target.value);}; // 사용자 정보 입력 받기
    const checkingPW = (e) =>{ checkPW(e.target.value);};
    const settingPhoneNum = (e) =>{ setPhoneNum(e.target.value);};
    const settingName = (e) =>{ setUserName(e.target.value);};
    const settingBirth = (e) =>{ setBirth(e.target.value);};
    const settingZipCode = (e) =>{ setZipCode(e.target.value);};
    const settingEmail = (e) =>{ setEmail(e.target.value);};

    const onChanegeData = () => { // 변경 버튼을 누른 경우 실행
        if (!settedPW) {pwRef.current.focus(); return; // 입력이 없을 시 하이라이트
        } else if (!checkedPW) {checkPWRef.current.focus(); return;
        } else if (!userName) {nameRef.current.focus(); return;
        } else if (!userPhoneNum) {telNumRef.current.focus(); return;
        } else if (String(birth).length!==6) {birthRef.current.focus(); return;
        } else if (String(zipCode).length!==5) {zipCodeRef.current.focus(); return;
        } else if (settedPW !== checkedPW) { // 입력받은 두 비밀번호가 일치하지 않을 시
            checkPWRef.current.focus(); 
            alert("비밀번호가 일치하지 않습니다.");
            return;
        } else {          
            onUpdateUser(keyID, settedPW, userName, userPhoneNum, birth, zipCode, email); // 사용자 정보 업데이트
            alert("개인정보 변경이 완료되었습니다.");
            navigate("/mypage"); // 마이페이지로 이동
            return;
        };
    };

    
    const onKeyDown = (e) => { // enter키 입력 시
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