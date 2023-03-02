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
        <div className='flex items-center justify-center'>
            <form
                onSubmit={dataHandler}
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            >
                <label htmlFor='name' className='mr-2'>
                    Name
                </label>
                <input
                    className='border border-gray-400 rounded py-2 px-4'
                    type='text'
                    id='name'
                    onChange={nameHandler}
                    required
                />
                <label htmlFor='lastName' className='mx-2'>
                    Last Name
                </label>
                <input
                    className='border border-gray-400 rounded py-2 px-4'
                    type='text'
                    id='lastName'
                    onChange={lastNameHandler}
                    required
                />
                <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4'
                    type='submit'
                >
                    Add Account
                </button>
            </form>
        </div>
    );
};

export default AddNewAccount;
