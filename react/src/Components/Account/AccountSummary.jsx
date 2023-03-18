import { useContext } from 'react';
import { Global } from '../Global';

const AccountSummary = () => {
  const context = useContext(Global);

  const totalMoney = context.accounts
    ? context.accounts.reduce((acc, cur) => acc + cur.sum, 0)
    : 0;

  return (
    <div className='mb-8 flex flex-col items-center'>
      <h2 className='text-3xl font-bold mr-4 text-gray-900'>Bank Summary</h2>
      <div className='flex flex-col justify-center items-center bg-white rounded-md shadow-lg py-2 px-6'>
        <p className='text-lg font-semibold text-gray-700'>
          Total Accounts:
          <span className='text-gray-600 ml-2 font-normal'>
            {context.accounts ? context.accounts.length : 0}
          </span>
        </p>
        <p className='text-lg font-semibold text-gray-700'>
          Total Money:
          <span className='text-gray-600 ml-2 font-normal'>
            ${totalMoney.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};
export default AccountSummary;
