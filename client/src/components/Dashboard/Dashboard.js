import './dashboard.scss'

export const Dashboard = () => {  //TODO rename

  const handleSubmit = async (e) => {
    e.preventDefault();
    //getTestDataFromResourceServer(access_token);
  }

  return (
    <div className="registration-wrapper">
      <div className="registration-form">
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
          <div className='registration-button-wrapper'>
            <button className='registration-button1' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}