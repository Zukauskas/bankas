import { useContext, useState } from 'react';
import { Global } from './Global';

function Login() {
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { setLogged, setAuthName, setRoute } = useContext(Global);

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
        if (data.message === 'Login success') {
          setLogged(true);
          setRoute('accounts');
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
    <div className='container mx-auto'>
      <div className='flex justify-center px-6 my-48'>
        <div className='w-full xl:w-3/4 lg:w-11/12 flex shadow-2xl'>
          <div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none '>
            {error ? (
              <h3 className='pt-4 text-2xl text-center text-red-500'>
                Login Failed!
              </h3>
            ) : (
              <h3 className='pt-4 text-2xl text-center'>
                {userName ? (
                  <span>Hello, {userName}</span>
                ) : (
                  <span>Hello, guest</span>
                )}
              </h3>
            )}
            <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded'>
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='username'>
                  Name
                </label>
                <input
                  className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='password'>
                  Password
                </label>
                <input
                  className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className='mb-6 text-center'>
                <button
                  className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={login}>
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className='w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover bg-top bg-no-repeat rounded-r-lg bg-[url(./bg-racoon.jpg)] '></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
