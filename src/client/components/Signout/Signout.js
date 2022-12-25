import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export function Signout(props) { 
  let [signedUp, setSignedUp] = useState('');
  console.log('signing out');
props.setCurrentUser(undefined);
}