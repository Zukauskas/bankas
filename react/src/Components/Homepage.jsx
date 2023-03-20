import { useContext } from 'react';
import { Global } from './Global';

const Homepage = () => {
  const { accounts } = useContext(Global);

  const bankFounded = 2022;
  const year = new Date().getFullYear();
  const yearsInBusiness = year - bankFounded;

  const totalMoney = accounts
    ? accounts.reduce((acc, cur) => acc + cur.sum, 0)
    : 0;

  return (
    <div className='bg-gray-100'>
      <div className='absolute left-2/3 top-1/2 transform -translate-x-1/2'>
        <div className='flex justify-center items-center space-x-6'>
          <div className='w-32 h-32 border-2 border-yellow-500 bg-white/50 rounded-full shadow-lg flex justify-center items-center'>
            <h3 className='text-2xl font-bold mb-2'>
              {accounts ? accounts.length : 0}
            </h3>
          </div>
          <div className='w-32 h-32 border-2 border-green-500  bg-white/50 rounded-full shadow-lg flex justify-center items-center'>
            <h3 className='text-2xl font-bold mb-2'>
              $
              {totalMoney < 999999
                ? (totalMoney / 1000).toFixed(0) + 'K'
                : totalMoney < 999999999
                ? (totalMoney / 1000000).toFixed(1) + 'M'
                : totalMoney < 999999999999
                ? (totalMoney / 1000000000).toFixed(1) + 'B'
                : totalMoney.toFixed(2)}
            </h3>
          </div>
          <div className='w-32 h-32 border-2 border-red-500 bg-white/50 rounded-full shadow-lg flex justify-center items-center'>
            <h3 className='text-2xl font-bold mb-2'>{yearsInBusiness}</h3>
          </div>
        </div>
        <div className='flex justify-center items-center space-x-6 mt-2'>
          <div className='w-32 text-center'>
            <p className='text-white text-xl'>Total Accounts</p>
          </div>
          <div className='w-32 text-center'>
            <p className='text-white text-xl'>Total Money</p>
          </div>
          <div className='w-32 text-center'>
            <p className='text-white text-xl'>Years in Business</p>
          </div>
        </div>
      </div>
      <div className='min-h-screen bg-cover bg-center bg-[url(./bg-racoon.jpg)] flex items-center'>
        <div className=' justify-self-start max-w-2xl ml-4 text-center text-black bg-white/75'>
          <h1 className='text-5xl font-bold m-4'>Welcome to the Racoon Bank</h1>
          <p className='text-2xl m-10'>
            We may not have the biggest stash, but we promise the best banking
            experience! Trust us, we won't play dead when it comes to your
            money.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
