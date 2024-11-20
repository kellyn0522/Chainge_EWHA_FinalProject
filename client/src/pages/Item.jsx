import { useNavigate, useParams } from "react-router-dom";
//import ContractANDChat from "../component/ContractANDChat";
//import Option from "../component/Option";
import Logo from "../component/Logo";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import DeleteItemData from "./DeleteItemData";
import  UserChat  from "../components/chat/UserChat";
import ac from '../icons/ac_unit.svg';
import bed from '../icons/bed.svg';
import blind from '../icons/blinds.svg';
import chair from '../icons/chair.svg';
import chat from '../icons/chat.svg';
import dresser from '../icons/dresser.svg';
import king_bed from '../icons/king_bed.svg';
import refridge from '../icons/kitchen.svg';
import micro from '../icons/microwave.svg';
import single_bed from '../icons/single_bed.svg';
import tv from '../icons/tv.svg';
import weekend from '../icons/weekend_24.svg';
import house from '../icons/house.svg';
import { ChatContext } from "../context/ChatContext";

const Item = () => {
    const [showModalItem, setShowModalItem] = useState(false);
    const handleShowItem = () => setShowModalItem(true);
    const handleCloseItem = () => setShowModalItem(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const { 
        user,
        updaterLike,
    } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);
    const { userChats, isUserChatsLoading, updateCurrentChat, potentialChats, createChat } = useContext(ChatContext);

    //const onHistory = () => {
    //    navigate("/userHistory");
    //}
    const { 
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const [item, setItem] = useState(null)
    const itemHasItems = item?.hasItems? (typeof item.hasItems === 'string'? JSON.parse(item.hasItems): item.hasItems) :null;

    const handleLike = (event) => {
        event.stopPropagation();
        if (user){
            const newLikedState = !liked;
            setLiked(newLikedState);
            updaterLike(id, newLikedState);
        }
    };

    useEffect(() => {
        if (user && item ){
            setLiked(user.likedItemId.includes(id));
        }
    }, [user, item, id]);

    const availableMoveInDate = item&&item.availableMoveInDate? item.availableMoveInDate:null;
    const formattedDate = availableMoveInDate
        ?(availableMoveInDate instanceof Date
            ? availableMoveInDate.toISOString().split('T')[0]
            : (typeof availableMoveInDate === 'string' && !isNaN(new Date(availableMoveInDate)))
            ? new Date(availableMoveInDate).toISOString().split('T')[0]
            : '')
        : '';
    useEffect(() => {
        const fetchItem = async () => {
            if (!findItemError && !isFindItemLoading){
                const result = await findItem(id);
                setItem(result);
            }
        };
        fetchItem();
    }, [findItem, findItemError]);

    if (isFindItemLoading){
        return <div>Loding...</div>
    }
    if (findItemError || !item){
        return <div>Error: {findItemError?.message || 'Page not found'}</div>
    }

    const onClickChat = () => {
        navigate("/chat");
    }

    const onClickUpdate = () => {
        navigate(`/changingItem/${id}`);
    }

    const makeContract = () => {
        if(!isFindItemLoading && !findItemError && item){
            navigate(`/checkIdentity/${id}`);
        }
    }
    const onClickChatInd = (id) => {
        const existingChat = userChats.find(chat => chat.members.includes(id));
        if (existingChat){
            updateCurrentChat(existingChat);
        }else{
            const newChat = createChat(user._id, id);
            updateCurrentChat(newChat);
        }
        return <ChatBox/>
    }
    console.log('!!!!!!!!!!!!!!!!', potentialChats, '!!!!!!!!!!!!!!!!', userChats);

    //<img src = {item.imageFile} style = {{width: '300px', height: 'auto', border: '2px solid #ccc', display: ' block', margin: '0 auto'}} />

    return (<>
        <Container>
            <div className = "logo"><Logo /></div>
                <Row className = "noto-sans-kr" style = {{margin:"10px"}}>
                    <Col>
                        <div className = 'intro'>
                            <img src={item.imageFile || house} alt='house_pic' width = '300px' height = 'auto' style = {{border: '2px solid #ccc', display: ' block', margin: '0 auto'}} onError = {(e) => e.target.src = house}/>
                            <div>
                                <div className = 'introInfo' style = {{marginBottom : '10px'}}>  
                                <h3>
                                    {item.deposit && (
                                        <>
                                            {Math.floor(item.deposit / 10000) > 0 && (
                                                <>{Math.floor(item.deposit / 10000)}억 </>
                                            )}
                                            {item.deposit % 10000 > 0 && (
                                                <>{item.deposit % 10000}만원</>
                                            )}
                                        </>
                                    )}
                                    / {item.housePrice}만원</h3>
                                    <div>{item.location} {item.houseAddress}</div>
                                    <div>{item.type} / {item.area}평</div> 
                                </div>
                                {user? (
                                    user._id !== item.ownerId?(
                                        <>
                                            <div style = {{display : 'flex', alignItems: 'center', gap: '20px', marginBottom : '10px'}}>
                                                <span className={`material-symbols-outlined ${liked? 'liked':'dontlike'}`} style={{cursor: "pointer"}} onClick = {handleLike}>favorite</span>
                                                <img src={chat} alt='chat' width = '30px' height = '30px' style = {{cursor: "pointer"}} onClick = {onClickChat} />
                                                <Button className="noto-sans-kr green" style = {{color: 'white', border: 'none'}} onClick = {makeContract}>거래하기</Button>
                                            </div>
                                        </>
                                    ):(
                                        <>
                                            <div style = {{display : 'flex', alignItems: 'center', gap: '10px', marginBottom : '12px'}}>
                                                <Button className="noto-sans-kr green" style = {{color: 'white', border: 'none'}} onClick = {onClickUpdate}>수정</Button>
                                                <Button className="noto-sans-kr green" onClick = {handleShowItem} style = {{color: 'white', border: 'none'}}>삭제</Button>
                                                <DeleteItemData show={showModalItem} handleClose={handleCloseItem} itemID = {item.itemID} />
                                            </div>
                                        </>
                                    )
                                ): null}
                                <Card className = "information" style={{marginBottom:"10px"}}>
                                    <Card.Title className = "infoTitle">상세 설명</Card.Title>
                                    <Card.Body>
                                        <Card.Text className="infoText">{item.memo}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div> 
                        </div>
                        <div className="all-users">
                            {userChats?.map((chat) => {
                                console.log(chat, chat._id, item.ownerId);
                                if (chat._id === item.ownerId){
                                    <img src={chat} alt='chat' width = '30px' height = '30px' style = {{cursor: "pointer"}} onClick = {() => onClickChatInd(item.ownerId)} />
                        
                            }})}
                            {potentialChats?.map((u) => {
                                console.log(u, u._id, item.ownerId);
                                if (u._id === item.ownerId){
                                    <img src={chat} alt='chat' width = '30px' height = '30px' style = {{cursor: "pointer"}} onClick = {() => onClickChatInd(item.ownerId)} />
                                }})
                            }
                        </div>                        
                        <div style = {{marginTop:'20px'}}>
                            <div className = "optionCard">
                            <Card>
                                <Card.Title className = "infoTitle" >가격 정보</Card.Title>
                                <Card.Body>
                                    <div className="infoText">
                                        {item.deposit && (
                                            <>
                                                {Math.floor(item.deposit / 10000) > 0 && (
                                                    <>{Math.floor(item.deposit / 10000)}억 </>
                                                )}
                                                {item.deposit % 10000 > 0 && (
                                                    <>{item.deposit % 10000}만원 </>
                                                )}
                                            </>
                                        )}
                                        / {item.housePrice}만원
                                    </div>
                                    <div className="infoText">관리비 없음</div>
                                    <div className="infoText">주차 가능</div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Title className = 'infoTitle'>옵션</Card.Title>
                                <Card.Body>
                                    <div className = 'combine-container'>
                                    {itemHasItems && (
                                        <>
                                            {itemHasItems.hasAirConditioner &&(
                                                <div className = 'combine'>
                                                    <img className = 'infoIcon' src={ac} alt='ac' width = '30px' height = '30px' />
                                                    <div>에어컨</div>
                                                </div>
                                            )}
                                            {itemHasItems.hasDresser &&(
                                                <div className = 'combine'>
                                                    <img className = 'infoIcon' src={dresser} alt='dresser' width = '30px' height = '30px' />
                                                    <div>옷장</div>
                                                </div>
                                            )}
                                            {itemHasItems.hasTV &&(
                                                <div className = 'combine'>
                                                    <img className = 'infoIcon' src={tv} alt='tv' width = '30px' height = '30px' />
                                                    <div>TV</div>
                                                </div>
                                            )}
                                            {itemHasItems.hasMicrowave &&(
                                                <div className = 'combine'>
                                                    <img className = 'infoIcon' src={micro} alt='microwave' width = '30px' height = '30px' />
                                                    <div>전자레인지</div>
                                                </div>
                                            )}
                                            {itemHasItems.hasFridge &&(
                                                <div className = 'combine'>
                                                    <img className = 'infoIcon' src={refridge} alt='refridgerator' width = '30px' height = '30px' />
                                                    <div>냉장고</div>
                                                </div>
                                            )}
                                            {itemHasItems.hasSofa &&(
                                                <div className = 'combine'>
                                                    <img className = 'infoIcon' src={weekend} alt='sofa' width = '30px' height = '30px' />
                                                    <div>소파</div>
                                                </div>
                                            )}
                                            {itemHasItems.hasBlinds &&(
                                                <div className = 'combine'>
                                                    <img className = 'infoIcon' src={blind} alt='blind' width = '30px' height = '30px' />
                                                    <div>블라인드</div>
                                                </div>
                                            )}
                                            {itemHasItems.hasChair &&(
                                                <div className = 'combine'>
                                                    <img className = 'infoIcon' src={chair} alt='chair' width = '30px' height = '30px' />
                                                    <div>의자</div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {item?.bedSize &&(
                                        <div className = 'combine'>
                                            <img className = 'infoIcon' src={king_bed} alt='king_bed' width = '30px' height = '30px' />
                                            <div>침대({item.bedSize})</div>
                                        </div>
                                    )}
                                    {item.hasItems? console.log(item.hasItems.hasChair):null}
                                    </div>
                                </Card.Body>
                            </Card> 
                            <Card>
                                <Card.Title className = "infoTitle">보안/안전시설</Card.Title>
                            </Card>
                            <Card>
                                <Card.Title className = "infoTitle">위치 및 주변시설</Card.Title>
                            </Card>
                            </div>
                            <Card className = "information" style={{marginBottom:"30px"}}>
                                <Card.Title className = "infoTitle">상세 정보</Card.Title>
                                <Card.Body className = "info">
                                    {item.buildingName? (
                                        <>
                                            <div className = "infotype">건물 이름</div> 
                                            <div className = "infoName">{item.buildingName}</div>
                                        </>
                                    ):null}
                                    {item.type? (
                                        <>
                                            <div className = "infotype">방 종류(건축물 용도)</div> 
                                            <div className = "infoName">{item.type}</div>
                                        </>
                                    ):null}
                                    {item.floor? (
                                        <>
                                            <div className = "infotype">해당층/건물층</div>
                                            <div className = "infoName">{item.floor}층/50층</div>
                                        </>
                                    ):null}
                                    {item.duplexAvailability !== '' && item.duplexAvailability !== null && item.duplexAvailability !== undefined ?(
                                        <>
                                            <div className = "infotype">복층 여부</div>
                                            <div className = "infoName">{item.duplexAvailability? '복층':'단층'}</div>  
                                        </>
                                    ):null}
                                    <div className = "infotype">전용/계약면적</div>
                                    <div className = "infoName">
                                        {item.exclusiveArea}<span>m<sup>2</sup></span>/ {item.contractArea}<span>m<sup>2</sup></span>
                                    </div>
                                    <div className = "infotype">방 수/욕실 수</div>
                                    <div className = "infoName">{item.room}/{item.bathroom}</div>
                                    {item.facing? (
                                        <>
                                            <div className = "infotype">방향</div>
                                            <div className = "infoName">{item.facing}</div>
                                        </>
                                    ):null}
                                    {item.elevator !== '' && item.elevator !== null && item.elevator !== undefined ? (
                                        <>
                                            <div className = "infotype">엘리베이터</div>
                                            <div className = "infoName">{item.elevator? '있음':'없음'}</div>
                                        </>
                                    ):null}
                                    {item.petFriendly !== '' && item.petFriendly !== null && item.petFriendly !== undefined ? (
                                        <>
                                            <div className = "infotype">반려동물 가능 여부</div>
                                            <div className = "infoName">{item.petFriendly? '가능':'불가능'}</div>
                                        </>
                                    ):null}
                                    {item.number_of_units_in_the_given_area? (
                                        <>
                                            <div className = "infotype">해당 면적 세대수</div>
                                            <div className = "infoName">{item.number_of_units_in_the_given_area}세대</div>
                                        </>
                                    ):null}
                                    {item.total_number_of_units? (
                                        <>
                                            <div className = "infotype">총 세대수</div>
                                            <div className = "infoName">{item.total_number_of_units}세대</div>
                                        </>
                                    ):null}
                                    {item.parkingSpace? (
                                        <>
                                            <div className = "infotype">총 주차대수</div>
                                            <div className = "infoName">{item.parkingSpace}대</div>
                                        </>
                                    ):null}
                                    {formattedDate? (
                                        <>
                                            <div className = "infotype">입주 가능일</div>
                                            <div className = "infoName">{formattedDate}</div>
                                        </>
                                    ):null}
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
        </Container>
    </>)
};
export default Item;
//<Option bedSize={item.bedSize} hasItems={item.hasItems} />
//            <ContractANDChat />