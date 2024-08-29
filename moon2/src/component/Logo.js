import "./Logo.css";
import { useNavigate } from "react-router-dom";

const Logo = () => { // 로고
    const navigate = useNavigate();
    const onClick = () => { // 로고 클릭 시
        navigate("/"); // 홈으로 이동
    }
    return (
        <div className="Logo" onClick = {onClick}>문방구</div>
    );
};

export default Logo;