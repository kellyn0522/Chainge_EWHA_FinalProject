import React, {useState, createContext} from "react";
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
import ContractPage from "./pages/ContractPage";
import UserHistory from "./pages/UserHistory";
import{Routes, Route, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AuthItemContext } from "./context/AuthItemContext";
import { ChatContextProvider } from "./context/ChatContext";
import DeleteItemData from "./pages/DeleteItemData";
import ChangingItemData from "./pages/ChangingItemData";
import MyItem from "./pages/MyItem";
import LikedItem from "./pages/LikedItem";
import CheckIdentity from "./pages/CheckIdentity";
import "./pont.css";
import "./icons.css";
import SearchMap from "./component/SearchMap";
import ReqPage from "./pages/ReqPage";
import RequestContract from "./pages/RequestContract";

export const ContractContext = createContext();

function App() {
  const {user} = useContext(AuthContext);
  const [contract, setContract] = useState([]);

  return (
  <ContractContext.Provider value = {{contract, setContract}}>
   <ChatContextProvider user = {user}>
    <Container> 
                     <div className="App">
                       <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/mypage" element={<Mypage />} />
                         <Route path="/login" element={user? <Home/>:<Login />} />
                         <Route path="/item/:id" element={<Item />} />
                         <Route path="/deleteItem" element={<DeleteItemData />} />
                         <Route path="/changingItem/:id" element={<ChangingItemData />} />
                         <Route path="/chat" element={<Chat />} />
                         <Route path="/register" element={user? <Home/>:<Register />} />
                         <Route path="/createItemPage" element={<CreateItemPage />} />
                         <Route path="/makeContract/:otherUser/:id/:type" element={<MakeContract />} />
                         <Route path="/ContractPage/:otherUser/:id/:type" element={<ContractPage />} />
                         <Route path="/changingUserData" element={<ChangingUserData />} />
                         <Route path="/userHistory" element={<UserHistory />} />
                         <Route path="/checkIdentity/:id/:type" element={<CheckIdentity />} />
                         <Route path="/reqContract/:id" element={<RequestContract />} />
                         <Route path="/reqPage/:otherUser/:id/:type" element={<ReqPage />} />
                         <Route path="/searchMap" element={<SearchMap />} /> {/* Add SearchMap Route */}
                          <Route path="*" element ={<Navigate to ="/"/>} />
                         </Routes>
                      </div>             
    </Container>
   </ChatContextProvider>
   </ContractContext.Provider>
  );
}

export default App;