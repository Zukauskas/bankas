import { useEffect, useState } from 'react';
import './App.css';
import AccountList from './Components/AccountList';
import AccountSummary from './Components/AccountSummary';
import AddNewAccount from './Components/AddNewAccount';
import axios from 'axios';

function App() {
    const [account, setAccount] = useState([]);

    const accountHandler = (name, lastName) => {
        setAccount((prevState) => [
            ...prevState,
            { name, lastName, id: Math.random(), sum: 0},
        ]);
    };

     useEffect(() => {
    // Retrieve the account data from the server
    axios.get('http://localhost:3003/accounts')
      .then(response => {
        console.log('Retrieved account data from server:', response.data);
        setAccount(response.data);
      })
      .catch(error => {
        console.error('Error retrieving account data from server: ', error);
      });
  }, []);

    useEffect(() => {
        if (account === null) {
            setAccount([]);
           return console.log('No accounts');
        }
  // Send the updated account data to the Express server
  axios.post('http://localhost:3003/accounts', account)
    .then(response => {
      console.log('Account data sent to server successfully');
    })
    .catch(error => {
      console.error('Error sending account data to server: ', error);
    });

   }, [account]);

    //useEffect(() => {
    //    localStorage.setItem('accounts', JSON.stringify(account));
   // }, [account]);


    return (
        <div className='App mx-auto flex gap-4 flex-col items-center'>
            <AccountSummary accounts={account} />
            <AddNewAccount addAccount={accountHandler} />
            <AccountList accounts={account} setAccount={setAccount} />
        </div>
    );
}

export default App;
