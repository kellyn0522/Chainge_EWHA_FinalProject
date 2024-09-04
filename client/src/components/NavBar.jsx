import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatNotification from "./chat/ChatNotification";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const onClickChat = () => {
        navigate("/chat");
    }
    const onClickMypage = () => {
        navigate("/mypage");
    }
    
    const { recipientUser } = useContext(AuthContext);
    
    return (
        <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
            <Container>
                <h2>
                    <Link to="/" className="link-light text-decoration-none">
                        문방구
                    </Link>
                </h2>
                { user && ( <span className="text-warning">Hello {user?.nickName} ! </span> )}
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {
                            user && (<>
                            <ChatNotification/>
                                <Link onClick={() => logoutUser()} to="/login" className="link-light text-decoration-none">
                                    Logout
                                </Link>
                                <div className = "userData"> 
                                    <button onClick={onClickMypage}>마이페이지</button>                                    
                                    <button onClick={onClickChat}>채팅</button>
                                </div>
                            </>)
                        }
                        {!user && (<>
                            <Link to="/login" className="link-light text-decoration-none">
                                Login
                            </Link>
                            <Link to="/register" className="link-light text-decoration-none">
                                Register
                            </Link>
                        </>)}

                    </Stack>
                </Nav>
            </Container>

        </Navbar>);
};

export default NavBar;

