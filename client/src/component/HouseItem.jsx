import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import { Card,Badge } from "react-bootstrap";
import DeleteItemData from "../pages/DeleteItemData";
import house from '../icons/house.svg';
//import "./HouseItem.css";


const HouseItem = ({itemId}) => {
    const navigate = useNavigate();
    const { 
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const { 
        user,
        updaterLike,
    } = useContext(AuthContext);
    const [item, setItem] = useState(null);
    const [liked, setLiked] = useState(false);
    const [showModalItem, setShowModalItem] = useState(false);
    const handleShowItem = (event) => {
        event.stopPropagation();
        setShowModalItem(true);
    }
    const handleCloseItem =  (event) => {
        event.stopPropagation();
        setShowModalItem(false);
    }
    const handleLike = (event) => {
        event.stopPropagation();
        if (user){
            const newLikedState = !liked;
            setLiked(newLikedState);
            updaterLike(itemId, newLikedState);
        }
    };

    useEffect(() => {
        if (user && item ){
            setLiked(user.likedItemId.includes(itemId));
        }
    }, [user, item, itemId]);

    useEffect(() => {
        const fetchItem = async () => {
            if (!findItemError && !isFindItemLoading){
                const result = await findItem(itemId);
                setItem(result);
            }
        };
        fetchItem();
    }, [findItem, findItemError]);

    console.log(item)
    const goToItem = () => {
        if(!isFindItemLoading && !findItemError && item){
            navigate(`/item/${item.itemID}`);
        }
    }

    if (isFindItemLoading){
        return <div>Loding...</div>
    }
    if (findItemError || !item){
        return <div>Error: {findItemError?.message || 'Item not found'}</div>
    }

    const onClickUpdate = (event) => {
        event.stopPropagation();
        navigate(`/changingItem/${item.itemID}`);
    }
                          
    return (
        <Card className = 'houseItem' style = {{ width : '200px' }} onClick = {goToItem}>
            <div style = {{position: 'relative', display: 'inline-block'}}>
                <img src={house} alt='house_pic' width = '200px' height = '150px' style = {{border: '2px solid #ccc', display: ' block', alignItems:'flex-start'}}/>
                <div style = {{ position: 'absolute', top: '10px', left:'160px'}}>
                    {user? (
                        user._id !== item.ownerId?(
                        <>
                            <span className={`material-symbols-outlined ${liked? 'liked':'dontlike'}`} style={{cursor: "pointer"}} onClick = {handleLike}>favorite</span>
                        
                        </>
                        ):(
                        <>
                            <div style = {{display : 'flex', displayDirection: 'column', alignItems: 'center', gap: '10px', marginBottom : '12px'}}>
                                <Badge className="noto-sans-kr bg-primary" style={{cursor: "pointer"}} onClick = {onClickUpdate}>수정</Badge>
                                <Badge className="noto-sans-kr bg-secondary" style={{cursor: "pointer"}} onClick = {handleShowItem}>삭제</Badge>
                                <DeleteItemData show={showModalItem} handleClose={handleCloseItem} itemID = {item.itemID} />
                            </div>
                        </>
                        )
                    ): null}
                </div>
            </div>
            <Card.Body className = "noto-sans-kr">
                <Card.Text>
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
                </Card.Text>
                <Card.Text>{item.location} {item.houseAddress}</Card.Text>
                <Card.Text>{item.area}평 {item.type}</Card.Text>
            </Card.Body>
        </Card>
    )
};

export default HouseItem;