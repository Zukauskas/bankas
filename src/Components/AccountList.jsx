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
            <div>
                <label
                    htmlFor='account-select'
                    className='block mb-2 font-bold text-gray-700'
                >
                    Accounts:
                </label>
                <select
                    name='account'
                    onChange={filterHandler}
                    className='border border-gray-400 rounded py-2 px-4 mb-4'
                >
                    <option value='All'>All</option>
                    <option value='withMoney'>With Money</option>
                    <option value='noMoney'>No Money</option>
                </select>
            </div>
            <div className='accounts-list'>
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
                        <div
                            key={acc.id}
                            className='bg-white shadow-md rounded px-8 py-6 mb-4  relative'
                        >
                            <p className='font-bold text-gray-700 mb-2'>
                                {acc.name}
                            </p>
                            <p className='text-gray-700 mb-2'>{acc.lastName}</p>
                            <p className='text-gray-700 font-bold mb-2'>
                                ${acc.sum}
                            </p>
                            <div className='flex items-center'>
                                <button
                                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 absolute top-0 right-0'
                                    onClick={() => deleteHandler(acc.id)}
                                >
                                    X
                                </button>
                                <input
                                    type='number'
                                    id={acc.id}
                                    onChange={sumHandler}
                                    value={acc.enteredAmount}
                                    className='border border-gray-400 rounded py-2 px-4'
                                    min={0}
                                    step='0.01'
                                />
                                <button
                                    className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2 deposit-button'
                                    onClick={() => depositHandler(acc.id)}
                                >
                                    Deposit
                                </button>
                                <button
                                    className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-2 withdraw-button'
                                    onClick={() => withdrawHandler(acc.id)}
                                >
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default AccountList;
