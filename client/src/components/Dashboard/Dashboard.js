import './dashboard.css'
import React from 'react';

export const Dashboard = () => {


  const handleSubmit = async (e) => {
    e.preventDefault();

    //getTestDataFromResourceServer(access_token);
  }

  return (
    <div className="regist-wrapper">
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="username" onChange={e => e} />
        </label>
        <label>
          <p>FirstName</p>
          <input type="firstname" onChange={e => e} />
        </label>
        <label>
          <p>Lastname</p>
          <input type="lastname" onChange={e => e} />
        </label>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => e} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => e} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}