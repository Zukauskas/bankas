import { useState } from 'react';

const AccountList = ({ accounts, setAccount }) => {
    const deleteHandler = (id) => {
        setAccount((prevState) => prevState.filter((acc) => acc.id !== id));
    };

    const [money, setMoney] = useState({ money: 0, id: null });

    const sumHandler = (e) => {
        setMoney({ money: e.target.value, id: e.target.id });
    };

    const depositHandler = (id) => {
        let updatedMoney = accounts;
        if (+money.id === id) {
            updatedMoney = accounts.map((acc) =>
                acc.id === id ? { ...acc, sum: acc.sum + +money.money } : acc
            );
            setAccount(updatedMoney);
        }
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
                            // value={money.money}
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
