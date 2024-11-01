import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/");
    }
    return (
        <div className="gugi-regular" style={{size: '50px', marginTop: '30px', marginLeft: '20px', marginBottom: '30px'}} onClick = {onClick}>CHAINGE</div>
    );
};

export default Logo;