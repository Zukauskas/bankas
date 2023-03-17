import { useContext, useState } from 'react';
import { Global } from './Global';

function Login() {
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { setLogged, setAuthName } = useContext(Global);

  // LOGIN FUNCTION
  const login = () => {
    fetch('http://localhost:3003/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Login success') {
          setLogged(true);
          setName('');
          setPassword('');
          setError(null);
          setAuthName(data.name);
          setUserName(data.name);
        } else {
          setError(true);
          setUserName(null);
        }
      });
  };

  return (
    <div className=''>
      <div className=''>
        <div className=''>
          <div className=''>
            <div className=''>
              {error ? (
                <span
                  style={{
                    color: 'crimson',
                  }}>
                  Login error
                </span>
              ) : (
                <span>Login</span>
              )}
            </div>
            <div className=''>
              <h5 className=''>
                {userName ? (
                  <span>Hello, {userName}</span>
                ) : (
                  <span>Hello, guest</span>
                )}
              </h5>
              <div className=''>
                <label className=''>Name</label>
                <input
                  type='text'
                  className=''
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className=''>
                <label className=''>Password</label>
                <input
                  type='password'
                  className=''
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button className='' onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
