import AccountList from './Account/AccountList';
import AccountSummary from './Account/AccountSummary';
import AddNewAccount from './Account/AddNewAccount';

const Bank = () => {
  return (
    <div className='App mx-auto flex gap-4 flex-col items-center'>
      <AccountSummary />
      <AddNewAccount />
      <AccountList />
    </div>
  );
};

export default Bank;
