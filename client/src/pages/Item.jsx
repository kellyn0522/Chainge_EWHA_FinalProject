import { useNavigate, useParams } from "react-router-dom";
import useHouse from "../hooks/useHouse";
import ContractANDChat from "../component/ContractANDChat";
import Option from "../component/Option";
import Logo from "../component/Logo";



const Item = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const item = useHouse(id);

    const onHistory = () => {
        navigate("/userHistory");
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