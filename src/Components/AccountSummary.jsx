const AccountSummary = ({ accounts }) => {
    const totalMoney = accounts.reduce(
        (total, current) => total + current.sum,
        0
    );

    return (
        <div>
            <p>Total accounts: {accounts.length}</p>
            <p>Total money: {totalMoney}</p>
        </div>
    );
};
export default AccountSummary;
