import {useEffect, useState, useContext} from "react";
import Logo from "../component/Logo";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container, Stack, Form } from "react-bootstrap";
import LinkingAccount from './LinkingAccount';
import LinkingMetaMask from './LinkingMetaMask';
import { ReqContext } from "../context/ReqContext";

const CheckIdentity = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {id, type} = useParams();
    const isOwner = type==='true';
    const {contractInfo} = location.state?location.state : {};
    const { 
        user
    } = useContext(AuthContext);
    const [checked, setChecked] = useState(false);
    const [account, setAccount] = useState(user?.account);
    const [metaMask, setMetaMask] = useState(user?.metaMaskAdd);
    const {updateAccept} = useContext(ReqContext);

    const [userInfo, setUserInfo] = useState({
        tenantID: user._id,
        tenantphoneNum: user.phoneNumber || '',
        tenantBirth:user.birth || '',
        tenantidentityNum: user.identityNum || '',
        tenantAccount: user.account||'',
        tenantMetamask: user.metaMaskAdd||'',
    });

    useEffect(()=>{
        if (user.account){
            setAccount(true);
        } else{
            setAccount(false);
        }
    },[user.account]);

    useEffect(()=>{
        if (user.metaMaskAdd){
            setMetaMask(true);
        } else{
            setMetaMask(false);
        }
    },[user.metaMaskAdd]);

    useEffect(()=>{
        setUserInfo((prev) => ({
            ...prev, 
            tenantAccount: user.account||'',
            tenantMetamask: user.metaMaskAdd||'',
        }));
    },[user?.account, user?.metaMaskAdd])


    console.log("infomation!!!!!!!!!!!", userInfo);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const handleAccountShow = () => setShowAccountModal(true);
    const handleAccountClose = () => {
        setShowAccountModal(false);
        if (user.account){
            setAccount(true);
        }
        setUserInfo((prev) => ({...prev, tenantAccount: user.account||''}));
    }

    const [showMetaMaskModal, setShowMetaMaskModal] = useState(false);
    const handleMetaMaskShow = () => setShowMetaMaskModal(true);
    const handleMetaMaskClose = () => {
        setShowMetaMaskModal(false);
        if(user.metaMask){
            setMetaMask(true);
        }
        setUserInfo((prev) => ({...prev, tenantMetamask: user.metaMaskAdd||''}));
    }
    
    if (!user){
        return <div>잘못된 접근입니다.</div>
    }

    const updateCheck = () => {
        setChecked(true);
    }

    const reqContract = () => {
        navigate(`/reqContract/${id}`);
    }

    
    const acceptContract = async()=>{
        if(isOwner){
        const updatedInfo= {
            ...contractInfo,

            landlordID: user?._id,
            landlordphoneNum: user?.phoneNumber,
            landlordBirth: user?.birth,
            landlordIdentityNum: user?.identityNum,
            landlordMetamaskAdd: user?.metaMaskAdd,
            landlordAccount: user?.account,
            landlordname: user?.name,
            landlordzipcode: user?.zipCode,
        };
        console.log('CCCCCCCCCCCCCCCCC',updatedInfo);
        await updateAccept(id);
        navigate(`/makeContract/${id}`, {state: {updatedInfo}});
    }else{
            console.log('User is not the owner');
        }
    };

    const goToItem = () => {
        navigate(`/item/${id}`);
    }

    return (<>
        <div>
            <div className = "logo"><Logo /></div>
            <Form className = 'noto-sans-kr'>
                <Row style={{
                    height: "100%",
                    justifyContent: "Center",
                    paddingTop: "10px",
                    paddingBottom:"10%"
                }}>
                    <Col xs={8}>
                        <Stack gap={3}>
                            <h2 style={{marginBottom: '50px'}}>본인 인증</h2>
                            <div style={{display:'flex', flexDirection:'column', gap:'25px'}}>
                            <Form.Control 
                                type="text" 
                                placeholder={user.name} 
                                disabled 
                            />
                            <Form.Control 
                                type="email" 
                                placeholder={user.email} 
                                disabled 
                            />
                            <div style = {{display:'flex', gap:'10px'}}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="생년월일" 
                                    maxLength="6"
                                    onChange={(e) => setUserInfo
                                        ({ ...userInfo, tenantBirth: e.target.value })}
                                />
                                <div>-</div>
                                <Form.Control 
                                    type="password" 
                                    placeholder="주민등록번호" 
                                    maxLength="7"
                                    onChange={(e) => setUserInfo
                                        ({ ...userInfo, tenantidentityNum: e.target.value })}
                                />
                            </div>
                            <div style = {{display:'flex', gap:'10px'}}>
                                <Form.Control
                                type="tel"
                                placeholder="Phone Number"
                                maxLength="13"
                                onChange={(e) => setUserInfo
                                    ({ ...userInfo, tenantphoneNum: e.target.value })}
                                />
                                <Button className = {checked?'green':'lightBlue'} style = {{color: 'white', border: 'none', width : '140px'}} onClick = {updateCheck}>{!checked?'인증':'인증 완료'}</Button>
                            </div>
                            <div style = {{display:'flex', alignItems: 'center', gap: '30px'}}>
                                <div >계좌 연결 상태: </div>
                                <div className={account?'blueFont':'skyblueFont'}>{account?"계좌 연결이 완료되었습니다.":"계좌 연결이 필요합니다."}</div>
                                {!account && (<Button className = {account?'green':'skyblue'} style = {{color: 'white', border: 'none', width : '120px'}} onClick = {handleAccountShow}>계좌 연결</Button>)}  
                                <LinkingAccount show={showAccountModal} handleClose={handleAccountClose}/>
                            </div>
                            <div style = {{display:'flex', alignItems: 'center', gap: '30px'}}>
                                <div >이더리움 주소: </div>
                                <div className={metaMask?'blueFont':'skyblueFont'}>{metaMask?user.metaMaskAdd:"이더리움 주소 등록이 필요합니다."}</div>
                                {!metaMask && (<Button className = {metaMask?'green':'skyblue'} style = {{color: 'white', border: 'none', width : '120px'}} onClick = {handleMetaMaskShow}>등록 하기</Button>)}  
                                <LinkingMetaMask show={showMetaMaskModal} handleClose={handleMetaMaskClose}/>
                            </div>
                            </div>         
                            <div>
                                {isOwner?(
                                    <>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'30px'}}>
                                            <Button style = {{color: 'white', border: 'none', backgroundColor: '#002D72', width: '500px', opacity: checked&&account&&metaMask? 1: 0.6}} disabled = {!checked||!account||!metaMask} onClick = {acceptContract}>다음</Button>
                                        </div>
                                    </>
                                ):(
                                    <>
                                        <div className='contractButton' style={{marginTop: '40px'}}>
                                            <Button style = {{backgroundColor: '#5B6A82', color: 'white', border: 'none', marginTop: '5px', width: '110px'}} onClick = {goToItem}>뒤로가기</Button>
                                            <Button style = {{color: 'white', border: 'none', backgroundColor: '#002D72', width: '110px', opacity: checked&&account&&metaMask? 1: 0.6}} disabled = {!checked||!account||!metaMask} onClick = {reqContract}>다음</Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    </>);
};
export default CheckIdentity;