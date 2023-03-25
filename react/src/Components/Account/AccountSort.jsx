const AccountSort = ({ sortHandler }) => {
  return (
    <div className='flex items-center gap-2'>
      <label
        htmlFor='account-select'
        className='block text-sm font-medium text-gray-900'>
        Sort:
      </label>
      <select
        name='account'
        onChange={sortHandler}
        className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'>
        <option value='All'>Default</option>
        <option value='lastnameAZ'>Last Name(A-Z)</option>
        <option value='lastnameZA'>Last Name(Z-A)</option>
        <option value='balanceHL'>Account Balance(High-Low)</option>
        <option value='balanceLH'>Account Balance(Low-High)</option>
      </select>
    </div>
  );
};

export default AccountSort;
