import { useState, useContext, useEffect } from 'react';
import AccountFilter from './AccountFilter';
import AccountSort from './AccountSort';
import { Global } from '../Global';
import { useFile } from './useFile';
import AccountEditModal from '../Modals/AccountEditModal';
import DepositConfirmation from '../Modals/DepositConfirmation';

const AccountList = () => {
  const imgURL = 'http://localhost:3003/img/';

  const [accountFilter, setAccountFilter] = useState('All');
  const [accountSort, setAccountSort] = useState('All');
  const [editAccountModal, setEditAccountModal] = useState(false);
  const [editAccount, setEditAccount] = useState({});
  const [file, readFile, remImage] = useFile();
  const [delImg, setDelImg] = useState(false);

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
    setAccount,
  } = useContext(Global);

  const delImage = () => {
    setDelImg(true);
  };

  const cancelImage = () => {
    remImage();
    setDelImg(false);
  };

  const modalClose = () => {
    remImage();
    setDelImg(false);
    setEditAccountModal(false);
  };

  const edit = e => {
    e.preventDefault();
    const account = {
      id: editAccount.id,
      name: editAccount.name,
      lastName: editAccount.lastName,
      file,
      delImg,
    };
    fetch('http://localhost:3003/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    })
      .then(response => response.json())
      .then(data => setAccount(data));
    setEditAccountModal(false);
    remImage();
  };

  const userBlockHandler = id => {
    fetch('http://localhost:3003/block' + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setAccount(data));
  };

  const blockedUserModalHandler = msg => {
    setShowModal({
      state: 'visible',
      message: `${msg}, user is blocked`,
      color: 'bg-red-500',
    });
    setTimeout(() => {
      setShowModal({
        state: 'hidden',
        message: '',
        color: '',
      });
    }, 2000);
  };

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
    } else if (account[0].sum < 0) {
      setShowModal({
        state: 'visible',
        message: 'Can not delete account with debt',
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

  const sortHandler = e => {
    setAccountSort(e.target.value);
  };

  const filteredAccounts = accounts
    ? accounts.filter(acc =>
        accountFilter === 'withMoney'
          ? acc.sum > 0
          : accountFilter === 'noMoney'
          ? acc.sum === 0
          : accountFilter === 'withDebt'
          ? acc.sum < 0
          : accountFilter === 'blocked'
          ? acc.isBlocked
          : accountFilter === 'active'
          ? !acc.isBlocked
          : true,
      )
    : [];

  const sortedAndFilteredAccounts = filteredAccounts
    ? [...filteredAccounts].sort((a, b) => {
        if (accountSort === 'lastnameAZ') {
          return a.lastName.localeCompare(b.lastName);
        } else if (accountSort === 'lastnameZA') {
          return b.lastName.localeCompare(a.lastName);
        } else if (accountSort === 'balanceLH') {
          return +a.sum > +b.sum;
        } else if (accountSort === 'balanceHL') {
          return +a.sum < +b.sum;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      })
    : [];

  const empty = <p>No accounts to show</p>;

  const editModal = id => {
    const account = accounts.filter(acc => +acc.id === +id)[0];
    setEditAccountModal(true);
    setEditAccount(account);
  };

  return (
    <>
      <div className='flex gap-4'>
        <AccountFilter filterHandler={filterHandler} />
        <AccountSort sortHandler={sortHandler} />
      </div>

      {editAccountModal && (
        <AccountEditModal
          edit={edit}
          editAccount={editAccount}
          file={file}
          readFile={readFile}
          delImage={delImage}
          delImg={delImg}
          imgURL={imgURL}
          cancelImage={cancelImage}
          modalClose={modalClose}
        />
      )}

      {/* Confirmation modal */}

      <DepositConfirmation
        depositConfirmModal={depositConfirmModal}
        enteredAmount={enteredAmount}
        approveDeposit={approveDeposit}
        cancelDeposit={cancelDeposit}
      />
      <div
        className={`${showModal.state} ${showModal.color} w-1/3 px-2 py-4 fixed top-1 text-center rounded-md`}>
        <p>{showModal.message}</p>
      </div>
      <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md'>
        <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Name
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Account state
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Balance (€)
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Change Balance
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
            {sortedAndFilteredAccounts.length > 0
              ? sortedAndFilteredAccounts.map(acc => (
                  <tr className='hover:bg-gray-50' key={acc.id}>
                    <th className='flex gap-3 font-normal  py-2 px-4 text-gray-900'>
                      <div className='relative h-10 w-10'>
                        <img
                          className='h-full w-full rounded-full object-cover object-center'
                          src={`${
                            acc.image
                              ? imgURL + acc.image
                              : imgURL + 'no-id.jpg'
                          }`}
                        />
                      </div>
                      <div className='text-sm flex'>
                        <div className='font-medium text-gray-700 self-center'>
                          {acc.name} {acc.lastName}
                        </div>
                      </div>
                    </th>
                    <td className=' py-2 px-4'>
                      <span
                        className={`cursor-pointer flex justify-center items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
                          acc.isBlocked ? 'text-red-600' : 'text-green-600'
                        }`}
                        onClick={() => userBlockHandler(acc.id)}>
                        {acc.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className=' py-2 px-4 text-center'>€{acc.sum}</td>
                    <td className=' py-2 px-4'>
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
                          onClick={() =>
                            acc.isBlocked
                              ? blockedUserModalHandler('Cannot deposit')
                              : depositHandler(acc.id)
                          }>
                          Deposit
                        </button>
                        <button
                          className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded withdraw-button'
                          onClick={() =>
                            acc.isBlocked
                              ? blockedUserModalHandler('Cannot withdraw')
                              : withdrawHandler(acc.id)
                          }>
                          Withdraw
                        </button>
                      </div>
                    </td>
                    <td className='flex justify-center py-2 px-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-10 w-6 text-red-500 hover:text-red-700 cursor-pointer'
                        x-tooltip='tooltip'
                        onClick={() =>
                          acc.isBlocked
                            ? blockedUserModalHandler('Cannot delete account')
                            : deleteHandler(acc.id)
                        }>
                        <title>Delete Account</title>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-edit-3 h-10 w-6  text-blue-500 hover:text-blue-700 cursor-pointer'
                        onClick={() => editModal(acc.id)}>
                        <path d='M12 20h9'></path>
                        <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'></path>
                        <title>Edit Account details</title>
                      </svg>
                    </td>
                  </tr>
                ))
              : empty}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountList;
