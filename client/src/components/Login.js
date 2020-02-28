import React, { useRef }  from "react";
import axios from "axios";
// import {axiosWithAuth} from '../auth/axiosWithAuth';
// import {useHistory} from "react-router-dom"

const Login = (props) => {
  console.log(props);
  // const history =useHistory();
  const usernameRef = useRef();
  const passwordRef = useRef();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const submit = () => {
    
    axios
      .post("http://localhost:5000/api/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      })
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
           props.history.push("/BubblePage");
      })
      .catch(error => {
        console.log(error.message);
      });
  };
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
        <button onClick={submit}>Submit</button>
      </div>
    </div>
    </>
  );
};

export default Login;

