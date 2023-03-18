const AccountFilter = ({ filterHandler }) => {
    return (
        <div className='flex items-center gap-2'>
            <label
                htmlFor='account-select'
                className='block font-bold text-gray-700'
            >
                Accounts:
            </label>
            <select
                name='account'
                onChange={filterHandler}
                className='border border-gray-400 rounded py-2 px-4'
            >
                <option value='All'>All</option>
                <option value='withMoney'>With Money</option>
                <option value='noMoney'>No Money</option>
            </select>
        </div>
    );
};

export default AccountFilter;
