import { useContext } from 'react';
import { Global } from './Global';

function Nav() {
  const { route, setRoute, authName, logOut } = useContext(Global);

  return (
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <div
          className='flex items-center  cursor-pointer'
          onClick={() => setRoute('home')}>
          <img
            src='/racoon.png'
            className='h-6 mr-3 sm:h-9'
            alt='Racoon Logo'
          />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
            Racoon Bank
          </span>
        </div>
        <div className='flex items-center gap-5 md:order-2'>
          <div className='flex gap-3'>
            <span
              onClick={() => setRoute('home')}
              className={
                'cursor-pointer ' +
                (route === 'home' ? ' text-blue-300' : 'text-white')
              }>
              Home
            </span>
            {authName ? (
              <span
                onClick={() => setRoute('accounts')}
                className={
                  'cursor-pointer ' +
                  (route === 'accounts' ? ' text-blue-300' : 'text-white ')
                }>
                Accounts
              </span>
            ) : null}
          </div>
          <div className='text-white'>|</div>
          {authName ? (
            <>
              <div className='flex items-center gap-2'>
                <img
                  className='w-8 h-8 rounded-full'
                  src='/racoon.png'
                  alt='user photo'
                />
                <span className=' text-white'>{authName}</span>
              </div>
              <span className=' text-white cursor-pointer' onClick={logOut}>
                Logout
              </span>
            </>
          ) : (
            <span
              onClick={() => setRoute('login')}
              className={
                'cursor-pointer ' +
                (route === 'login' ? ' text-blue-300' : 'text-white')
              }>
              Login
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
