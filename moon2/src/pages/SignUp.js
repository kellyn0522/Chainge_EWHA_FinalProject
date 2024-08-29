import {useRef, useState, useContext} from "react";
import Logo from "../component/Logo";
import "./SignUp.css";
import {userContext, userDataContext} from "../App";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const idRef = useRef();
    const pwRef = useRef();
    const checkPWRef = useRef();
    const nameRef = useRef();
    const telNumRef = useRef();
    const birthRef = useRef();
    const identityNumRef = useRef();
    const zipCodeRef = useRef();
    const {onCreateUser} = useContext(userContext);
    const userData = useContext(userDataContext);
    const navigate = useNavigate();

    const [settedID, makeID] = useState("");
    const [checkIDOverlap, notOverlap] = useState(false);
    const [settedPW, makePW] = useState("");
    const [checkedPW, checkPW] = useState("");
    const [userName, setUserName] = useState("");
    const [userPhoneNum, setPhoneNum] = useState("");
    const [birth, setBirth] = useState("");
    const [identityNum, setIdentityNum] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [email, setEmail] = useState(undefined);

    const settingID = (e) =>{ makeID(e.target.value);};
    const settingPW = (e) =>{ makePW(e.target.value);};
    const checkingPW = (e) =>{ checkPW(e.target.value);};
    const settingPhoneNum = (e) =>{ setPhoneNum(e.target.value);};
    const settingName = (e) =>{ setUserName(e.target.value);};
    const settingBirth = (e) =>{ setBirth(e.target.value);};
    const settingEmail = (e) =>{ setEmail(e.target.value);};
    const settingIdentityNum = (e) =>{ setIdentityNum(e.target.value);};
    const settingZipCode = (e) =>{ setZipCode(e.target.value);};

    const onSignUp = () => {
        if (!checkIDOverlap) { idRef.current.focus(); return;
        } else if (!settedPW) {pwRef.current.focus(); return;
        } else if (!checkedPW) {checkPWRef.current.focus(); return;
        } else if (!userName) {nameRef.current.focus(); return;
        } else if (!userPhoneNum) {telNumRef.current.focus(); return;
        } else if (birth.length!==6) {birthRef.current.focus(); return; 
        } else if (identityNum.length!==7) {identityNumRef.current.focus(); return;
        } else if (zipCode.length!==5) {zipCodeRef.current.focus(); return;
        } else if (settedPW !== checkedPW) { 
            checkPWRef.current.focus(); 
            alert("비밀번호가 일치하지 않습니다.");
            return;
        } else {
            onCreateUser(userName, settedID, settedPW, userPhoneNum, birth, identityNum, zipCode, email);
            alert("회원가입이 완료되었습니다.");
            navigate("/");
            return;
        };
    };

    const checkOverlap = () => {
        if (!settedID) { idRef.current.focus(); return;
        } else {
            if (userData.findIndex((item) => String(item.id) === String(settedID)) === -1){
                alert("사용할 수 있는 아이디 입니다.");
                notOverlap(1);
            } else{
                alert("사용할 수 없는 아이디 입니다.");
                idRef.current.focus();
                return;
            };
        }   
    }
    
    const onKeyDown = (e) => {
        if (e.keyCode === 13){
            console.log("enter");
            onSignUp();
        }
    }

    return (
        <div className = "SignUp">
            <div className = "titleSet">
                <div className = "logo"><Logo /></div>
                <div className = "Title">회원가입</div>
            </div>
            <div className = "wrap">
                <div className="text">ID</div>                    
                <input value={settedID} onChange={settingID} className="set" onKeyDown = {onKeyDown} ref={idRef} maxLength="20" />                 
                <button className = "checkOverlap" onClick={checkOverlap}>중복확인</button>
            </div>
            <div className = "wrap">
                <div className="text">PW</div>
                <input type="password" value={settedPW} onChange={settingPW} className="set" onKeyDown = {onKeyDown} ref={pwRef} maxLength="20" />
            </div>
            <div className = "wrap">
                <div className="text">PW 확인</div>
                <input type="password" value={checkedPW} onChange={checkingPW} className="set" onKeyDown = {onKeyDown} ref={checkPWRef} maxLength="20" />
            </div>
            <div className = "wrap">
                <div className="text">이름</div>
                <input value={userName} onChange={settingName} className="set" onKeyDown = {onKeyDown} ref={nameRef} maxLength="10" />
            </div>
            <div className = "wrap">
                <div className ="text">주민등록번호</div>
                <div className = "content">
                    <input value={birth} onChange={settingBirth} className="set" onKeyDown = {onKeyDown} ref={birthRef} maxLength="6" />
                    <div className = "sep">-</div>
                    <input type="password" value={identityNum} onChange={settingIdentityNum} className="set" onKeyDown = {onKeyDown} ref={identityNumRef} maxLength="7" />
                </div>
            </div>
            <div className = "wrap">
                <div className="text">전화번호</div>
                <input type="content" value={userPhoneNum} onChange={settingPhoneNum} className="set" onKeyDown = {onKeyDown} ref={telNumRef} maxLength="13" />
            </div>
            <div className = "wrap">
                <div className="text">우편번호</div>
                <input type="content" value={zipCode} onChange={settingZipCode} className="set" onKeyDown = {onKeyDown} ref={zipCodeRef} maxLength="5" />
            </div>
            <div className = "wrap">
                <div className="text">E-mail</div>
                <input type="content" value={email} onChange={settingEmail} className="set" onKeyDown = {onKeyDown} maxLength="35" />
            </div>
            <button className = "signUpButton" onClick={onSignUp}>본인 확인</button>
        </div>
    );        
};
export default SignUp;