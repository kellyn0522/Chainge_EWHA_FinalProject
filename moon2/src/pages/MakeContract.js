import {useRef, useState, useContext} from "react";
import Logo from "../component/Logo";
import {itemDataContext, isLoginContext, userDataContext} from "../App";
import { useNavigate } from "react-router-dom";


const MakeContract = () => { // 거래하기
    const itemData = /*useContext(itemDataContext);*/ 
    {location: "서초구",
    detailAdd:"ooo아파트",
    itemId: 1,
    ownerID: 10000001,
    housePrice: 150,
    area: 20,
    type: "아파트",
    memo: "역세권입니다.",
    tenantID: "",
    contractIds: -1,
    bedSize: "Queen",
    hasItems: [1,1,1,1,1,1], };

    const isLogin = useContext(isLoginContext); // 로그인힌 user keyId
    const userData = useContext(userDataContext); // User Data
    const navigate = useNavigate();
    const whoLogIn = userData.find((item) => String(item.keyId) === String(isLogin[1])); // 로그인한 user 정보

    const depositRef = useRef(); // 사용자의 입력 감지
    const costRef = useRef();
    const startDateRef = useRef();
    const periodRef = useRef();
    const endDateRef = useRef();

    const userName = whoLogIn.name; // user의 기존 입력 정보
    const zipCode = whoLogIn.zipCode;
    const birth = whoLogIn.birth;
    const identityNum = whoLogIn.identityNum;
    const telNum = whoLogIn.telNum;

    const location = itemData.location // 매물의 기존 입력 정보
    const detailAdd = itemData.detailAdd
    const ownerID = itemData.ownerID
    const area = itemData.area
    const type = itemData.type
    const memo = itemData.memo

    const [cost, setCost] = useState(itemData.housePrice); // 사용자의 입력을 저장하는 변수
    const [deposit, setDeposit] = useState("");
    const [startDate, setStartDate] = useState("");
    const [period, setPeriod] = useState("");
    const [endDate, setEndDate] = useState("");

    const settingCost = (e) =>{ setCost(e.target.value);}; // 사용자의 입력 저장
    const settingDeposit = (e) =>{ setDeposit(e.target.value);};
    const settingStartDate = (e) =>{ setStartDate(e.target.value);};
    const settingPeriod = (e) =>{ setPeriod(e.target.value);};
    const settingEndDate = (e) =>{ setEndDate(e.target.value);};
   
    const onMakeContract = () => { // 거래 시작 버튼을 누르면 실행되는 함수
        if (!cost) {costRef.current.focus(); return; // 입력이 없는 경우 하이라이트
        } else if (!deposit) {depositRef.current.focus(); return;
        } else if (!startDate) {startDateRef.current.focus(); return;
        } else if (!period) {periodRef.current.focus(); return;
        } else if (!endDate) {endDateRef.current.focus(); return;
        } else {
            navigate("/"); // 홈으로 이동
            return [ // 사용자 입력 전달
                {userName, zipCode, birth, identityNum, telNum},
                {location, detailAdd, ownerID, area, type, memo},
                {cost, deposit, startDate, period, endDate}
            ];
        };
    };


    return (
        <div className = "MakeContract">
            <div className = "header">
                <div className = "logo"><Logo /></div>
                <div className = "Title">거래하기</div>
            </div>
            <div className = "CheckIdentity">
                <div className = "text">개인정보 확인</div>
                <div className = "name">
                    <div className="text">이름</div>
                    <input value={userName} className="set" disabled />
                </div>
                <div className = "zipCode">
                    <div className="text">우편번호</div>
                    <input value={zipCode} className="set" disabled />
                </div>
                <div className = "IdentityNum">
                    <div className ="text">주민등록번호</div>
                    <div className = "content">
                        <input value={birth} className="set" disabled />
                        <div className = "sep">-</div>
                        <input value={identityNum} className="set" disabled />
                    </div>
                </div>
                <div className = "telNum">
                    <div className="text">전화번호</div>
                    <input value={telNum} className="set" disabled />
                </div>
            </div>
            <div className = "CheckHouse">
                <div className = "text">매물 정보 확인</div>
                <div className = "location">
                    <div className="text">주소</div>
                    <input value={location} className="set" disabled />
                </div>
                <div className = "detailAdd">
                    <input value={detailAdd} className="set" disabled />
                </div>
                <div className = "ownerID">
                    <div className="text">소유주</div>
                    <input value={ownerID} className="set" disabled />
                </div>
                <div className = "area">
                    <div className="text">공급면적</div>
                    <input value={area} className="set" disabled />
                </div>
                <div className = "type">
                    <div className="text">주소</div>
                    <input value={type} className="set" disabled />
                </div>
                <div className = "memo">
                    <div className="text">상세설명</div>
                    <textarea value={memo} className="set" disabled />
                </div>
            </div>
            <div className = "contractInfo">
                <div className = "text">추가 정보 입력</div>
                <div className = "cost">
                    <div className="text">월세</div>
                    <input value={cost} onChange={settingCost} className="set" ref={costRef} maxLength="7" />
                </div>
                <div className = "deposit">
                    <div className="text">보증금</div>
                    <input  value={deposit} onChange={settingDeposit} className="set" ref={depositRef} maxLength="6" />
                </div>
                <div className = "startDate">
                    <div className="text">계약 시작 날짜</div>
                    <input type = "date" value={startDate} onChange={settingStartDate} className="set" ref={startDateRef} />
                </div>
                <div className = "period">
                    <div className="text">기간</div>
                    <input  value={period} onChange={settingPeriod} className="set" ref={periodRef} />
                </div>
                <div className = "endDate">
                    <div className="text">계약 종료 날짜</div>
                    <input type = "date" value={endDate} onChange={settingEndDate} className="set" ref={endDateRef} />
                </div>
            </div>
            <button className = "button" onClick = {onMakeContract}>거래 시작</button>
        </div>
    )
};
export default MakeContract;