import AccountList from './Account/AccountList';
import AccountSummary from './Account/AccountSummary';
import AddNewAccount from './Account/AddNewAccount';

const Bank = ({
  accounts,
  addAccount,
  setSumChanged,
  setDeletedAccount,
  showModal,
  setShowModal,
}) => {
  return (
    <div className='App mx-auto flex gap-4 flex-col items-center'>
      <AccountSummary accounts={accounts} />
      <AddNewAccount
        addAccount={addAccount}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <AccountList
        accounts={accounts}
        setSumChanged={setSumChanged}
        setDeletedAccount={setDeletedAccount}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Bank;
