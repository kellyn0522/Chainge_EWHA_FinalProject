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
import { AuthItemContext } from "./context/AuthItemContext";
import { ChatContextProvider } from "./context/ChatContext";
import DeleteItemData from "./pages/DeleteItemData";
import ChangingItemData from "./pages/ChangingItemData";
import "./pont.css";
import "./icons.css";

function App() {
  const {user} = useContext(AuthContext);

  return (
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
                         <Route path="/makeContract/:id" element={<MakeContract />} />
                         <Route path="/contractList" element={<ContractList />} />
                         <Route path="/changingUserData" element={<ChangingUserData />} />
                         <Route path="/userHistory" element={<UserHistory />} />
                          <Route path="*" element ={<Navigate to ="/"/>} />
                         </Routes>
                      </div>
                   
    </Container>
   </ChatContextProvider>
  );
}

export default App;