import React, { Component } from 'react';
import './Login.css';
// import { fetchData, triggerLogIn } from '../../actions/actions';
// import { tryLogin } from '../../services/LoginServices';
import { useLocation,useNavigate } from 'react-router-dom'

import axios from 'axios';
import { useState } from 'react';
// import { useLocation,useNavigate } from 'react-router-dom'

function Login(props) {
  const navigate = useNavigate();
//   let location = useLocation();
  console.log(props);
  // const [userData, setUserData] = useState({ 'name': '', 'species': '' });
  const [logedIn, setLogedIn] = useState(false);
  
//   const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userName = event.target[0].value;
    const password = event.target[1].value;
    const res = await signInUser(userName, password);
    if (res) {
      console.log('login.js setting currentUSerName');
      console.log('signing out '+ userName);
      props.setCurrentUser(userName);
      document.getElementsByClassName('info')[0].innerHTML = ''
      navigate(`/user/${userName}`);
    }
    else {
      console.log('Login failed');
      document.getElementsByClassName('info')[0].innerHTML = 'Login Failed'
    }
    // const message = tryLogin(email, pass, props.setUserData); 
      
    // navigate('/');
  };

  return (
    <>
     
        <div id="loginform">
          <div className="container">
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-md-8 col-md-offset-2">
              <div id="userform">
                <div className="tab-content">
                  <div className="tab-pane fade in" id="login">
                    <h2 className="text-uppercase text-center"> Log in</h2>
                    <form id="login" onSubmit={handleSubmit} >
                      <div className="form-group">
                        <label> UserName<span className="req">*</span> </label>
                        <input  className="form-control" id="email" required data-validation-required-message="Please enter your email address." autocomplete="off" />
                      </div>
                      <div className="form-group">
                        <label> Password<span className="req">*</span> </label>
                        <input type="password" className="form-control" id="password" required data-validation-required-message="Please enter your password" autocomplete="off" />
                      </div>
                      <div className="mrgn-30-top">
                        <button type="submit" className="btn btn-larger btn-block">
                          Log in
                        </button>
                        <h2 className= 'info'></h2>
                        
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>

  );
}

export default Login;

async function signInUser(userName, password){
  console.log('called signin user '+ userName + ' '+ password);
  let config = {headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }};

  return await axios.post(`https://chat-app-backend-one.vercel.app/login`,{'userName': userName, 'password': password},
      {config}).then(response => {
        // Logger.logMessage(JSON.stringify(response.data));
        // console.log('Tree ');
        console.log(response.data);
        return response.data;
      });
}