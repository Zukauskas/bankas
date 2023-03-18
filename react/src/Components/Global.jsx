import { createContext, useState, useEffect } from 'react';

export const Global = createContext();

const GlobalProvider = ({ children }) => {
  const [route, setRoute] = useState('accounts');
  const [logged, setLogged] = useState(null);
  const [authName, setAuthName] = useState(null);
  const [accounts, setAccount] = useState([]);
  const [newAccount, setNewAccount] = useState(null);
  const [deletedAccount, setDeletedAccount] = useState(null);
  const [sumChanged, setSumChanged] = useState(null);
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

  //LOGOUT
  const logOut = () => {
    fetch('http://localhost:3003/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Logout success') {
          setLogged(false);
          setAuthName(null);
        }
      });
  };
  return (
    <Global.Provider
      value={{
        route,
        setRoute,
        authName,
        setAuthName,
        logOut,
        logged,
        setLogged,
        accounts,
        setAccount,
        newAccount,
        setNewAccount,
        deletedAccount,
        setDeletedAccount,
        sumChanged,
        setSumChanged,
        showModal,
        setShowModal,
      }}>
      {children}
    </Global.Provider>
  );
};

export default GlobalProvider;
