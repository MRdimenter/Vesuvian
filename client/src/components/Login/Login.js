import React, { useState } from 'react';
import './login.css';

export function Login_1() {
  return (
    <div className='login-wrapper'>
      <div className="login-form">
        <h1>Please Log In</h1>
        <form>
          <label>
            <p>Username</p>
            <input type="text" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

async function loginUser() {
  let credentials = {
    client_id: 'app-dev-client',
    username: 'test',
    password: 'test',
    grant_type: 'password'
  };
  /*
  let response = await fetch('http://45.141.103.134:8282/realms/dev/protocol/openid-connect/token', {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    //.then(data => data.json())

    let result = await response.json();
    alert(result.message);
    */

    //let response = await fetch('http://45.141.103.134:8282/realms/dev/login-actions/authenticate', {
      fetch(`http://45.141.103.134:8282/realms/dev/protocol/openid-connect/token`, {
      //mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: `client_id=${credentials.client_id}&username=${credentials.username}&password=${credentials.password}&grant_type=password`
      /*
      body: new URLSearchParams({
        'client_id': credentials.client_id,
        'username': credentials.username,
        'password': credentials.password,
        'grant_type': 'password'
      })
      */
    })

    /*
    .then((response) => {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    }).then((data) => {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    });
    */
    
    .then((response) => {
      
      console.log('Got Response status', response.status);
      console.log('response', response);
      return JSON.stringify(response);
      //return response.json();
    })
    .then((body) => {
      console.log(body);
    })
    

    //const responseJson = await response.json();
    
    /*
    return fetch('http://45.141.103.134:8282/realms/dev/login-actions/authenticate', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
    */
 }
 
 export default function Login({ setToken }) {
   const [username, setUserName] = useState();
   const [password, setPassword] = useState();
 
   const handleSubmit = async e => {
     e.preventDefault();
     loginUser(); 
   }
 
   return(
     <div className="login-wrapper">
       <h1>Please Log In</h1>
       <form onSubmit={handleSubmit}>
         <label>
           <p>Username</p>
           <input type="text" />
         </label>
         <label>
           <p>Password</p>
           <input type="password" />
         </label>
         <div>
           <button type="submit">Submit</button>
         </div>
       </form>
     </div>
   )
 }