import React from 'react';
import '../Login/Login.css';
import './Signup.css';
import { useState } from 'react';
import axios from 'axios';

function Signup(props) { 
  let [signedUp, setSignedUp] = useState('');

  const handleSubmit = async (event) => { 
  event.preventDefault();
  const userName = event.target[0].value;
  const password = event.target[1].value;
  console.log(userName, password);  
  
  let response = await registerUser(userName,password);
if (!response) {
  setSignedUp('Something wrong, pls try again');
  // document.getElementById('helperText').innerHTML = 'Something wrong, pls try again'
} else {
  setSignedUp('registered successfully');
  // document.getElementById('helperText').innerHTML = 'registered successfully';
}
//   createUser({'userName': userName, 'password': password});
}
      
        return (
            <div className="signupbody">
            <div id="signupform" className='tab-content'>
                <div className="signupform tab-pane fade active in" id="signup">
                      <h2 className="text-uppercase text-center"> Sign Up for Free</h2>
                      <form id="signup" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-xs-12 col-sm-6">
                            <div className="form-group">
                              <label>User Name<span className="req">*</span> </label>
                              <input type="text" className="form-control" id="first_name" required data-validation-required-message="Please enter your name." autocomplete="off"/>
                              <p className="help-block text-danger"></p>
                            </div>
                          </div>
                        </div>
                       <div className="form-group">
                          <label> Password<span className="req">*</span> </label>
                          <input type="password" className="form-control" id="password" required data-validation-required-message="Please enter your password" autocomplete="off"/>
                          <p className="help-block text-danger"></p>
                        </div>
                        <div className="mrgn-30-top">
                          <button type="submit" className="btn btn-larger btn-block">
                          Sign up
                          </button>
                          <h3 className = 'helperText'>{signedUp}</h3>
                          <h3 className = {signedUp.status}>{signedUp.message}</h3>
                        </div>
                      </form>
                    </div>
                
            </div>
            </div>
        );
}

export default Signup;

async function registerUser(userName, password){
    let config = {headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }};

    return await axios.post(`https://chat-app-backend-one.vercel.app/signup`,{'userName': userName, 'password': password},
        {config}).then(response => {
          // Logger.logMessage(JSON.stringify(response.data));
          // console.log('Tree ');
          console.log(response.data);
          return response.data;
        });
}