import { useState } from 'react';
import AccountFilter from './AccountFilter';

const AccountList = ({ accounts, setAccount }) => {
    const [accountFilter, setAccountFilter] = useState('All');
    const [showModal, setShowModal] = useState({
        state: 'hidden',
        message: null,
        color: '',
    });

    const deleteHandler = (id) => {
        const account = accounts.filter((acc) => acc.id === id);
        if (account[0].sum > 0) {
            setShowModal({
                state: 'visible',
                message: 'Account has money',
                color: 'bg-red-500',
            });
            setTimeout(() => {
                setShowModal({
                    state: 'hidden',
                    message: '',
                    color: '',
                });
            }, 2000);
        } else {
            setAccount((prevState) => prevState.filter((acc) => acc.id !== id));
            setShowModal({
                state: 'visible',
                message: 'Deleted',
                color: 'bg-green-500',
            });
            setTimeout(() => {
                setShowModal({
                    state: 'hidden',
                    message: '',
                    color: '',
                });
            }, 2000);
        }
    };

    const sumHandler = (e) => {
        let enteredSum = e.target.value;

        if (+enteredSum >= 0 || !e.target.value) {
            let updatedMoney = accounts.map((acc) =>
                acc.id === +e.target.id
                    ? { ...acc, enteredAmount: enteredSum }
                    : acc
            );
            setAccount(updatedMoney);
        }
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
        const account = accounts.filter((acc) => acc.id === id);

        if (+account[0].enteredAmount <= account[0].sum) {
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
        } else {
            setShowModal({
                state: 'visible',
                message: 'Cannot withdraw more than in the account',
                color: 'bg-orange-500',
            });
            setTimeout(() => {
                setShowModal({
                    state: 'hidden',
                    message: '',
                    color: '',
                });
            }, 2000);
        }
    };

    const filterHandler = (e) => {
        setAccountFilter(e.target.value);
    };

    const filteredAccounts = accounts.filter((acc) =>
        accountFilter === 'withMoney'
            ? acc.sum > 0
            : accountFilter === 'noMoney'
            ? acc.sum === 0
            : true
    );

    const empty = <p>No accounts to show</p>;

    return (
        <>
            <AccountFilter filterHandler={filterHandler} />
            <div
                className={`${showModal.state} ${showModal.color} w-1/3 px-2 py-4 fixed top-1 text-center rounded-md`}
            >
                <p>{showModal.message}</p>
            </div>
            <div className='container flex flex-wrap gap-4 relative justify-center'>
                {filteredAccounts.length > 0
                    ? filteredAccounts
                          .sort((a, b) => a.lastName.localeCompare(b.lastName))
                          .map((acc) => (
                              <div
                                  key={acc.id}
                                  className='bg-white shadow-md rounded px-8 py-6 mb-4 relative flex flex-col items-center'
                              >
                                  <img
                                      src='../racoon.png'
                                      alt='profile image'
                                      className='h-20 w-20 rounded-full ring-2 ring-orange-400 mb-4'
                                  />
                                  <p className='font-bold text-gray-700 capitalize mb-2'>
                                      {acc.name} {acc.lastName}
                                  </p>
                                  <p className='text-gray-700 font-bold mb-4'>
                                      ${acc.sum.toFixed(2)}
                                  </p>
                                  <div className='w-full flex flex-row items-center justify-between'>
                                      <button
                                          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 absolute top-0 right-0'
                                          onClick={() => deleteHandler(acc.id)}
                                      >
                                          X
                                      </button>
                                      <div className='flex flex-row items-center space-x-4'>
                                          <input
                                              type='number'
                                              id={acc.id}
                                              onChange={sumHandler}
                                              value={acc.enteredAmount}
                                              className='border border-gray-400 rounded py-2 px-4 w-24'
                                              min={0}
                                              step='0.01'
                                          />
                                          <button
                                              className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded deposit-button'
                                              onClick={() =>
                                                  depositHandler(acc.id)
                                              }
                                          >
                                              Deposit
                                          </button>
                                          <button
                                              className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded withdraw-button'
                                              onClick={() =>
                                                  withdrawHandler(acc.id)
                                              }
                                          >
                                              Withdraw
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))
                    : empty}
            </div>
        </>
    );
};

export default AccountList;
