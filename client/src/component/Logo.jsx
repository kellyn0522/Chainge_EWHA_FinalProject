import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/");
    }
    return (
        <div className="Logo" onClick = {onClick}>문방구</div>
    );
};

export default Logo;