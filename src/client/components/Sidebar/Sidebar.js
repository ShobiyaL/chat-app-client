import React, { useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';

import { useState } from 'react';
// import io from '/socket.io/socket.io.js';

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://chat-app-backend-one.vercel.app/";
let config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }
};

const Sidebar = (props) => {

  let [allUser, setAllUser] = useState([]);

  function getChatHistory(e){
    console.log('toggled' +e.target.id);
    props.setToUser(e.target.id);  
    // getChat( props.currentUser, e.target.id);
  }
  
  
  console.log('loading  sideBar currentUser ' + props.currentUser);
  console.log('loading  sideBar  allUser' + allUser);
  useEffect(() => {
    getUserNames(setAllUser);
  }, []);

  return (
    <>
      <div class="sidebar">
        <ul>
          {(props.currentUser === undefined || props.currentUser === null ||
            props.currentUser === '') ? (
            <div>
              <li>
                <a href="/login" class="active control-btns">
                  <span class="icon"><i class="fas fa-home"></i></span>
                  <span class="item">Login</span>
                </a>
              </li>
              <li>
                <a href="/signup" class="active control-btns">
                  <span class="icon"><i class="fas fa-home"></i></span>
                  <span class="item">Signup</span>
                </a>
              </li>
            </div>
          ) : (


            <div>
              <li>
                <h3>{props.currentUser}</h3>
                <a href="/signout" class="signout">
                  <span class="icon"><i class="fas fa-home"></i></span>
                  <span class=" signout">SignOut</span>

                </a>
              </li>
              {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
              <script>

              </script> */}
              <li>
                <a class="users-heading">
                  <span class="icon"><i class="fas fa-home"></i></span>
                  <span class="item">Users</span>

                </a>
              </li>
              <div className="user-name-scroll">
              {allUser.map((user) => {
                if (user != '' && user != undefined)
                  return (
                    <>
                      <li>
                        <div   class="user-selection" id={user}>
                          <span class="icon"><i class="fas fa-home"></i></span>
                          <span onClick={getChatHistory.bind(this)} class="user-selection" id={user}>{user}</span>
                        </div>
                      </li>`</>
                  )
              }
              )}
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  )
}

export default Sidebar;

async function getUserNames(setAllUser) {
  // let msg = document.getElementById('message').value;
  const response = await axios.post(`https://chat-app-backend-one.vercel.app/users`, {},
      { config }).catch((err) => {
          console.log("Error: ", err)
      })
  console.log('chat.js getAllUsers ' + response.data);
  setAllUser(response.data);
  return;
}


async function getChat(currentUser, toUser){
  const response = await axios.get(`https://chat-app-backend-one.vercel.app/user/chat`, { 'fromUserName': currentUser, 'toUserName': toUser},
      { config }).catch((err) => {
          console.log("Error: ", err)
      })
  // socket.on('message', 'addMessages')
  console.log('chathistory'+ JSON.stringify(response));
}
