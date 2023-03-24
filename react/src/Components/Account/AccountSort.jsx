const AccountSort = ({ sortHandler }) => {
  return (
    <div className='flex items-center gap-2'>
      <label htmlFor='account-select' className='block font-bold text-gray-700'>
        Sort By:
      </label>
      <select
        name='account'
        onChange={sortHandler}
        className='border border-gray-400 rounded py-2 px-4'>
        <option value='All'>Nothing</option>
        <option value='lastnameAZ'>Last Name(A-Z)</option>
        <option value='lastnameZA'>Last Name(Z-A)</option>
        <option value='balanceHL'>Account Balance(High-Low)</option>
        <option value='balanceLH'>Account Balance(Low-High)</option>
      </select>
    </div>
  );
};

export default AccountSort;
