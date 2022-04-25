import React from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import "./LoginGoogle.css"
import { useHistory} from 'react-router-dom';
import { useState } from 'react';

// const clientId = "82246165511-2k49vbsb3k8uu1lto6f2e0pr4rhepgq9.apps.googleusercontent.com";
const LoginGoogle = () => {
  
const [clientId, setClientId] = useState("82246165511-2k49vbsb3k8uu1lto6f2e0pr4rhepgq9.apps.googleusercontent.com")
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const onLoginSuccess = (res) => {
      console.log('Login Success:', res.profileObj);
      setShowloginButton(false);
      setShowlogoutButton(true);
  };

  const onLoginFailure = (res) => {
      console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
      alert("You have been logged out successfully");
      console.clear();
      setShowloginButton(true);
      setShowlogoutButton(false);
    
  };

  return (
      <div>
          { showloginButton ?
              <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign In"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                  
              ></GoogleLogin> : null}

          { showlogoutButton ?
              <GoogleLogout
                 clientId={clientId}                  
                 buttonText="Sign Out"
                  onLogoutSuccess={onSignoutSuccess}
                  onFailure={onSignoutSuccess}
                  isSignedIn={false}
              >
              </GoogleLogout> : null
          }
      </div>
  );
}

export default LoginGoogle