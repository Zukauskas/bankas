import { useState } from 'react';
import './App.css';
import AccountList from './Components/AccountList';
import AddNewAccount from './Components/AddNewAccount';

function App() {
    const [account, setAccount] = useState([]);

    const accountHandler = (name, lastName) => {
        console.log(name, lastName);
        setAccount((prevState) => [
            ...prevState,
            { name, lastName, id: Math.random() },
        ]);
    };

    return (
        <div className="App">
            <AddNewAccount addAccount={accountHandler} />
            <AccountList accounts={account} />
        </div>
    );
}

export default App;
