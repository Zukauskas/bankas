import { useContext } from 'react';
import { Global } from '../Global';

const AccountSummary = () => {
  const { accounts, setAccount } = useContext(Global);

  const totalMoney = accounts
    ? accounts.reduce((acc, cur) => acc + cur.sum, 0)
    : 0;

  const stealMoney = () => {
    fetch('http://localhost:3003/stealmoney', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        howMuch: 5,
      }),
    })
      .then(response => response.json())
      .then(data => setAccount(data));
  };

  const accountWithDebt = accounts
    ? accounts.filter(account => account.sum < 0).length
    : 0;

  const accountWithMoney = accounts
    ? accounts.filter(account => account.sum > 0).length
    : 0;

  const accountNoMoney = accounts
    ? accounts.filter(account => account.sum === 0).length
    : 0;

  const notVerified = accounts
    ? accounts.filter(account => account.image === null).length
    : 0;

  return (
    <div className='mb-8 flex flex-col items-center'>
      <h2 className='text-3xl font-bold mr-4 text-gray-900'>Bank Summary</h2>
      <div className='grid grid-cols-3 justify-center items-center gap-4'>
        <div className='text-lg font-semibold text-gray-700 bg-white rounded-md shadow-lg py-2 px-6 text-center'>
          Total Accounts:
          <span className='text-gray-600 ml-2 font-normal'>
            {accounts ? accounts.length : 0}
          </span>
        </div>
        <div className='text-lg font-semibold text-gray-700  bg-white rounded-md shadow-lg py-2 px-6 text-center'>
          Total Money:
          <span className='text-gray-600 ml-2 font-normal'>
            €{totalMoney.toFixed(2)}
          </span>
        </div>
        <div className='text-lg font-semibold text-gray-700  bg-white rounded-md shadow-lg py-2 px-6 text-center'>
          Accounts with Debt:
          <span className='text-gray-600 ml-2 font-normal'>
            {accountWithDebt}
          </span>
        </div>
        <div className='text-lg font-semibold text-gray-700  bg-white rounded-md shadow-lg py-2 px-6 text-center'>
          Accounts with Money:
          <span className='text-gray-600 ml-2 font-normal'>
            {accountWithMoney}
          </span>
        </div>
        <div className='text-lg font-semibold text-gray-700  bg-white rounded-md shadow-lg py-2 px-6 text-center'>
          Accounts with No Money:
          <span className='text-gray-600 ml-2 font-normal'>
            {accountNoMoney}
          </span>
        </div>
        <div className='text-lg font-semibold text-gray-700  bg-white rounded-md shadow-lg py-2 px-6 text-center'>
          Not verified accounts:
          <span className='text-gray-600 ml-2 font-normal'>{notVerified}</span>
        </div>
        <div className=' col-start-2 col-end-3 text-center'>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'
            onClick={stealMoney}>
            Tax everyone
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountSummary;
