import { useState, useContext, useEffect } from 'react';
import AccountFilter from './AccountFilter';
import { Global } from '../Global';

const AccountList = () => {
  const [accountFilter, setAccountFilter] = useState('All');
  const [depositConfirmModal, setDepositConfirmModal] = useState({
    state: 'hidden',
    approved: null,
  });

  const [enteredAmount, setEnteredAmount] = useState({
    id: null,
    amount: '',
  });

  const {
    setShowModal,
    showModal,
    accounts,
    setDeletedAccount,
    setSumChanged,
  } = useContext(Global);

  useEffect(() => {
    if (depositConfirmModal.approved) {
      const account = accounts.filter(acc => +acc.id === +enteredAmount.id)[0];
      setSumChanged({
        ...account,
        sum: +(account.sum + +enteredAmount.amount).toFixed(2),
      });

      setEnteredAmount({
        id: null,
        amount: '',
      });
      setDepositConfirmModal({
        state: 'hidden',
        approved: null,
      });
    }
  }, [depositConfirmModal]);

  const approveDeposit = () => {
    setDepositConfirmModal({
      state: 'hidden',
      approved: true,
    });
  };

  const cancelDeposit = () => {
    setDepositConfirmModal({
      state: 'hidden',
      approved: false,
    });
    setEnteredAmount({
      id: null,
      amount: '',
    });
  };

  const deleteHandler = id => {
    const account = [...accounts].filter(acc => acc.id === id);
    if (account[0].sum > 0) {
      setShowModal({
        state: 'visible',
        message: 'Can not delete account with money',
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
      setDeletedAccount(account[0]);
      setShowModal({
        state: 'visible',
        message: 'Account deleted',
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

  const sumHandler = e => {
    setEnteredAmount({
      id: e.target.id,
      amount: Math.abs(e.target.value),
    });
  };

  const depositHandler = id => {
    if (+enteredAmount.id === +id) {
      const account = accounts.filter(acc => +acc.id === +id)[0];

      if (+enteredAmount.amount <= 1000) {
        setSumChanged({
          ...account,
          sum: +(account.sum + +enteredAmount.amount).toFixed(2),
        });

        setEnteredAmount({
          id: null,
          amount: '',
        });
      } else {
        setDepositConfirmModal({
          state: 'visible',
          approved: null,
        });
      }
    }
  };

  const withdrawHandler = id => {
    if (+enteredAmount.id === +id) {
      const account = accounts.filter(acc => +acc.id === +id);

      if (+enteredAmount.amount <= account[0].sum) {
        const account = accounts.filter(acc => +acc.id === +id)[0];
        setSumChanged({
          ...account,
          sum: +(account.sum - +enteredAmount.amount).toFixed(2),
        });

        setEnteredAmount({
          id: null,
          amount: '',
        });
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
    }
  };

  const filterHandler = e => {
    setAccountFilter(e.target.value);
  };

  const filteredAccounts = accounts
    ? accounts.filter(acc =>
        accountFilter === 'withMoney'
          ? acc.sum > 0
          : accountFilter === 'noMoney'
          ? acc.sum === 0
          : true,
      )
    : [];

  const empty = <p>No accounts to show</p>;

  return (
    <>
      <AccountFilter filterHandler={filterHandler} />
      {/* Confirmation modal */}

      <div
        id='popup-modal'
        tabindex='-1'
        class={`${depositConfirmModal.state} fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
        <div class='relative w-full h-full max-w-md md:h-auto'>
          <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div class='p-6 text-center'>
              <svg
                aria-hidden='true'
                class='mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
              </svg>
              <h3 class='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Are you sure you want to deposit {enteredAmount.amount} to
                account?
              </h3>
              <button
                data-modal-hide='popup-modal'
                type='button'
                class='text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                onClick={approveDeposit}>
                Yes, I'm sure
              </button>
              <button
                data-modal-hide='popup-modal'
                type='button'
                class='text-red-500 bg-white hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-200 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 dark:bg-red-700 dark:text-red-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600'
                onClick={cancelDeposit}>
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${showModal.state} ${showModal.color} w-1/3 px-2 py-4 fixed top-1 text-center rounded-md`}>
        <p>{showModal.message}</p>
      </div>
      <div className='container flex flex-wrap gap-4 relative justify-center'>
        {filteredAccounts.length > 0
          ? filteredAccounts
              .sort((a, b) => a.lastName.localeCompare(b.lastName))
              .map(acc => (
                <div
                  key={acc.id}
                  className='bg-white shadow-md rounded px-8 py-6 mb-4 relative flex flex-col items-center'>
                  <img
                    src={`${acc.image ? acc.image : './racoon.png'}`}
                    alt='profile image'
                    className='h-20 w-20 rounded-full ring-2 ring-orange-400 mb-4'
                  />
                  <p className='font-bold text-gray-700 capitalize mb-2'>
                    {acc.name} {acc.lastName}
                  </p>
                  <p className='text-gray-700 font-bold mb-4'>${acc.sum}</p>
                  <div className='w-full flex flex-row items-center justify-between'>
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 absolute top-0 right-0'
                      onClick={() => deleteHandler(acc.id)}>
                      X
                    </button>
                    <div className='flex flex-row items-center space-x-4'>
                      <input
                        type='number'
                        id={acc.id}
                        onChange={sumHandler}
                        value={
                          +acc.id === +enteredAmount.id
                            ? enteredAmount.amount
                            : ''
                        }
                        className='border border-gray-400 rounded py-2 px-4 w-24'
                        min={0}
                        step='0.01'
                      />
                      <button
                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded deposit-button'
                        onClick={() => depositHandler(acc.id)}>
                        Deposit
                      </button>
                      <button
                        className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded withdraw-button'
                        onClick={() => withdrawHandler(acc.id)}>
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
