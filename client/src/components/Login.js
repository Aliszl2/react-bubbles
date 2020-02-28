import React, { useRef }  from "react";
import axios from "axios";
import {axiosWithAuth} from '../auth/axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const usernameRef = useRef();
  const passwordRef = useRef();
  return (
    <>
        <h1>Welcome to the Bubble App!</h1><br/>
      <div className="login">
      <div className="login-inputs">
        username <input ref={usernameRef} type="text" />
        <br />
        password <input ref={passwordRef} type="text" />
      </div>

      <div>
        <button >Submit</button>
      </div>
    </div>
    
    </>
  );
};

export default Login;
