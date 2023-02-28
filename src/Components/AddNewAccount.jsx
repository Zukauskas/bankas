import { useState } from 'react';

const AddNewAccount = ({ addAccount }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const nameHandler = (event) => {
        setName(event.target.value);
    };

    const lastNameHandler = (event) => {
        setLastName(event.target.value);
    };

    const dataHandler = (event) => {
        event.preventDefault();
        addAccount(name, lastName);
    };

    return (
        <form onSubmit={dataHandler}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={nameHandler} />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={lastNameHandler} />
            <button type="submit">Add Account</button>
        </form>
    );
};

export default AddNewAccount;
