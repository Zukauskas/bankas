import { useContext } from 'react';
import { Global } from './Global';
import Login from './Login';
import { Loader } from './Loader';

function Auth({ children }) {
  const { logged } = useContext(Global);

  if (logged === null) {
    return <Loader />;
  }
  if (logged === true) {
    return <>{children}</>;
  }
  if (logged === false) {
    return <Login />;
  }
}

export default Auth;
