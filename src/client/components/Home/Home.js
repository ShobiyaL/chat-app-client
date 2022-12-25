// import React, { useEffect } from 'react';
// import axios from 'axios';
// import './Home.css';
// // import io from '/socket.io/socket.io.js';

// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:3001";
// let config = {
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': '*',
//     }
// };

// const Home = () => {
//     // useEffect(() => {var socket = io();});
//     // var socket = io();
//     useEffect(() => {
//         const socket = socketIOClient(ENDPOINT);
//         socket.on("message", data => {
//             console.log('chart.js msg received' + data.message);
//         });
//     }, []);

//     const handleClick = () => {
//         console.log('heyyy');
//     }

//     async function sendMessage() {
//         let msg = document.getElementById('message').value;
//         console.log(msg);
//         const response = await axios.post(`http://localhost:3001/messages`, { 'message': msg },
//             { config }).catch((err) => {
//                 console.log("Error: ", err)
//             })
//         getMessages();

//     }

//     async function getMessages() {
//         console.log('Getting messages')
//         const response = await axios.get(`http://localhost:3001/messages`,
//             { config }).catch((err) => {
//                 console.log("Error: ", err)
//             })
//         // socket.on('message', 'addMessages')
//         console.log(response);
//     }

//     return (
//         <>
//                 <div class="sidebar">
//                 <ul>
//                 <li>
//                     <a href="login" class="active">
//                         <span class="icon"><i class="fas fa-home"></i></span>
//                         <span class="item">Login</span>
//                     </a>
//                 </li>
//                 </ul>
//                 </div>
//         </>
//     )
// }

// export default Home