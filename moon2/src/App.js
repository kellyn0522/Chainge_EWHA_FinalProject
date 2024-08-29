import './App.css';
import { Routes, Route } from "react-router-dom";
import React, {useState, useReducer, useEffect, useRef} from "react";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import Item from "./pages/Item";
import FindId from "./pages/FindId";
import FindPW from "./pages/FindPW";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import CreateItemPage from "./pages/CreateItemPage";
import ChangingUserData from "./pages/ChangingUserData";
import Unregister from "./pages/Unregister";
import MakeContract from "./pages/MakeContract";
import ContractList from "./pages/ContractList";
import UserHistory from "./pages/UserHistory";


function userReducer(state, action) {
  switch(action.type){
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        it.keyId === action.data.keyId? 
          {...it, ...action.data} : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.keyId) !== String(action.targetId));
    }
    case "INIT": {
      return action.data;
    }
    case "CHANGE": {
      return state.map((it) =>
        it.keyId === action.data.keyId? 
          {...it, ...action.data} : it
        );
    }
    default: 
      return state;
  }
}

function itemReducer(state, action) {
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

function logReducer(state, action) {
  switch(action.type){
    case "LOGIN": {
      return state = [1, action.data];
    }
    case "LOGOUT": {
      return state = [0, action.data];
    }
    case "INIT": {
      return action.data;
    }
    default: 
      return state;
  }
}

const mockData = [
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
];

const mockDataItem = [
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
const mockDataContract = [
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
export const setLoginContext = React.createContext();
export const userContext = React.createContext();
export const userDataContext = React.createContext();
export const itemContext = React.createContext();
export const itemDataContext = React.createContext();
export const likeItemContext = React.createContext();
export const ownItemContext = React.createContext();
export const contractContext = React.createContext();

function App() {
  const [isLogin, dispatchLog] = useReducer(logReducer, [1, 10000003]);
  // [0, undefind]);
  const [userData, dispatchUser] = useReducer(userReducer, mockData);
  const [itemData, dispatchItem] = useReducer(itemReducer, mockDataItem);

  
  useEffect(() => {
    dispatchLog({
      type: "INIT",
      data: [1, 10000003],
      //data: [0, undefined],
    });
    dispatchUser({
      type: "INIT",
      data: mockData,
    });
    dispatchItem({
      type: "INIT",
      data: mockDataItem,
    });
    }, []);
    
  const userIdRef = useRef(0);
  const itemIdRef = useRef(0);

  const likeItem = (array, itemID, targetId) => {
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId: targetId,
        likedItemId: [...array, itemID],
      },
    })
  }

  const cancelLikeItem = (array, itemID, targetId) => {
    const likeItemList = array.filter((it) => it !== itemID);
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId:targetId,
        likedItemId: likeItemList,
      }
    })
  }

  const addOwnItem = (array, itemID, targetId) => {
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId: targetId,
        ownItem: [...array, itemID],
      },
    })
  }

  const notOwnItem = (array, itemID, targetId) => {
    const ownItemList = array.filter((it) => it !== itemID);
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId:targetId,
        ownItem: ownItemList,
      }
    })
  }

  const CreateContract = (array, itemID, targetId) => {
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId: targetId,
        contracts: [...array, itemID],
      },
    })
  }

  const terminateContract = (array, itemID, targetId) => {
    const contractList = array.filter((it) => it !== itemID);
    dispatchUser({
      type: "CHANGE",
      data: {
        keyId:targetId,
        contracts: contractList,
      }
    })
  }

  const setIsLogin = (currentUser) => {
    dispatchLog({
      type: "LOGIN",
      data: currentUser,
    });
  };

  const setIsLogOut = () => {
    dispatchLog({
      type: "LOGOUT",
      data: undefined,
    });
  };

  const onCreateUser = (name, id, passWord, telNum, birth, identityNum, zipCode, email) => {
    dispatchUser({
      type: "CREATE",
      data: {
        name,
        id,
        passWord,
        telNum,
        keyId: userIdRef.current,
        birth,
        identityNum,
        zipCode,
        email,
        ownItem: [],
        likedItemId: [],
        contracts: [],
      },
    });      
    userIdRef.current += 1;
  };
    
  const onUpdateUser = (keyID, settedPW, userName, userPhoneNum, birth, zipCode, email) => {
    dispatchUser({
      type: "UPDATE",
      data: {
        name: userName,
        passWord: settedPW,
        keyId: keyID,
        telNum: userPhoneNum,
        birth: birth,
        zipCode: zipCode,
        email: email,
      },
    });
  };
    
  const onDeleteUser = (targetId) => {
    dispatchUser({
      type: "DELETE",
      targetId,
    });
  };

  const onCreateItem = (location, detailAdd, ownerID, housePrice, area, type, memo, bedSize, hasItems) => {
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
  
  const onUpdateItem = (targetId, ownerID, housePrice, type, memo, tenantID, contractIds, bedSize, hasItems) => {
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
  
  const onDeleteItem = (targetId) => {
      dispatchItem({
        type: "DELETE",
        targetId,
      });
  };

  return (
    <userContext.Provider value={{onCreateUser, onUpdateUser, onDeleteUser}}>
      <itemContext.Provider value={{onCreateItem, onUpdateItem, onDeleteItem}}>
        <isLoginContext.Provider value={isLogin}>
          <setLoginContext.Provider value={{setIsLogin, setIsLogOut}}>
            <userDataContext.Provider value={userData}>
              <itemDataContext.Provider value={itemData}>
                <likeItemContext.Provider value={{likeItem, cancelLikeItem}}>
                  <ownItemContext.Provider value={{addOwnItem, notOwnItem}}>
                    <contractContext.Provider value={{CreateContract, terminateContract}}>
                     <div className="App">
                       <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/mypage" element={<Mypage />} />
                         <Route path="/findId" element={<FindId />} />
                         <Route path="/findPW" element={<FindPW />} />
                         <Route path="/login" element={<Login />} />
                         <Route path="/signUp" element={<SignUp />} />
                         <Route path="/item/:id" element={<Item />} />
                         <Route path="/chat" element={<Chat />} />
                         <Route path="/unregister" element={<Unregister />} />
                         <Route path="/createItemPage" element={<CreateItemPage />} />
                         <Route path="/makeContract" element={<MakeContract />} />
                         <Route path="/contractList" element={<ContractList />} />
                         <Route path="/changingUserData" element={<ChangingUserData />} />
                         <Route path="/userHistory" element={<UserHistory />} />
                       </Routes>
                      </div>
                    </contractContext.Provider>
                  </ownItemContext.Provider>
                </likeItemContext.Provider>
              </itemDataContext.Provider>
            </userDataContext.Provider>
          </setLoginContext.Provider>
        </isLoginContext.Provider>
      </itemContext.Provider>
    </userContext.Provider>
  );
}

export default App;