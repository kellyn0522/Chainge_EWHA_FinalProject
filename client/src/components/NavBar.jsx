import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatNotification from "./chat/ChatNotification";
import { useNavigate } from "react-router-dom";
import chat from '../icons/chat.svg';

const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onClickChat = () => {
        navigate("/chat");
    }
    const onClickMypage = () => {
        navigate("/mypage");
    }
    const onClickLogout = () => {
        alert("로그아웃 되었습니다.");
        logoutUser();
    }
    //<Link to="/" className="link-light text-decoration-none"></Link>
    //<ChatNotification/>
    const { recipientUser } = useContext(AuthContext);
    
    return (
        <Navbar className="mb-4" style={{ height: "3.75rem", alignItems:"center", marginTop:'20px'}}>
            <Container className='d-flex justify-content-between align-items-csnter'>
                <h2 className="gugi-regular mb-0" >
                    CHAINGE
                </h2>
                <Nav>
                    <Stack className='align-items-csnter' direction="horizontal" gap={3}>
                        {
                            user && (<>
                                <Link onClick={onClickLogout} to="/" className="gugi-regular text-decoration-none" style = {{color : 'black'}}>
                                    Logout
                                </Link>
                                <img src={chat} alt='chat' width = '30px' height = '30px' style = {{cursor: "pointer"}} onClick = {onClickChat} />
                                { user && ( <span className="noto-sans-kr">{user?.nickName}</span> )}
                                <span className="material-symbols-outlined size-40" style = {{cursor: "pointer"}} onClick={onClickMypage}>account_circle</span>
                            </>)
                        }
                        {!user && (<>
                            <Link to="/login" className="gugi-regular text-decoration-none" style = {{color : 'grey'}}>
                                Login
                            </Link>
                            <Link to="/register" className="gugi-regular text-decoration-none" style = {{color : 'grey'}}>
                                Register
                            </Link>
                        </>)}

                    </Stack>
                </Nav>
            </Container>

        </Navbar>);
};

export default NavBar;

