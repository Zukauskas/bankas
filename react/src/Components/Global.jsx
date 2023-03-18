import { createContext, useState } from 'react';

export const Global = createContext();

const GlobalProvider = ({ children }) => {
  const [route, setRoute] = useState('accounts');
  const [logged, setLogged] = useState(null);
  const [authName, setAuthName] = useState(null);

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
        //route
        route,
        setRoute,
        // auth
        authName,
        setAuthName,
        logOut,
        logged,
        setLogged,
      }}>
      {children}
    </Global.Provider>
  );
};

export default GlobalProvider;
