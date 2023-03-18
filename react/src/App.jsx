import { useEffect, useState } from 'react';
import GlobalProvider from './Components/Global';
import Nav from './Components/Nav';
import Routes from './Components/Routes';

function App() {
  const [account, setAccount] = useState([]);
  // new account added state
  const [newAccount, setNewAccount] = useState(null);

  // Account deleted state
  const [deletedAccount, setDeletedAccount] = useState(null);

  // Sum changed state
  const [sumChanged, setSumChanged] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState({
    state: 'hidden',
    message: null,
    color: '',
  });

  // Server URL
  const url = 'http://localhost:3003/accounts';

  //GET

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setAccount(data));
  }, []);

  //POST

  useEffect(() => {
    if (newAccount) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAccount),
      })
        .then(response => response.json())
        .then(data => setAccount(data));
    }
  }, [newAccount]);
  [];
  //DELETE

  useEffect(() => {
    if (deletedAccount) {
      fetch(url + '/' + deletedAccount.id, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => setAccount(data));
    }
  }, [deletedAccount]);

  //PUT
  useEffect(() => {
    if (sumChanged) {
      fetch(url + '/' + sumChanged.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sumChanged),
      })
        .then(response => response.json())
        .then(data => setAccount(data));
    }
  }, [sumChanged]);

  return (
    <GlobalProvider>
      <Nav />
      <Routes
        accounts={account}
        setNewAccount={setNewAccount}
        setSumChanged={setSumChanged}
        setDeletedAccount={setDeletedAccount}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </GlobalProvider>
  );
}

export default App;
