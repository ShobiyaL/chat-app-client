import React, { useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';

import { useState } from 'react';
import './Chat.css';
// import io from '/socket.io/socket.io.js';

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://chat-app-backend-one.vercel.app/";
let config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
    }
};
let previousMsg = '';

const Chat = (props) => {
    let [chatHistories, setChatHistories] = useState([]);
    let [fetchedHistoryForToUser, setFetchedHistoryForToUser] = useState('');
    let [toUser, setToUser] = useState('');
    let chatHistory = [];
    let currentToUser='';
    
    // useEffect(() => {var socket = io();});
    // var socket = io();

    console.log('chatt called, touser'+ props.toUser)
//     if( props.toUser!=null && props.currentUser!=null){
//         console.log('chatt called iffed');
//     // setToUser(props.toUser);
//     getChatHistory(props.currentUser, props.toUser);
// }
if(props.currentUser!=null&& props.currentUser!='' && props.toUser!=null && props.toUser!='' && currentToUser!= props.toUser
&&  fetchedHistoryForToUser!=props.toUser) {
    console.log('chatt called use effect');
    currentToUser=  props.toUser;
    previousMsg = '';
    (async () => {
        document.getElementsByClassName("msg-view-2")[0].innerHTML='';
        await  getChatHistory(props.currentUser, props.toUser);
        // setUsers(users);
      })();

}

const socket = socketIOClient(ENDPOINT);
socket.on("message", data => {
    console.log('chart.js msg received' + data.message);
    console.log('chart.js previuos msg '+ previousMsg);
    if(previousMsg !=  data.message) {
    previousMsg = data.message;
    console.log('chart.js work');
    var first = document.createElement("div");
    first.classList.add('msg-container');
    document.getElementsByClassName("msg-view-2")[0].appendChild(first);
    var second = document.createElement("div");
    second.classList.add('msg-bar');
    first.appendChild(second);

    var from = document.createElement("div");
    from.classList.add('from');
    from.innerHTML =  `From:${data.fromUserName}`;

    var msg = document.createElement("div");
    msg.classList.add('msg');
    msg.innerHTML = ` Message:${data.message}`;
    second.appendChild(from);
    second.appendChild(msg);
    console.log('appended');
    previousMsg = data.message;
    return
    }
    // let newArr = [...chatHistories ,data]
    // setChatHistories.app(newArr)
    // setChatHistories((tableDataSource) => [...tableDataSource, ...data])
    
    // $(".msg-view").append(`<div className='msg-container'>
    // <div className='msg-bar'>
    //     <div className='from'>
    //     From:${data.fromUserName}
    //     </div>
    //     <div className='msg'>
    //     Message:${data.message}
    //     </div>
    // </div>
    // </div>`);
  
    // console.log('prevois msg - '+ previousMsg +' currentMsg - '+ data.message);
    // if(previousMsg!==data.message) {
    // var first = document.createElement("div");
    // first.classList.add('msg-container');
    // document.getElementsByClassName("msg-view-2")[0].appendChild(first);
    // var second = document.createElement("div");
    // second.classList.add('msg-bar');
    // first.appendChild(second);

    // var from = document.createElement("div");
    // from.classList.add('from');
    // from.innerHTML =  `From:${data.fromUserName}`;

    // var msg = document.createElement("div");
    // msg.classList.add('msg');
    // msg.innerHTML = ` Message:${data.message}`;
    // second.appendChild(from);
    // second.appendChild(msg);
    // console.log('appended');
    // previousMsg = data.message;
    // return
    // }

});
    useEffect(() => {
        console.log('chatt called use effect 1');
       
        // getUserNames();
       
    }, []);

    const handleClick = () => {
        console.log('heyyy');
    }

    async function sendMessage() {
        let msg = document.getElementById('message').value;
        console.log(props.currentUser);
        const response = await axios.post(`https://chat-app-backend-one.vercel.app/messages`, { 'fromUserName': props.currentUser, 'toUserName': props.toUser, 'message': msg },
            { config }).catch((err) => {
                console.log("Error: ", err)
            })
        //  getMessages();

    }

    async function getMessages() {
        console.log('Getting messages')
        const response = await axios.get(`https://chat-app-backend-one.vercel.app/messages`,
            { config }).catch((err) => {
                console.log("Error: ", err)
            })
        // socket.on('message', 'addMessages')
        console.log(response);
    }

    async function getChatHistory(currentUser, toUser){
       
        console.log("getchathistory" + currentUser+' '+ toUser);
        const response = await axios.post(`https://chat-app-backend-one.vercel.app/user/chat`, { 'fromUserName': currentUser, 'toUserName': toUser},
            { config }).catch((err) => {
                console.log("Error: ", err)
            })
            // chatHistory.push(response.data);
            const response2 = await axios.post(`https://chat-app-backend-one.vercel.app/user/chat`, { 'fromUserName': toUser, 'toUserName': currentUser},
            { config }).catch((err) => {
                console.log("Error: ", err)
            })
            chatHistory= response.data.concat(response2.data);
        // socket.on('message', 'addMessages')
        setChatHistories(chatHistory);
        setFetchedHistoryForToUser(toUser);
        
        console.log('chathistory'+ JSON.stringify(chatHistory));
    }

    return (
        <>
            <head>
                <script src="/socket.io/socket.io.js"></script>

            </head>
            <div class="container">
                <br />
                <div class="jumbotron">
                    <h1 class="display-4">Send Message to {props.toUser}</h1>
                    <br />
                    <div className='scroll-view'>
                    <div className='msg-view'>
                   {console.log('one '+ chatHistories.length)}
                    { chatHistories.map((data) => {
                  return (
                    <div className='msg-container'>
                    <div className='msg-bar'>
                        <div className='from'>
                        From:{data.fromUserName}
                        </div>
                        <div className='msg'>
                        Message:{data.message}
                        </div>
                    </div>
                    </div>)}
                    )}
                    
                    </div>
                    <div className='msg-view-2'></div>
                    </div>
                    <br />
                </div>


                <div className='msg-sender'>
                    {console.log('chat.js html')}
                    <textarea id="message" class="msg-box" placeholder="Your Message Here"></textarea>
                    <br />
                    <button id="send" class="btn btn-success" onClick={() => sendMessage() }>Send</button>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"> 
    
             </script>
        </>
    )
}

export default Chat