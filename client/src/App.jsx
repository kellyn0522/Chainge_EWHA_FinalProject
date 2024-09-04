/*import{Routes, Route, Navigate} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";


function App(){
  const {user} = useContext(AuthContext);
  return(
  <ChatContextProvider user = {user}>
  <NavBar/>
  <Container> 
      <Routes>
      <Route path="/" element ={user ? <Chat/> : <Login/> } />
      <Route path="/register" element ={user ? <Chat/> : <Register/> } />
      <Route path="/Login" element ={user ? <Chat/> : <Login/> } />
      <Route path="*" element ={<Navigate to ="/"/>} />
    </Routes>
  </Container>

  </ChatContextProvider>
  );
};

export default App;
*/
import React, {useState, useReducer, useEffect, useRef} from "react";
import Home from "./pages/Home";  // import pages
import Mypage from "./pages/Mypage";
import Item from "./pages/Item";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import CreateItemPage from "./pages/CreateItemPage";
import ChangingUserData from "./pages/ChangingUserData";
import Unregister from "./pages/Unregister";
import MakeContract from "./pages/MakeContract";
import ContractList from "./pages/ContractList";
import UserHistory from "./pages/UserHistory";
import{Routes, Route, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";


function itemReducer(state, action) { // item 변수를 변경하는 함수
  switch(action.type){
    case "CREATE": {
      return [action.itemData, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        String(it.keyId) === String(action.itemData.keyId)? 
          {...it, ...action.itemData} : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.itemId) !== String(action.targetId));
    }
    case "INIT": {
      return action.data;
    }
    default: 
      return state;
  }
}
/*
const mockData = [ // 테스트용 user 데이터
  {
    name: "서태웅",
    id: "abcd",
    passWord: "1234",
    keyId: 10000001,
    telNum: 1,
    birth: 111111,
    identityNum:1111111,
    zipCode: 11111,
    email: undefined,
    ownItem: [1,2,3],
    likedItemId: [],
    contracts: []
  },
  {
    name: "강백호",
    id: "efgh",
    passWord: "1234",
    keyId: 10000002,
    telNum: 11,
    birth:111112,
    identityNum:2222222,
    zipCode: 22222,
    email: undefined,
    ownItem: [],
    likedItemId: [1,2,3],
    contracts: [1]
  },
  {
    name: "송태섭",
    id: "ijkl",
    passWord: "1234",
    keyId: 10000003,
    telNum:111,
    birth:111113,
    identityNum:3333333,
    zipCode: 33333, 
    email: undefined,
    ownItem: [1],
    likedItemId: [2,3],
    contracts: [2]
  },
];*/

const mockDataItem = [ // 테스트용 매물 데이터
  {
    location: "서초구",
    detailAdd:"ooo아파트",
    itemId: 1,
    ownerID: 10000003,
    housePrice: 150,
    area: 20,
    type: "아파트",
    memo: "역세권입니다.",
    tenantID: "",
    contractIds: -1,
    bedSize: "Queen",
    hasItems: [1,1,1,1,1,1]
  },
  {
    location: "여의도",
    detailAdd:"ㅁㅁㅁ아파트",
    itemId: 2,
    ownerID: 10000001,
    housePrice: 130,
    area: 25,
    type: "아파트",
    memo: "주변에 맛집이 많습니다.",
    tenantID: "",
    contractIds: -1,
    bedSize: "Single",
    hasItems: [1,1,1,1,1,1]
  },
  {
    location: "청담동",
    detailAdd:"000 고급 아파트",
    itemId: 3,
    ownerID: 10000001,
    housePrice: 300,
    area: 20,
    type: "아파트",
    memo: "근처에 산책하기 좋은 공원이 있습니다.",
    tenantID: "",
    contractIds: -1,
    bedSize: "King",
    hasItems: [1,1,1,1,1,1]
  },
];
/*
const mockDataContract = [ // 테스트용 거래 데이터
  {
    userKeyId: 10000001,
    likedItemId: []
  },
  {
    userKeyId: 10000002,
    likedItemId: [1,2,3]
  },
  {
    userKeyId: 10000003,
    likedItemId: [1,2,3]
  }
]
*/


export const isLoginContext = React.createContext();
export const itemContext = React.createContext();
export const itemDataContext = React.createContext();
export const likeItemContext = React.createContext();
export const ownItemContext = React.createContext();
export const contractContext = React.createContext();

function App() {
  const [isLogin, setIsLogIn] = useState(1);
  const [itemData, dispatchItem] = useReducer(itemReducer, mockDataItem); // 매물 정보를 저장한 변수 배열, 테스트용 데이터로 초기화

  const {user} = useContext(AuthContext);
  
  useEffect(() => { // 데이터 초기화
    dispatchItem({
      type: "INIT",
      data: mockDataItem,
    });
    }, []);
    
  const itemIdRef = useRef(0);

  const likeItem = (array, itemID, targetId) => { // 좋아요
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId: targetId,
        likedItemId: [...array, itemID],
      },
    })
  }

  const cancelLikeItem = (array, itemID, targetId) => { // 좋아요 취소
    const likeItemList = array.filter((it) => it !== itemID);
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId:targetId,
        likedItemId: likeItemList,
      }
    })
  }

  const addOwnItem = (array, itemID, targetId) => { // 매물을 등록
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId: targetId,
        ownItem: [...array, itemID],
      },
    })
  }

  const notOwnItem = (array, itemID, targetId) => { // 매물을 삭제
    const ownItemList = array.filter((it) => it !== itemID);
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId:targetId,
        ownItem: ownItemList,
      }
    })
  }

  const CreateContract = (array, itemID, targetId) => { // 거래
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId: targetId,
        contracts: [...array, itemID],
      },
    })
  }

  const terminateContract = (array, itemID, targetId) => { // 거래 취소
    const contractList = array.filter((it) => it !== itemID);
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId:targetId,
        contracts: contractList,
      }
    })
  }


  const onCreateItem = (location, detailAdd, ownerID, housePrice, area, type, memo, bedSize, hasItems) => { // 매물 생성
      dispatchItem({
        type: "CREATE",
        itemData: {
          location,
          detailAdd,
          ownerID,
          housePrice,
          area,
          type,
          memo,
          bedSize, 
          hasItems,
          itemId: itemIdRef.current,
          tenantID: undefined, 
          contractIds: undefined,
        },
      });
      itemIdRef.current += 1;
  };
  
  const onUpdateItem = (targetId, ownerID, housePrice, type, memo, tenantID, contractIds, bedSize, hasItems) => { // 매물 정보 업데이트
    console.log(targetId, ownerID, housePrice, type, memo, tenantID, contractIds, bedSize, hasItems);
    dispatchItem({
      type: "UPDATE",
      itemData: {
        itemId: targetId,
        ownerID,
        housePrice,
        type,
        memo,
        tenantID,
        contractIds,
        bedSize, 
        hasItems,
      },
    });
  };
  
  const onDeleteItem = (targetId) => { // 매물 정보 삭제
      dispatchItem({
        type: "DELETE",
        targetId,
      });
  };

  return (
   <ChatContextProvider user = {user}>
    <Container> 
      <itemContext.Provider value={{onCreateItem, onUpdateItem, onDeleteItem}}>
        <isLoginContext.Provider value={{isLogin,setIsLogIn}}>
              <itemDataContext.Provider value={itemData}>
                <likeItemContext.Provider value={{likeItem, cancelLikeItem}}>
                  <ownItemContext.Provider value={{addOwnItem, notOwnItem}}>
                    <contractContext.Provider value={{CreateContract, terminateContract}}>
                     <div className="App">
                       <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/mypage" element={<Mypage />} />
                         <Route path="/login" element={<Login />} />
                         <Route path="/item/:id" element={<Item />} />
                         <Route path="/chat" element={<Chat />} />
                         <Route path="/register" element={user? <Home/>:<Register />} />
                         <Route path="/unregister" element={<Unregister />} />
                         <Route path="/createItemPage" element={<CreateItemPage />} />
                         <Route path="/makeContract" element={<MakeContract />} />
                         <Route path="/contractList" element={<ContractList />} />
                         <Route path="/changingUserData" element={<ChangingUserData />} />
                         <Route path="/userHistory" element={<UserHistory />} />
                          <Route path="*" element ={<Navigate to ="/"/>} />
                         </Routes>
                      </div>
                    </contractContext.Provider>
                  </ownItemContext.Provider>
                </likeItemContext.Provider>
              </itemDataContext.Provider>
        </isLoginContext.Provider>
      </itemContext.Provider>   
    </Container>
   </ChatContextProvider>
  );
}

export default App;