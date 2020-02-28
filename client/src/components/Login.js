import React, { useRef }  from "react";
import axios from "axios";

const Login = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

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

