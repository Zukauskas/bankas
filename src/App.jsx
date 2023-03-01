import { useEffect, useState } from 'react';
import './App.css';
import AccountList from './Components/AccountList';
import AccountSummary from './Components/AccountSummary';
import AddNewAccount from './Components/AddNewAccount';

function App() {
    const [account, setAccount] = useState(
        JSON.parse(localStorage.getItem('accounts')) || []
    );

    const accountHandler = (name, lastName) => {
        setAccount((prevState) => [
            ...prevState,
            { name, lastName, id: Math.random(), sum: 0, enteredAmount: '' },
        ]);
    };

    useEffect(() => {
        localStorage.setItem('accounts', JSON.stringify(account));
    }, [account]);

    return (
        <div className="App">
            <AccountSummary accounts={account} />
            <AddNewAccount addAccount={accountHandler} />
            <AccountList accounts={account} setAccount={setAccount} />
        </div>
    );
}

export default App;
