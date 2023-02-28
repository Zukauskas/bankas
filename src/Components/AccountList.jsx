const AccountList = ({ accounts }) => {
    return (
        <ul>
            {accounts.map((acc) => (
                <li key={acc.id}>
                    {acc.name} {acc.lastName}
                </li>
            ))}
        </ul>
    );
};

export default AccountList;
