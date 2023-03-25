const AccountFilter = ({ filterHandler }) => {
  return (
    <div className='flex items-center gap-2'>
      <label
        htmlFor='account-select'
        className='block text-sm font-medium text-gray-900'>
        Accounts:
      </label>
      <select
        name='account'
        onChange={filterHandler}
        className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'>
        <option value='All'>All</option>
        <option value='withMoney'>With Money</option>
        <option value='withDebt'>With Debt</option>
        <option value='noMoney'>No Money</option>
        <option value='blocked'>Blocked</option>
        <option value='active'>Active</option>
      </select>
    </div>
  );
};

export default AccountFilter;
