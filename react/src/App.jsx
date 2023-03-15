import { useEffect, useState } from 'react';
import './App.css';
import AccountList from './Components/AccountList';
import AccountSummary from './Components/AccountSummary';
import AddNewAccount from './Components/AddNewAccount';

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
            .then((response) => response.json())
            .then((data) => setAccount(data));
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
                .then((response) => response.json())
                .then((data) => setAccount(data));
        }
    }, [newAccount]);
    [];
    //DELETE

    useEffect(() => {
        if (deletedAccount) {
            fetch(url + '/' + deletedAccount.id, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => setAccount(data));
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
                .then((response) => response.json())
                .then((data) => setAccount(data));
        }
    }, [sumChanged]);

    return (
        <div className='App mx-auto flex gap-4 flex-col items-center'>
            <AccountSummary accounts={account} />
            <AddNewAccount
                addAccount={setNewAccount}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <AccountList
                accounts={account}
                setSumChanged={setSumChanged}
                setDeletedAccount={setDeletedAccount}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </div>
    );
}

export default App;
