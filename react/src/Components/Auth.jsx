import { useContext, useEffect } from 'react';
import { Global } from './Global';
import Login from './Login';

function Auth({ children }) {
  const { setAuthName, logged, setLogged } = useContext(Global);

  // CHECK IF USER IS LOGGED IN OR NOT ON PAGE LOAD
  useEffect(() => {
    fetch('http://localhost:3003/login', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login success') {
          setLogged(true);
          setAuthName(data.name);
        } else {
          setLogged(false);
        }
      });
  }, []);

  if (logged === null) {
    return <p>Loading...</p>;
  }
  if (logged === true) {
    return <>{children}</>;
  }
  if (logged === false) {
    return <Login />;
  }
}

export default Auth;
