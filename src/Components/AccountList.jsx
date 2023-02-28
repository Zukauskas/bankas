import { useState } from 'react';

const AccountList = ({ accounts, setAccount }) => {
    const deleteHandler = (id) => {
        setAccount((prevState) => prevState.filter((acc) => acc.id !== id));
    };

    const [money, setMoney] = useState(0);

    const sumHandler = (e) => {
        setMoney(e.target.value);
    };

    const depositHandler = (id) => {
        const updatedMoney = accounts.map((acc) =>
            acc.id === id ? { ...acc, sum: acc.sum + +money } : acc
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
