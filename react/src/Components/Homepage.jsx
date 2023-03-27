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
    <div class='container my-24 px-6 mx-auto'>
      <section class='mb-32 text-gray-800 text-center lg:text-left'>
        <div class='block rounded-lg shadow-lg bg-white'>
          <div class='flex flex-wrap items-center'>
            <div class='block w-full lg:flex grow-0 shrink-0 basis-auto lg:w-6/12 xl:w-4/12'>
              <img
                src='./bg-racoon.jpg'
                alt='Funny racoon'
                class='w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg'
              />
            </div>
            <div class='grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12'>
              <div class='px-6 py-12 md:px-12'>
                <h2 class='text-3xl font-bold mb-4 text-blue-600 display-5'>
                  Welcome to the Racoon Bank
                </h2>
                <p class='text-gray-500 mb-12'>
                  We may not have the biggest stash, but we promise the best
                  banking experience! Trust us, we won't play dead when it comes
                  to your money.
                </p>

                <div class='grid lg:gap-x-12 md:grid-cols-3'>
                  <div class='mb-12 md:mb-0'>
                    <h2 class='text-3xl font-bold text-blue-600 mb-4'>
                      {accounts ? accounts.length : 0}
                    </h2>
                    <h5 class='text-lg font-medium text-gray-500 mb-0'>
                      Happy customers
                    </h5>
                  </div>

                  <div class='mb-12 md:mb-0'>
                    <h2 class='text-3xl font-bold text-blue-600 mb-4'>
                      {totalMoney < 999
                        ? totalMoney.toFixed(2)
                        : totalMoney < 999999
                        ? (totalMoney / 1000).toFixed(1) + 'K'
                        : totalMoney < 999999999
                        ? (totalMoney / 1000000).toFixed(1) + 'M'
                        : (totalMoney / 1000000000).toFixed(1) + 'B'}
                    </h2>
                    <h5 class='text-lg font-medium text-gray-500 mb-0'>
                      Total Money
                    </h5>
                  </div>

                  <div class=''>
                    <h2 class='text-3xl font-bold text-blue-600 mb-4'>
                      {' '}
                      €{(totalMoney / accounts.length).toFixed(2)}
                    </h2>
                    <h5 class='text-lg font-medium text-gray-500 mb-0'>
                      Average account balance
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
