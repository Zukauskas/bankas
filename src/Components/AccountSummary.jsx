const AccountSummary = ({ accounts }) => {
    const totalMoney = accounts.reduce(
        (total, current) => total + current.sum,
        0
    );

    return (
        <div className='mb-4'>
            <p className='text-gray-700 font-bold'>
                Total accounts:
                {accounts.length}
            </p>
            <p class='text-gray-700 font-bold'>Total money: {totalMoney}</p>
        </div>
    );
};
export default AccountSummary;
