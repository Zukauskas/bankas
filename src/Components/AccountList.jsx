import { useState } from 'react';

const AccountList = ({ accounts, setAccount }) => {
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
            acc.id === id ? { ...acc, sum: acc.sum + +acc.enteredAmount } : acc
        );
        setAccount(updatedMoney);
    };

    return (
        <>
            {[...accounts]
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
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
                            //value={acc.enteredAmount}
                        />
                        <button onClick={() => depositHandler(acc.id)}>
                            Deposit
                        </button>
                        <button>Withdraw</button>
                    </div>
                ))}
        </>
    );
};

export default AccountList;
