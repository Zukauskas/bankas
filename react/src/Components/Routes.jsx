import { useContext } from 'react';
import Auth from './Auth';
import { Global } from './Global';
import Login from './Login';
import Bank from './Bank';
import Homepage from './Homepage';

function Routes() {
  const { route } = useContext(Global);

  switch (route) {
    case 'accounts':
      return (
        <Auth>
          <Bank />
        </Auth>
      );
    case 'login':
      return <Login />;
    case 'home':
      return <Homepage />;
    default:
      return null;
  }
}
export default Routes;
