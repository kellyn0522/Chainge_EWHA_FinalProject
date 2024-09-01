import { useNavigate, useParams } from "react-router-dom";
import useHouse from "../hooks/useHouse";
import ContractANDChat from "../component/ContractANDChat";
import Option from "../component/Option";
import Logo from "../component/Logo";
import "./Item.css";


const Item = () => { // 매물 정보 페이지
    const navigate = useNavigate();
    const {id} = useParams(); // 매물 아이디별로 다른 페이지 할당
    const item = useHouse(id);

    const onHistory = () => { // 집주인 아이디 클릭시
        navigate("/userHistory"); // 집주인의 거래 기록 페이지로 이동
    }

    return (
        <div className="Item">
            <div className = "logo"><Logo /></div>
            <div className="itemPicture">picture</div>
            <div className="itemInformation">
                <div className="text" onClick = {onHistory}>
                    소유주: {item.ownerID}
                </div>
                <div className="location">
                    <div className="text">
                        {item.location}
                    </div>
                    <div className="text">
                        {item.detailAdd}
                    </div>
                </div>
                <div className="text">
                    월 {item.housePrice}
                </div>
                <div className="text">
                    크기: {item.area}
                </div>
                <div className="text">
                    {item.type}
                </div>
            </div>
            <div className="introduce">
                <div className="introduceTitle">상세설명</div>
                <div className="introduction">*** {item.memo} ***</div>
            </div>
            <Option bedSize={item.bedSize} hasItems={item.hasItems} />
            <ContractANDChat />
        </div>
    )
};
export default Item;