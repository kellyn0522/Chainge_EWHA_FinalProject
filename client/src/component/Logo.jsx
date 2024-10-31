import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/");
    }
    return (
        <div className="Logo" onClick = {onClick}>CHAINGE</div>
    );
};

export default Logo;