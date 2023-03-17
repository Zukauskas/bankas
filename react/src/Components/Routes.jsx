import { useContext } from 'react';
import Auth from './Auth';
import { Global } from './Global';
import Login from './Login';
import Bank from './Bank';
import AccountSummary from './Account/AccountSummary';

function Routes({
  accounts,
  setNewAccount,
  setSumChanged,
  setDeletedAccount,
  showModal,
  setShowModal,
}) {
  const { route } = useContext(Global);

  switch (route) {
    case 'accounts':
      return (
        <Auth>
          <Bank
            accounts={accounts}
            addAccount={setNewAccount}
            setSumChanged={setSumChanged}
            setDeletedAccount={setDeletedAccount}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </Auth>
      );
    case 'login':
      return <Login />;
    case 'home':
      return <AccountSummary accounts={accounts} />;
    default:
      return null;
  }
}
export default Routes;
