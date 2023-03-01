import { useState } from 'react';

const AccountList = ({ accounts, setAccount }) => {
    const [accountFilter, setAccountFilter] = useState('All');

    const deleteHandler = (id) => {
        setAccount((prevState) => prevState.filter((acc) => acc.id !== id));
    };

    const sumHandler = (e) => {
        let updatedMoney = accounts.map((acc) =>
            acc.id === +e.target.id
                ? { ...acc, enteredAmount: e.target.value }
                : acc
        );
        setAccount(updatedMoney);
    };

    const depositHandler = (id) => {
        let updatedMoney = accounts.map((acc) =>
            acc.id === id
                ? {
                      ...acc,
                      sum: acc.sum + +acc.enteredAmount,
                      enteredAmount: '',
                  }
                : acc
        );
        setAccount(updatedMoney);
    };

    const withdrawHandler = (id) => {
        let updatedMoney = accounts.map((acc) =>
            acc.id === id
                ? {
                      ...acc,
                      sum: acc.sum - +acc.enteredAmount,
                      enteredAmount: '',
                  }
                : acc
        );
        setAccount(updatedMoney);
    };

    const filterHandler = (e) => {
        setAccountFilter(e.target.value);
    };

    return (
        <>
            <label htmlFor="account">Accounts:</label>
            <select name="account" id="account" onChange={filterHandler}>
                <option value="All">All</option>
                <option value="withMoney">With Money</option>
                <option value="noMoney">No Money</option>
            </select>
            {[...accounts]
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                .filter((acc) =>
                    accountFilter === 'withMoney'
                        ? acc.sum > 0
                        : accountFilter === 'noMoney'
                        ? acc.sum === 0
                        : true
                )
                .map((acc) => (
                    <div key={acc.id}>
                        <p>{acc.name}</p>
                        <p>{acc.lastName}</p>
                        <p>{acc.sum}</p>
                        <button onClick={() => deleteHandler(acc.id)}>
                            Delete Account
                        </button>
                        <input
                            type="number"
                            id={acc.id}
                            onChange={sumHandler}
                            value={acc.enteredAmount}
                        />
                        <button onClick={() => depositHandler(acc.id)}>
                            Deposit
                        </button>
                        <button onClick={() => withdrawHandler(acc.id)}>
                            Withdraw
                        </button>
                    </div>
                ))}
        </>
    );
};

export default AccountList;
