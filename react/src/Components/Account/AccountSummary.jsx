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
    const stolen = accounts.length * 5;
    setHowMuchStolen(prevState => prevState + stolen);
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
      <div className='flex flex-col justify-center items-center bg-white rounded-md shadow-lg py-2 px-6'>
        <p className='text-lg font-semibold text-gray-700'>
          Total Accounts:
          <span className='text-gray-600 ml-2 font-normal'>
            {accounts ? accounts.length : 0}
          </span>
        </p>
        <p className='text-lg font-semibold text-gray-700'>
          Total Money:
          <span className='text-gray-600 ml-2 font-normal'>
            ${totalMoney.toFixed(2)}
          </span>
        </p>
        <p className='text-lg font-semibold text-gray-700'>
          Accounts with Debt:
          <span className='text-gray-600 ml-2 font-normal'>
            {accountWithDebt}
          </span>
        </p>
        <p className='text-lg font-semibold text-gray-700'>
          Accounts with Money:
          <span className='text-gray-600 ml-2 font-normal'>
            {accountWithMoney}
          </span>
        </p>
        <p className='text-lg font-semibold text-gray-700'>
          Accounts with No Money:
          <span className='text-gray-600 ml-2 font-normal'>
            {accountNoMoney}
          </span>
        </p>
        <p className='text-lg font-semibold text-gray-700'>
          Not verified accounts:
          <span className='text-gray-600 ml-2 font-normal'>{notVerified}</span>
        </p>
        <button
          className=' border-red-600 bg-green-500 block'
          onClick={stealMoney}>
          Steal Money
        </button>
      </div>
    </div>
  );
};
export default AccountSummary;
