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
        setName('');
        setLastName('');
    };

    return (
        <form
            onSubmit={dataHandler}
            className='flex justify-center items-center flex-col gap-4 w-full sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-6/12 lg:flex-row bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
            <label htmlFor='name' className='mr-2 self-start lg:self-center'>
                Name
            </label>
            <input
                className='border border-gray-400 rounded py-2 px-4 w-full'
                type='text'
                id='name'
                value={name}
                onChange={nameHandler}
                required
            />
            <label
                htmlFor='lastName'
                className='mx-2 self-start lg:self-center whitespace-nowrap'
            >
                Last Name
            </label>
            <input
                className='border border-gray-400 rounded py-2 px-4 w-full'
                type='text'
                id='lastName'
                value={lastName}
                onChange={lastNameHandler}
                required
            />
            <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded whitespace-nowrap'
                type='submit'
            >
                Add Account
            </button>
        </form>
    );
};

export default AddNewAccount;
