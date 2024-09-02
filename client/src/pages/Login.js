import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from '../helpers/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthState} = useContext(AuthContext);

  const navigate = useNavigate();  

  const login = () => {
    const data = { UserName: username, Password: password };
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      if(response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem('accessToken', response.data.token);
        setAuthState({UserName: response.data.UserName,
          id: response.data.id,
          status: true});
        navigate('/');  
      }
    });
  };

  return (
    <div className="LoginPage">
      <div className="card">
        <label>Username</label>
        <input
          type="text" autoComplete='off'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          id="inputLogin"
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          id="inputLogin"
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
