const DepositConfirmation = ({
  depositConfirmModal,
  enteredAmount,
  approveDeposit,
  cancelDeposit,
}) => {
  return (
    <div
      className={`${depositConfirmModal.state} fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-10`}>
      <div className='relative w-full h-full max-w-md md:h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='p-6 text-center'>
            <svg
              aria-hidden='true'
              className='mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to deposit €{enteredAmount.amount} to
              account?
            </h3>
            <button
              type='button'
              className='text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
              onClick={approveDeposit}>
              Yes, I'm sure
            </button>
            <button
              type='button'
              className='text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-200 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 focus:z-10'
              onClick={cancelDeposit}>
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositConfirmation;
