import React from 'react';
import { Navigate } from 'react-router-dom';

const Login = ({ currentUser, setCurrentUser }) => {
  //event handler for login form
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const body = JSON.stringify({
      username: form[0].value,
      password: form[1].value,
    });
    //send post request to '/api/login' with body {username:, password:}
    const response = await fetch('/pokemon/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: body,
    });
    //save result into currentUser state for later use... stretch features?
    const user = await response.json();
    if (response.status === 200) {
      setCurrentUser(user);
    }
  };

  //event hadler for signup form
  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const body = JSON.stringify({
      username: form[0].value,
      password: form[1].value,
    });
    //send post request to '/api/login' with body {username:, password:}
    const response = await fetch('/pokemon/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: body,
    });
    //save result into currentUser state for later use... stretch features?
    const user = await response.json();
    if (response.status === 200) {
      setCurrentUser(user);
    }
  };

  if (currentUser.verified) {
    return <Navigate replace to='/play' />;
  } else {
    return (
      <div className='main'>
        <div id='login'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input name='username' type='text' placeholder='Username'></input>
            <input
              name='password'
              type='password'
              placeholder='Password'
            ></input>
            <input className='submit' type='submit' value='Login'></input>
          </form>
        </div>

        <div id='signup'>
          <h1>Signup</h1>
          <form onSubmit={handleSignup}>
            <input name='username' type='text' placeholder='Username'></input>
            <input
              name='password'
              type='password'
              placeholder='Password'
            ></input>
            <input className='submit' type='submit' value='Signup'></input>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
