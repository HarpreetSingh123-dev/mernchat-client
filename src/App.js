import './App.css';
import Navigation from './Components/Navigation';
import {BrowserRouter,Route,Router, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login'
import Chat from './Pages/Chat';
import {useSelector} from 'react-redux'
import { useState } from 'react';
import {AppContext , socket} from './Context/appContext'


function App() {

  const [ rooms , setRooms ] = useState([])
  const [ currentRoom , setCurrentRoom ] = useState([])
  const [ members , setMembers ] = useState([])
  const [ messages , setMessages ] = useState([])
  const [ privateMemberMsg , setPrivateMemberMsg ] = useState({})
  const [ newMessages , setNewMessages ] = useState({})

  const user = useSelector( (state) => state.user)
  
  return (
    <AppContext.Provider
      value={{
        socket,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMessages,
        setNewMessages
      }}
    >
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          {!user && (
            <>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
            </>
          )}
          <Route path="/chat" element={<Chat></Chat>}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
