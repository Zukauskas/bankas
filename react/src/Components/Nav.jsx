import { useContext } from 'react';
import { Global } from './Global';

function Nav() {
  const { route, setRoute, authName, logOut } = useContext(Global);

  return (
    <nav className=''>
      <div className=''>Racoon bank</div>
      <span
        onClick={() => setRoute('home')}
        className={route === 'home' ? 'active' : ''}>
        Home
      </span>
      {authName ? (
        <span
          onClick={() => setRoute('accounts')}
          className={'nav-link ' + (route === 'accounts' ? 'active' : '')}>
          Accounts
        </span>
      ) : null}
      <ul className='navbar-nav'>
        {authName ? (
          <>
            <li className='nav-item'>
              <span className='nav-link'>
                <b>{authName}</b>
              </span>
            </li>
            <li className='nav-item'>
              <span className='nav-link' onClick={logOut}>
                Logout
              </span>
            </li>
          </>
        ) : (
          <li className='nav-item'>
            <span
              onClick={() => setRoute('login')}
              className={'nav-link ' + (route === 'login' ? 'active' : '')}>
              Login
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
