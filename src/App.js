import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './client/components/Chat/Chat';
import Login from './client/components/Login/Login';
import Home from './client/components/Home/Home';
import Sidebar from './client/components/Sidebar/Sidebar';
import Signup from './client/components/Signup/Signup';
import { Signout } from './client/components/Signout/Signout';

import { useState } from 'react';
function App() {
  let [currentUser, setCurrentUser] = useState('');
  let [userChatHistory, setUserChatHistory] = useState('');
  console.log('app currentUser is '+ currentUser);
  let [toUser, setToUser] = useState('');
  console.log('app toUser is '+ toUser);
  return (
    <div className="App">
      <div className="wrapper">
        <Sidebar currentUser={currentUser} setToUser={setToUser} setUserChatHistory={setUserChatHistory}></Sidebar>
        
      </div>
      <div className='rightContainer'>
      <Router >
          <Routes>
          <Route path='/' exact element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path='/user/login' exact element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path='/user/signup' exact element={<Signup/>} />
          <Route path='/login' exact element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path='/signup' exact element={<Signup/>} />
          <Route path='/signout' exact element={<Signout setCurrentUser={setCurrentUser}/>} />
          <Route path='/user/signout' exact element={<Signout setCurrentUser={setCurrentUser}/>} />
          <Route path='/user/:userName' exact element={<Chat currentUser={currentUser} toUser={toUser}/>} />
          <Route path='/user/:fromUserName/:toUserName' exact element={<Chat currentUser={currentUser} toUser={toUser}/>} />
          
          </Routes>
        </Router>
      </div>

      {/* <div class="wrapper"> */}

      {/* <Routes>
          <Route path='/login' exact element={<Login/>} />
          </Routes> */}
    </div>
    // </div>
  );
}

export default App;
